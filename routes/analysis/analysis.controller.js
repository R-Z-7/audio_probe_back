const db = require('../../config/connection');
const analysis = db.analysis;
const pg = require('../../utils/pagination');
const { exec } = require('child_process');
const path = require('path');
const { Op } = require("sequelize");
const fs = require("fs");
const { setTimeout } = require('timers/promises');

const addAnalysis = async (req, res) => {
    try {
        await analysis.create({
            analysis_data: req.body.analysis_data,
            comments: req.body.comments,
            clientId: req.body.clientId
        });
        res.send({
            response: "success"
            ,message: "Analysis Report added successfully.."
        });
    } catch (error) {
        console.log(error)
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}


const updateAnalysis = async (req, res) => {
    try {
        await analysis.update(
            {
                comments: req.body.comments,
                clientId: req.body.clientId,
            },
            {
                where: { id: req.body.id }
            }
        )
        res.send({
            response: "success"
            , message: "Analysis updated successfully.."
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}
const getAllanalysis = async (req, res) => {
    const { page, size, id } = req.query;
    var filterbyid = id ? { clientId: { [Op.eq]: id } } : null;
    var condition = id ? {
        [Op.or]: [
             filterbyid
        ]
    } : null;
    const { limit, offset } = pg.getPagination(page, size);
    await analysis.findAndCountAll({
        where: condition,
        limit, offset
    })
        .then(data => {
            const response = pg.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.send({
                response: "failed"
                , message: err.message
            })
        })
}

const deleteAnalysis = async (req, res) => {
    try {
        const result = await analysis.destroy({
            where: {
                id: req.params.id
            }
        })
        if (result == 0) {
            res.send({
                response: "failed"
                , message: "analysis does not exist.."
            })
        }
        console.log(result);
        res.send({
            response: "success"
            , message: "analysis deleted successfully.."
        })
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}



const getAudioAnalysis = async (req, res) => {
    const audioFilePath = path.join(__dirname,'audios');
    const praatFilePath = path.join(__dirname, 'praat-scripts');
    const praatExecutablePath = path.join(praatFilePath, "praat_nogui");
    const praatScriptPath = path.join(praatFilePath, "t10.praat");
    const command = `${praatExecutablePath} ${praatScriptPath} ${audioFilePath}/`;
    try {
        console.log(path.join(audioFilePath, req.file.filename));
        console.log(command);
        if (req.file == undefined) {
            return res.send({ response: "failed", message: "You must -select an Audio file" });
        } else {
            exec(command, (error, stdout, stderr) => {
                console.log("Audio executing---'"+stdout+"'");
                const outputArray = stdout.toString();
                stringValue = outputArray.replace(/\x00/g, '');
                const out = stringValue.split(",");
                trimmedArray = out.map(value => value.trim());
                const keys = ['meanlocaljitter','meanlocalabsolute','meanrap','meanppq5','meanddp','meanlocalshimmer','meanlocaldb','meanapq3','meanaqpq5','meanapq11','meandda','meanpitch','meansdpitch','minpitch', 'maxpitch','meanHNR','meansdHNR','f1','f2','f3','f4'];
                const outputObject = {};
                keys.forEach((key, index) => {
                    const numericValue = trimmedArray[index];
                    outputObject[key] = isNaN(numericValue) ? null : numericValue;
                })
                const jsonResponse = JSON.stringify(outputObject, null, 2);
                parsedResponse = JSON.parse(jsonResponse);
                console.log(jsonResponse);
                if (stdout) {
                    res.status(200).send({ response: "Success", data: parsedResponse });
                    const audio = req.file.filename;
                    console.log(__basedir);
                    const directoryPath = path.join(__basedir,"routes","analysis","audios","/");
                    console.log("dp-->"+directoryPath);
                   setTimeout(200,
                    fs.unlink(directoryPath+audio, (err) => {
                      if (err) {
                      console.error(err)
                    return
                      }else{
                      console.log("deleted audio successfully");
                      }
                    }));
                } else
                    if (stderr) {
                        const audio = req.file.filename;
                    const directoryPath = path.join(__basedir,"routes","analysis","audios","/");
                   setTimeout(200,
                    fs.unlink(directoryPath+audio, (err) => {
                      if (err) {
                      console.error(err)
                    return
                      }else{
                      console.log("deleted audio successfully");
                      }
                    }));
                        res.status(500).send({ response: "failed", message: 'Praat command encountered an error' });
                        return;
                    } else {
                        const audio = req.file.filename;
                    const directoryPath = path.join(__basedir,"routes","analysis","audios","/");
                   setTimeout(200,
                    fs.unlink(directoryPath+audio, (err) => {
                      if (err) {
                      console.error(err)
                    return
                      }else{
                      console.log("deleted audio successfully");
                      }
                    }));
                        res.status(500).send({ response: "failed", message: 'Error executing Praat command' });
                        return;
                    }
            });
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    addAnalysis, getAllanalysis, updateAnalysis, deleteAnalysis, getAudioAnalysis
}
