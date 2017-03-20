# parse
## A barebones, session-ready webapp for testing & whatever else...
Built with: Node, Express, SocketIO, Postgres, Angular, and Redis - with Pug template engine. Supports Heroku-Redis session handling.

## Instructions
`cd parse`  
`npm install`  
Set config variables in `/config/config.js`  
`node index`  

#### Heroku-Redis Session Handling
Link your Heroku App with Heroku-Redis (via herokuCLI or otherwise), then set `DEPLOY_ENV = 'heroku'` in `/config/config.js`   
