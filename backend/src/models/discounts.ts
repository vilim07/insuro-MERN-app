import mongoose from "mongoose";

const Schema = mongoose.Schema;

const discountsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['base', 'coverage', 'total'],
        required: true
    },
    condition: {
        type: String,
        enum: ['coverage', 'power'],
    },
    treshold: {
        type: Number,
    },
    optional: {
        type: Boolean,
        default: true
    }
})

const DiscountsModel = mongoose.model('Disount', discountsSchema);

export default DiscountsModel