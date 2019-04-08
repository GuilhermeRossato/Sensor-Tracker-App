const MongoDBServer = require("../utils/MongoDBServer.js");
const MongoDBClient = require("../utils/MongoDBClient.js");
const Measurement = require("../models/Measurement.js");
const MeasurementGroup = require("../models/MeasurementGroup.js");

const defaultBeers = [
	{
		"name": "Beer 1 (Pilsner)",
		"min": 4,
		"max": 6
	},{
		"name": "Beer 2 (IPA)",
		"min": 5,
		"max": 6
	},{
		"name": "Beer 3 (Lager)",
		"min": 4,
		"max": 7
	},{
		"name": "Beer 4 (Stout)",
		"min": 6,
		"max": 8
	},{
		"name": "Beer 5 (Wheat beer)",
		"min": 3,
		"max": 5
	},{
		"name": "Beer 6 (Pale Ale)",
		"min": 4,
		"max": 6
	}
];

async function addBeer(name, min, max) {
	const connection = new MongoDBClient();
	await connection.connect();
	const group = MeasurementGroup({
		"name": name,
		"min_value": min,
		"max_value": max
	});
	return await group.save();
}

async function addDefaultBeers() {
	await Promise.all(defaultBeers.map((beer) => addBeer(beer.name, beer.min, beer.max)));
}

async function handleLocalServer() {
	mongoServer = new MongoDBServer();
	await mongoServer.start();
	addDefaultBeers().catch(console.error);
	return mongoServer.mongoUri;
}

module.exports = handleLocalServer;