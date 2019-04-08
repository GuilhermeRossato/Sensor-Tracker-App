const cron = require('node-cron');
const MongoDBClient = require("./MongoDBClient.js");
const Measurement = require("../models/Measurement.js");
const MeasurementGroup = require("../models/MeasurementGroup.js");
const PushBullet = require('pushbullet');
const pusher = new PushBullet(process.env.PUSHBULLET_ACCESS_TOKEN);

async function sendPushBulletMessage(title, message) {
    console.log("Sending pushbullet notification: "+title+"\n"+message);
    pusher.devices(function(error, response) {
        console.log(response);
    });
}

async function getMeasurementGroups() {
    const connection = new MongoDBClient();
    await connection.connect();
    const groups = await MeasurementGroup.find({});
    if (!groups || !groups.length) {
        return [];
    }
    return groups;
}

async function getLastMinuteMeasurements() {
    const connection = new MongoDBClient();
    await connection.connect();

    const minutes = 1/4;
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - minutes*60000);

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
    const groups = await getMeasurementGroups();
    const measurements = await getLastMinuteMeasurements();
    var outliers = [];

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
        sendPushBulletMessage(
            (((list.length === 1)?"There is a beer":"There are "+list.length+" beers")+" outside the temperature range!"),
            "The following containers are outside the temperature range:\n"+list.map(outlier=>(outlier.group.name+": "+outlier.measurement.value+" ºC")).join("\n")
        );
    }
}

function startNotifier() {
    cron.schedule('* * * * *', function() {
        watchAndNotifyOutliers();
        setTimeout(watchAndNotifyOutliers, 15000);
        setTimeout(watchAndNotifyOutliers, 30000);
        setTimeout(watchAndNotifyOutliers, 45000);
    });
    setTimeout(watchAndNotifyOutliers, 8000);
}

module.exports = startNotifier;