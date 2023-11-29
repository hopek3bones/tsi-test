const { Schema, model } = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema({
    name: {type: String, required: true},

    email: {
        type : String,
        required: true,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },

    password: {type: String, required: true},

    role: {
        type: String,
        enum: ["user", "organizer"],
        default : "user"
    }, 
 
}, {
    timestamps: true,
    versionKey: false,
})

const UserModel = model("user", UserSchema);

module.exports = UserModel;