const mongoose = require("mongoose");
const CacheReturn = require("../utils/CacheReturn.js");

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

schema.virtual('group', {
    ref: 'MeasurementGroup',
    localField: '_id',
    foreignField: 'groupId',
    justOne: false
});

const getMeasurementGroupModel = CacheReturn(
    (client) => client.model("MeasurementGroup", schema)
);

module.exports = { getMeasurementGroupModel, schema };
