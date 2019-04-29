const {expect, assert} = require("chai");

const MongoDBServer = require("../utils/MongoDBServer.js");
const MongoDBClient = require("../utils/MongoDBClient.js");
const Measurement = require("../models/Measurement.js");
const MeasurementGroup = require("../models/MeasurementGroup.js");

describe("Local Mongo Database", function() {
	let mongoServer;
	before(async function() {
		mongoServer = new MongoDBServer();
		await mongoServer.start();
	});

	it("Should have an active local MongoDB Server", async function() {
		const instanceInfo = mongoServer.getInstanceInfo();
		expect(instanceInfo.instance.isInstanceReady).to.be.true;
	});

	let client;
	it("Should connect to that database", async function() {
		const mongoUri = mongoServer.mongoUri;
		client = new MongoDBClient();
		await client.connect(mongoUri);
	});

	let group;
	it("Should insert a measurement group to the database", async function() {
		group = new MeasurementGroup({
			name: "Default",
			min_value: 1,
			max_value: 4,
			order: 0,
			creation_date: new Date("01/01/2019 15:00:00")
		});
		await group.save();
	});

	it("Should insert a measurement to the database", async function() {
		const measure = new Measurement({
			name: "Temperature",
			value: 1,
			measurement_date: new Date("01/01/2019 15:01:00"),
			group_id: group._id
		});
		await measure.save();
	});

	it("Should insert another measurement to the database", async function() {
		const measure = new Measurement({
			name: "Temperature",
			value: 2,
			measurement_date: new Date("01/01/2019 15:02:00"),
			group_id: group._id
		});
		await measure.save();
	});

	it("Should retrieve all measurements", async function() {
		const measurements = await Measurement.find();
		assert.lengthOf(measurements, 2);
		measurements.forEach((measure) => {
			expect(measure.name).to.equal("Temperature");
		});
	});

	it("Should retrieve the first measurement by date range", async function() {
		const startDate = new Date("01/01/2019 15:00:30");
		const endDate = new Date("01/01/2019 15:01:30");

		const measurements = await Measurement.find({
			measurement_date: {
				$gte: startDate,
				$lte: endDate
			}
		});
		assert.lengthOf(measurements, 1);

		const measure = measurements[0];
		expect(measure.name).to.equal("Temperature");
		expect(measure.value).to.equal(1);
	});

	it("Should retrieve all measurements by its group", async function() {
		const group = await MeasurementGroup.findOne();
		const measurements = await Measurement.find({group_id: group._id});
		assert.lengthOf(measurements, 2);

		measurements.forEach((measure) => {
			expect(measure.name).to.equal("Temperature");
		});
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