# Audio Probe Backend (Node.js)

This repository houses the Node.js backend for Audio Probe, a healthcare application that enables users to record and analyze their speech. This aids in the diagnostics and therapy of speech-related disorders.

## Features

- **Secure Authentication**: Utilizes JSON Web Tokens (JWT) for user authentication and authorization.
- **Data Management**: Supports CRUD operations to manage patient records effectively.
- **Speech Analysis**: Integrates with Praat software for detailed speech analysis.
- **Appointment Management**: Provides API endpoints for managing appointments and user profiles.

## Technologies Used

- **Node.js**: The runtime environment for the application.
- **Express.js**: The web application framework used to build the backend.
- **MySQL**: The relational database for storing user and application data.
- **JSON Web Tokens (JWT)**: Used for securing API endpoints through token-based authentication.
- **Praat**: Software used for speech analysis, integrated via external commands.
- **Sequelize ORM**: Object-Relational Mapping tool used to interact with MySQL from Node.js.

