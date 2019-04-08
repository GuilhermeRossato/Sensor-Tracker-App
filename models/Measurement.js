const mongoose = require("mongoose");
const CacheReturn = require("../utils/CacheReturn.js");

const schemaConfig = {
    name: String,
    value: Number,
    measurement_date: Date,
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
};

var schema = new mongoose.Schema(schemaConfig);

const getMeasurementSchema = CacheReturn(
    () => schema
);

const getMeasurementModel = CacheReturn(
    (client) => client.model("Measurement", schema)
);

module.exports = { getMeasurementModel, schema };
