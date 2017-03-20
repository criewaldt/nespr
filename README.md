# PARSE
### A barebones, session-ready stack for testing & whatever else...
Built with: Node, Express, SocketIO, Postgres, Angular, and Redis - with Pug template engine. Local or Heroku-Redis session handling middleware included.

### Instructions
`cd parse`  
`npm install`  
Set config variables in `/config/config.js`  
`node index`  

#### Local or Heroku-Redis Session Handling
Link your Heroku App with Heroku-Redis (via herokuCLI or otherwise), then set `DEPLOY_ENV = 'heroku'` in `/config/config.js` to run session-handling via Heroku-Redis.
