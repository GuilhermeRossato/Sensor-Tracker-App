const cron = require('node-cron');
const MongoDBClient = require("./MongoDBClient.js");
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
    const groups = await MeasurementGroup.find({});
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
        }
    });
    if (objects && objects.length) {
        let result = await Measurement.collection.insertMany(objects);
    }
}

function cronMeasureMocker() {
    cron.schedule('* * * * *', function() {
        executeAllReadings();
        setTimeout(executeAllReadings, 15000);
        setTimeout(executeAllReadings, 30000);
        setTimeout(executeAllReadings, 45000);
    });
    setTimeout(executeAllReadings, 5000);
}

module.exports = cronMeasureMocker;