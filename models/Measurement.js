const mongoose = require("mongoose");

const schemaConfig = {
    name: String,
    value: Number,
    measurement_date: Date,
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "MeasurementGroup"
    }
};

const schema = new mongoose.Schema(schemaConfig);

module.exports = mongoose.model("Measurement", schema);
