import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    seats: {
        type: [Number],
        required: true
    },
    locks: {
        type: [Number],
        required: true,
    }
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;
