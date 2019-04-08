const {expect, assert} = require('chai');

const MongoDBServer = require("../utils/MongoDBServer.js");
const MongoDBClient = require("../utils/MongoDBClient.js");
const {getMeasurementModel} = require("../models/Measurement.js");
const {getMeasurementGroupModel} = require("../models/MeasurementGroup.js");


const { MongoMemoryServer } = require('mongodb-memory-server');

describe("Local Mongo Database", function() {
	let mongoServer;
	it("Should start the local MongoDB Server", async function() {
		this.timeout(90000);
		mongoServer = new MongoDBServer();
		await mongoServer.start();
	});

	let client;
	it("Should connect to that database", async function() {
		const mongoUri = mongoServer.mongoUri;
		client = new MongoDBClient();
		await client.connect(mongoUri);
	});

	let Measurement, MeasurementGroup;
	it("Should setup schemas and models", async function() {
		Measurement = getMeasurementModel(client.client);
		MeasurementGroup = getMeasurementGroupModel(client.client);
	});

	let groupId;
	it("Should insert a measurement group to the database", async function() {
		const group = new MeasurementGroup({
			name: "Default",
			min_value: 1,
			max_value: 4,
			order: 0,
			creation_date: new Date("01/01/2019 15:00:00")
		});
		await group.save();
		groupId = group._id;
	});

	it("Should insert a measurement to the database", async function() {
		const measure = new Measurement({
			name: "Temperature",
			value: 1,
			measurement_date: new Date("01/01/2019 15:01:00"),
			group_id: groupId
		});
		await measure.save();
	});

	it("Should insert another measurement to the database", async function() {
		const measure = new Measurement({
			name: "Temperature",
			value: 2,
			measurement_date: new Date("01/01/2019 15:02:00"),
			group_id: groupId
		});
		await measure.save();
	});

	it("Should be able to retrieve all measurements", async function() {
		var measurements = await Measurement.find();
		assert.lengthOf(measurements, 2);
		measurements.forEach((measure, index) => {
			expect(measure.name).to.equal("Temperature");
		});
	});

	it("Should be able to retrieve the first measurement by date range", async function() {
		var startDate = new Date("01/01/2019 15:00:30");
		var endDate = new Date("01/01/2019 15:01:30");

		var measurements = await Measurement.find({
			measurement_date: {
                $gte: startDate,
                $lte: endDate
			}
		});
		assert.lengthOf(measurements, 1);
		expect(measurements[0].name).to.equal("Temperature");
		expect(measurements[0].value).to.equal(1);
	});

	it("Should close the MongoDB Client Connection", async function() {
		this.timeout(1000);
		await client.disconnect();
	});

	it("Should stop the local MongoDB Server", async function() {
		this.timeout(1000);
		await mongoServer.stop();
	});
});