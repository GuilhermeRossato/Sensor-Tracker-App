const MongoDBClient = require("../utils/MongoDBClient.js");
const Measurement = require("../models/Measurement.js");
const MeasurementGroup = require("../models/MeasurementGroup.js");

class ApiController {
	static async getConnection() {
		var self = ApiController;
		if (!self.connection) {
			self.connection = new MongoDBClient();
			await self.connection.connect();
		}
		return self.connection;
	}

	static async saveNewMeasurementGroup(name, min, max) {
		await ApiController.getConnection();
		const group = new MeasurementGroup({
			name: name,
			min_value: min,
			max_value: max,
			order: 0,
			creation_date: new Date()
		});
		await group.save();
		return group;
	}

	static async saveNewMeasurement(group_id, value) {
		await ApiController.getConnection();
		const group = new Measurement({
			group_id: group_id,
			value: value,
			date: new Date()
		});
		await group.save();
		return group;
	}

	static async fetchMeasurementGroups() {
		await ApiController.getConnection();
		const groups = await MeasurementGroup.find({});
		return groups;
	}

	static async fetchMeasurements() {
		await ApiController.getConnection();
		const measurements = await Measurement.find({});
		return measurements;
	}

	static async insertDummyGroup(req, res) {
		res.setHeader('Content-Type', 'application/json');
		const nameOptions = ["Default Beer", "Random Beer", "Pale Ale Beer", "Strong Ale", "Colorful Beer", "Fruit Beer"];
		var randomName = nameOptions[Math.floor(nameOptions.length*Math.random())];
		if (!randomName) {
			randomName = "Dummy";
		}
		const result = await ApiController.saveNewMeasurementGroup(randomName, 1, 3);
		await ApiController.saveNewMeasurement(result._id, 1+Math.random()*2);
		await ApiController.saveNewMeasurement(result._id, 1+Math.random()*2);
		res.end(JSON.stringify(result));
	}

	static async listMeasurements(req, res) {
		res.setHeader('Content-Type', 'application/json');

		const groups = await ApiController.fetchMeasurementGroups();
		const measurements = await ApiController.fetchMeasurements();

		if (!groups.length) {
			res.end(JSON.stringify([]));
			return false;
		}

		const result = groups.map(group => ({
			_id: group._id,
			name: group.name,
			min_value: group.min_value,
			max_value: group.max_value,
			values: []
		}))

		function findResultByGroupId(group_id) {
			return result.filter(group => group._id && group_id && group._id.toString() === group_id.toString())[0];
		}

		measurements.forEach(measurement => {
			var group = findResultByGroupId(measurement.group_id);
			if (group) {
				group.values.push(measurement);
			}
		});
		res.end(JSON.stringify(result));
	}
}

module.exports = ApiController;
