/* eslint no-unused-vars: 0 */

const MongoDBServer = require("../utils/MongoDBServer.js");
const MongoDBClient = require("../utils/MongoDBClient.js");
const Measurement = require("../models/Measurement.js");
const MeasurementGroup = require("../models/MeasurementGroup.js");

const defaultFridges = [
	{
		"name": "Fridge 1 (Pilsner)",
		"min": 4,
		"max": 6
	},{
		"name": "Fridge 2 (IPA)",
		"min": 5,
		"max": 6
	},{
		"name": "Fridge 3 (Lager)",
		"min": 4,
		"max": 7
	},{
		"name": "Fridge 4 (Stout)",
		"min": 6,
		"max": 8
	},{
		"name": "Fridge 5 (Wheat)",
		"min": 3,
		"max": 5
	},{
		"name": "Fridge 6 (Pale Ale)",
		"min": 4,
		"max": 6
	}
];

class LocalDatabaseService {

	/**
     * Starts the local MongoDB server
     *
     * @return {Promise} A promise that resolves when the server is successfully started
     */
	static async start() {

		async function addFridge(name, min, max) {
			const connection = new MongoDBClient();
			await connection.connect();
			const group = MeasurementGroup({
				"name": name,
				"min_value": min,
				"max_value": max
			});
			return await group.save();
		}

		async function addDefaultFridges() {
			await Promise.all(defaultFridges.map((fridge) => addFridge(fridge.name, fridge.min, fridge.max)));
		}

		this.mongoServer = new MongoDBServer();
		await this.mongoServer.start();
		addDefaultFridges().catch(console.error);
		this.connectionString = this.mongoServer.mongoUri;
		return this.connectionString;
	}

	/**
     * Stops the database server
     *
     * @return {Promise} A promise that resolves when the server is successfully stopped
     */
	static async stop() {
		await this.mongoServer.stop();
	}

	/**
	 * Returns the MongoDB Server wrapper
	 *
	 * @return {MongoDBServer}
	 */
	static getInstance() {
		return this.mongoServer;
	}
}

module.exports = LocalDatabaseService;