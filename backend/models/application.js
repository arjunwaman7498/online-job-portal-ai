const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    resume: {
        type: String,
        default: ""
    },

    coverLetter: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Application", applicationSchema);