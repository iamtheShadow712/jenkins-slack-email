import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [5, "Username must be at least 5 characters long"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phoneNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model("user", userSchema);

export default User;
