const mongoose = require("mongoose");

const schemaConfig = {
    name: {
        type: String,
        required: true
    },
    min_value: Number,
    max_value: Number,
    order: Number,
    creation_date: Date
}

const schema = new mongoose.Schema(schemaConfig);

module.exports = mongoose.model("MeasurementGroup", schema);