import mongoose from "mongoose";

const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value:{
        type: Number,
        required: true
    }
})

const CityModel = mongoose.model('City', citySchema);

export default CityModel