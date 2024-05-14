const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

exports.verifyToken = (token) => jwt.verify(token, "dskfjgjkdsgfukjsdkjliauhi8yh3w8yrhubdsc78q264cgebewhcy7e6376aqdsifh67wi45wc6dszfisufuigadyfcyhgzsdbcbjhzxdcvjhgsduy6tgf6ugsehfcvdghczsdfygcfgjzsdhbcfhzsgxvgcvghszdc");

exports.createToken = (data) => jwt.sign(data, "dskfjgjkdsgfukjsdkjliauhi8yh3w8yrhubdsc78q264cgebewhcy7e6376aqdsifh67wi45wc6dszfisufuigadyfcyhgzsdbcbjhzxdcvjhgsduy6tgf6ugsehfcvdghczsdfygcfgjzsdhbcfhzsgxvgcvghszdc", { expiresIn: "144h" });
