import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ageSchema = new Schema({
    range: {
        type: String,
        required: true
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    base:{
        type: Number,
        required: true
    }
})

const AgeModel = mongoose.model('Age', ageSchema);

export default AgeModel