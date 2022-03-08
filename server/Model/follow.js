const { Schema, model } = require("mongoose");

module.exports.Follow = model(
    "Follow",
    Schema({
        idUser: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "User",
        },
        follow: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "User",
        },
        createAt: {
            type: Date,
            default: Date.now(),
        },
    })
);