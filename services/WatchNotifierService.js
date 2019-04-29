/* eslint no-unused-vars: 0 */

const cron = require("node-cron");
const MongoDBClient = require("../utils/MongoDBClient.js");
const Measurement = require("../models/Measurement.js");
const MeasurementGroup = require("../models/MeasurementGroup.js");
const PushBullet = require("pushbullet");

let pusher, devices;
async function sendPushBulletMessage(title, message) {

	console.log("Sending notification: "+title+"\n"+message);
	if (!process.env.PUSHBULLET_ACCESS_TOKEN) {
		return console.log("Could not send pushbullet notification: Missing Access Token");
	}
	try {
		if (!pusher) {
			pusher = new PushBullet(process.env.PUSHBULLET_ACCESS_TOKEN);
		}
		if (!devices) {
			devices = await pusher.devices();
		}

		let index = 0;
		for (let deviceId in devices) {
			index++;
			if (index > 4) {
				continue;
			}
			let device = devices[deviceId];
			let iden = device.iden;
			await pusher.note(iden, title, message);
		}
	} catch (err) {
		console.log("Could not send pushbullet notification:");
		console.error(err);
	}
}

async function getMeasurementGroups(connection) {
	const groups = await MeasurementGroup.find({});
	if (!groups || !groups.length) {
		return [];
	}
	return groups;
}

async function getLastMinuteMeasurements(connection) {
	const minutes = 1/4;
	const endDate = new Date();
	const startDate = new Date(endDate.getTime() - minutes*15000);

	const measurements = await Measurement.find({
		date: {
			$gte: startDate,
			$lte: endDate
		}
	});
	if (!measurements || !measurements.length) {
		return [];
	}
	return measurements;
}

async function watchAndNotifyOutliers() {
	const connection = new MongoDBClient();
	await connection.connect();

	const groups = await getMeasurementGroups(connection);
	const measurements = await getLastMinuteMeasurements(connection);
	const outliers = [];

	function findGroupById(group_id) {
		return groups.filter(group => group._id && group_id && group._id.toString() === group_id.toString())[0];
	}

	measurements.forEach(measurement => {
		const group = findGroupById(measurement.group_id);
		if (!group) {
			return;
		}
		if (measurement.value < group.min_value || measurement.value > group.max_value) {
			outliers[measurement.group_id.toString()] = {
				measurement: measurement,
				group: group
			};
		}
	});

	const list = [];

	for (let x in outliers) {
		list.push(outliers[x]);
	}

	if (list.length > 0) {
		const title = (((list.length === 1)?"There is a fridge":"There are "+list.length+" fridges")+" outside the temperature range!");
		const message = "The following containers are outside the temperature range:\n"+list.map(outlier=>(outlier.group.name+": "+outlier.measurement.value+" ºC")).sort().join("\n");
		sendPushBulletMessage(title, message);
	}
}

/**
 * Creates a cron to watch the values of measurements to send notifications when values are outside the accepted range
 */
class WatchNotifier {
	/**
     * Executes 1 minute worth of checks
     */
	static cron() {
		const timesPerMinute = 4;

		for (let i = 0; i < 60; i+= 60/timesPerMinute) {
			setTimeout(watchAndNotifyOutliers, i*1000);
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

module.exports = WatchNotifier;