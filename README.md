# Temperature Watcher

An incomplete application to keep track of a list of refrigerators temperatures and receive notifications when values go outside of the acceptable range.

This node app is divided in logic parts using a Model-View-Controller ([MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)) architecture and developed with Test-Driven-Development ([TDD](https://en.wikipedia.org/wiki/Test-driven_development)) in mind. It uses [Express](https://expressjs.com/) + [Node](https://node.org/) on the backend and [AngularJS](https://angularjs.org/) on the frontend.

## Running the application

Navigate to your projects folder and use the following commands to download the repository, install dependencies (dev included) and serve it:

```
git clone https://github.com/GuilhermeRossato/Temperature-Watcher.git
cd Temperature-Watcher
npm install
npm run serve
```

This will spun a database server and a web server to run the application and reply requests at [localhost:8080](http://localhost:8080/).

## Dependencies

- Angularjs: Frontend framework to help with PWA development
- Express: Web Application Framework and server to handle requests and the web protocol (HTTP)
- Morgan: A request logger middleware to help with logging and debugging
- Mongoose: An ORM to simplify and validate database calls

## Folder Organization

- Controllers: App route handlers and Business Logic
- Utils: Utility and globally-acessible helper functions
- Middlewares: Process requests, filtering them before routing
- Models: Schemas and middleware between the application and the database
- Routes: Define routes and connections for http methods
- Public: Static resources
- Views: Templates to be rendered by the server
- Tests: Unit tests to verify functional behaviour

## That's all for now