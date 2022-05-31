const { Schema, model } = require("mongoose");

module.exports.Comment = model(
    "Comment",
    Schema({
        idPublication: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "Publication",
        },
        idUser: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "User",
        },
        comment: {
            type: String,
            trim: true,
            require: true,
        },
        createAt: {
            type: Date,
            default: Date.now(),
        },
    })
);
