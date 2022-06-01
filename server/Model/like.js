const { Schema, model } = require("mongoose");

module.exports.Like = model(
    "Like",
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
    })
);
