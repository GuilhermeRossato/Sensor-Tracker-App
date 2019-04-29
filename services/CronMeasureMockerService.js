const cron = require("node-cron");
const MongoDBClient = require("../utils/MongoDBClient.js");
const Measurement = require("../models/Measurement.js");
const MeasurementGroup = require("../models/MeasurementGroup.js");

const outlierChance = 0.2;

function executeReading(group_id, group_name, group_min, group_max) {
	let value = group_min+(group_max - group_min)*Math.random();

	if (Math.random() > 1-outlierChance) {
		if (Math.random() > 0.5) {
			value = group_max+0.5;
		} else {
			value = group_min-0.5;
		}
	}

	return value;
}

async function executeAllReadings() {
	const connection = new MongoDBClient();
	await connection.connect();
	const groups = await MeasurementGroup.find();
	if (!groups) {
		return false;
	}

	let objects = groups.map(group => {
		let value = executeReading(group._id, group.name, group.min_value, group.max_value);
		if (!(value > 0)) {
			value = 0;
		}
		return {
			group_id: group._id,
			value: value,
			date: new Date()
		};
	});
	let result;
	if (objects && objects.length) {
		result = await Measurement.collection.insertMany(objects);
	}
	return result;
}

/**
 * Adds fake values to the measurements database to simulate real data
 */
class CronMeasureMockerService {
	/**
	 * Executes 1 minute worth of mockery
	 */
	static cron() {
		const timesPerMinute = 4;

		for (let i = 0; i < 60; i+= 60/timesPerMinute) {
			setTimeout(executeAllReadings, i*1000);
		}
	}


	/**
	 * Starts the cron
	 */
	static start() {
		this.task = cron.schedule("* * * * *", this.cron.bind(this));
		this.cron();
	}

	/**
	 * Stops de cron
	 */
	static stop() {
		if (!this.task) {
			return console.warn("No task to stop");
		}
		this.task.destroy();
		this.task = undefined;
	}
}

module.exports = CronMeasureMockerService;