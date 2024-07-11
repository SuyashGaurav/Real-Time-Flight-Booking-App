import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2046-uxddkt7j.png"
    }
});

const User = mongoose.model('User', userSchema);

export default User;
