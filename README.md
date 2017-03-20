# nespr
## A barebones, session-ready webapp for testing & whatever else...
Built with: Node, Express, SocketIO, Postgres, and Redis - with Pug template engine. Supports Heroku-Redis & Postgres out of the box, just set your config vars in `/config/config.js`.

## Instructions
`cd nespr`  
`npm install`  
Set config variables in `/config/config.js`  
`node index`  

#### Heroku
Made for Heroku testing
#### Heroku-Redis Session Handling
Link your Heroku App with Heroku-Redis (via herokuCLI or otherwise), then set `DEPLOY_ENV = 'heroku'` in `/config/config.js`   
