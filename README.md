# GitLab Overview

## Project Description

The giltLab system is designed to integrate with GitLab to provide a seamless user experience. The application allows users to log in using their [gitlab.lnu.se](https://gitlab.lnu.se) account and access a variety of information directly from GitLab:

- **Basic Profile Information**: Retrieve and display the user’s basic profile details.
- **Recent Activities**: Access the 101 most recent activities associated with the user’s GitLab account.
- **Groups and Projects**: View information about the user’s groups and projects, including the latest commit.


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **OAuth2 Integration**: Implemented a three-legged OAuth2 system for secure access delegation.
- **Session Management**: Utilizes Redis for session management.
- **Server-Side Rendering**: Built with EJS for rendering views.
- **GraphQL Requests**: Handles GraphQL requests for interacting with GitLab APIs.

## Technologies Used

- **Node.js**: [Node.js](https://nodejs.org/) (>=20.6.0) - JavaScript runtime used for server-side logic.
- **Express**: [Express](https://expressjs.com/) - Web application framework for Node.js.
- **EJS**: [EJS](https://www.npmjs.com/package/ejs) - Templating engine for rendering views.
- **Redis**: [Redis](https://redis.io/) - In-memory data structure store for session management.
- **Mongoose**: [Mongoose](https://mongoosejs.com/) - ODM for MongoDB.
- **OAuth2**: [OAuth2](https://oauth.net/2/) - Authentication protocol used for GitLab integration.
- **Inversify**: [InversifyJS](https://inversify.io/) - Dependency injection library for JavaScript.
- **Node-Fetch**: [node-fetch](https://www.npmjs.com/package/node-fetch) - Fetch API for Node.js.


## Demo video
[![Videotitel](./public/images/demoImage.png)](https://www.youtube.com/watch?v=k3GvWBabZdA)


## Setup and Installation

1. **Clone the Repository**

```
git clone https://github.com/username/giltLab.git
cd giltLab 
```

2. **Install Dependencies**
```
npm install
```

3. **Create Environment File**
```
Example of .env file
PORT=3000
BASE_URL="/"
SESSION_NAME= "WT1 session"
SESSION_SECRET="odasfasfda"
REDIS_URL=""
CLIENT_ID="75b9fe0fae0dba0da0f3ced57sadgasdgab4e38015772a587609eba63c5892bde5fc0"
REDIRECT_URI="http://localhost:3000/user/auth/token"
CLIENT_SECRET="gloas-aaf8b475bbe1c2df6eb8bbasdgasd5c788ecc8c67cfbbea8c677e647f46e1b237909"
```

Update .env with your GitLab credentials and other configuration details.

4. **Running the Application**
Start the Application

For development:
```
npm run dev
```

For production:
```
npm start
```
### License
This project is licensed under the MIT License

### Contact
Vanja Maric
email: maricvanj@gmail.com