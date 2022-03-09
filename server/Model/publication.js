const { Schema, model } = require("mongoose");

module.exports.Publication = model(
    "Publication",
    Schema({
        idUser: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "User",
        },
        file: {
            type: String,
            trim: true,
            require: true,
        },
        typeFile: {
            type: String,
            trim: true,
        },
        createAt: {
            type: Date,
            default: Date.now(),
        },
    })
);
