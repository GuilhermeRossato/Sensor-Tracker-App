# Sensor Temperature Watcher

An application to keep track of a list of refrigerators temperatures and send notifications when sensor readings go outside of the acceptable range. Additionally it shows (in it's frontend) the reading history, so that you can watch the readings in real time.

This node app is divided in logic parts using a Model-View-Controller ([MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)) architecture. It uses [Express](https://expressjs.com/) + [Node](https://node.org/) on the backend and [AngularJS](https://angularjs.org/) on the frontend.

## Running the application

Navigate to your projects folder and use the following commands to download the repository, install dependencies (dev included) and serve it:

```
git clone https://github.com/GuilhermeRossato/Temperature-Watcher.git
cd Temperature-Watcher
npm install
npm run serve
```

This will start a web server to run the application and reply requests at [localhost:8080](http://localhost:8080/) with [nodemon](https://www.npmjs.com/package/nodemon), a module that automatically restarts the server when file changes are detected.

## Preview

This preview keeps tracks of the temperature sensors inside beer fridges:

![Preview](https://github.com/GuilhermeRossato/Temperature-Watcher/blob/master/public/preview.png?raw=true)

The orange-colored values represent values that are currently outside their acceptable range.

Obs: Even if you are looking at the values outside their range the app will still try to send a notification if you configured the pushbullet API (which is explained in a later section of this readme).

## Dependencies

- [Angularjs](https://angularjs.org/): Frontend framework to help with PWA development.
- [Express](https://expressjs.com/): Web Application Framework and server to handle requests and the web protocol (HTTP).
- [Morgan](https://github.com/expressjs/morgan): A request logger middleware to help with logging and debugging.
- [Mongoose](https://mongoosejs.com/): An object modeling tool to simplify, organize, and validate database calls.
- [Pushbullet](https://www.pushbullet.com/): Device Connector to send notifications to other devices (computer and smartphones).
- [Miligram](https://milligram.io/): Opinated CSS Framework to format and help with the graphical interface.
- [ESLint](https://eslint.org/): A linter to enforce constant coding styling standard.

## Folder Organization

The backend (Node + Express) folder structure is divided in these folders:

- Controllers: App route handlers and Business Logic
- Utils: Utility and globally-acessible helper functions (for backend only)
- Middlewares: Process requests, filtering them before routing
- Models: Schemas and middleware between the application and the database
- Routes: Define routes and connections for http methods
- Public: Static resources
- Views: Templates to be rendered by the server
- Tests: Unit tests to verify functional behavior
- Services: Active services and cron jobs that can be started and stopped

The relevant frontend (**AngularJS**) folder structure is the following:

- Public: Static resources to be served, including angularjs dependencies (and itself)
	- App: The main angularjs folder for the project
		- Controllers: Controller functions that define behavior, logic and data fetching.
		- Components: Small angular app sections of the project, containing some static resources, controllers and services.
		- Utils: reusable helper methods for the frontend

## Notification

Every 15 seconds the server analizes (via a internal cron job) the last 15 seconds of measurements and if it detects that one or more measurements are outside the expected values it will send a external notification to let the user know something is amiss.

The notifications are created and routed through [Pushbullet](https://www.pushbullet.com/) API and are supposed to be shown in your smartphone as a mobile notification. Make sure you configure the API key to receive notifications:

1. Register and retrieve your [Access Token](https://www.pushbullet.com/#settings)
2. Put your Pushbullet Access Token in your local enviroment variables, naming it `PUSHBULLET_ACCESS_TOKEN`
3. Optionally download pushbullet to your browser, android or iOS to receive the notifications.
4. Run this application, it will retrieve your access token via `process.env.PUSHBULLET_ACCESS_TOKEN`;

The server will send to the endpoint (`https://api.pushbullet.com`) a warning message everytime it detects that one or more measurements are outside the expected values.

If you are testing locally, you can edit `./utils/CronMeasureMockerService.js`'s `outlierChance` to something close to 0.5, which will more-or-less guarantee you get a notification every 15 seconds.

The notifications inside pushbullet are in the following format:

![Pushbullet Preview](https://github.com/GuilhermeRossato/Temperature-Watcher/blob/master/public/preview-mobile.png?raw=true)

## Testing

Mocha (testing) and Chai (assertion / expectancy) modules are used for testing, to test some aspect of the application you can do the following:

```
npm run test
```

The tests are not complete, their purpose is to serve as examples of how some aspects of the application can be tested.

## Database

The database used is a MongoDB, the local server provided (for tests and development) is a memory-based server from the [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server) package and it's instanced at `./service/LocalDatabaseService.js`.

The classes at `./utils/MongoDBClient.js` and `./utils/MongoDBServer.js` are wrappers that abstract the previously mentioned modules.

Every database operation should be done through the [mongoose](https://www.npmjs.com/package/mongoose) ORM and the models and schemas are defined at the `./models` folder.

The basic usage of the ORM, local database server and client can be observed at `./test/test-database.js`.

The service `CronMeasureMockerService.js` generates values for readings, realistically this would be replaced by an actual sensor API to save the values to the database.

## That's all for now
