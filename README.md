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

This will start a web server to run the application and reply requests at [localhost:8080](http://localhost:8080/) with [nodemon](https://www.npmjs.com/package/nodemon), a module that automatically restarts the server when file changes are detected.

## Dependencies

- Angularjs: Frontend framework to help with PWA development
- Express: Web Application Framework and server to handle requests and the web protocol (HTTP)
- Morgan: A request logger middleware to help with logging and debugging
- Mongoose: An ORM to simplify and validate database calls

## Folder Organization

The backend (Node + Express) folder structure is divided in these folders:

- Controllers: App route handlers and Business Logic
- Utils: Utility and globally-acessible helper functions (for backend only)
- Middlewares: Process requests, filtering them before routing
- Models: Schemas and middleware between the application and the database
- Routes: Define routes and connections for http methods
- Public: Static resources
- Views: Templates to be rendered by the server
- Tests: Unit tests to verify functional behaviour

The relevant frontend (AngularJS) folder structure is the following:

- Public: Static resources to be served, including angularjs dependencies (and itself)
	- App: The main angularjs folder for the project
		- Controllers: Controller functions that define behaviour, logic and data fetching.
		- Components: Small angular app sections of the project, containing some static resources, controllers and services.
		- Shared: reusable components or partials of the website that can be used in any component.

## Testing

Mocha (testing) and Chai (assertion / expectancy) modules are used for testing, to test every aspect of the application you can do the following:

```
npm run test
```

## Database

The database used is a MongoDB, the local server provided (for tests and development) is a memory-based server from the [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server) package.

The classes at `./utils/MongoDBClient.js` and `./utils/MongoDBServer.js` are wrappers that abstract the previously mentioned modules.

Every database operation should be done through the [mongoose](https://www.npmjs.com/package/mongoose) ORM and the models and schemas are defined at the `./models` folder.

The basic usage of the ORM, local database server and client can be observed at `./test/test-database.js`.

## That's all for now