import mongoose from "mongoose";

const Schema = mongoose.Schema;

const variationSchema = new Schema({
    threshold: {
        type: Number || null,
        default: null
    },
    value: {
        type: Number,
        required: true
    }
});

const coverageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: ['age', 'power'],
    },
    type: {
        type: String,
        enum: ['base', 'fixed', 'power'],
        required: true
    },
    variations: [variationSchema]
})

const CoverageModel = mongoose.model('Coverage', coverageSchema);

export default CoverageModel