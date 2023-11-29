const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
    desc: {type: String, required: true},

    date: {type: String, required: true},

    venue: {type: String, required: true},
    
    playersLimit: {type: Number, required: true},

    type: {
        type: String,
        required: true
    }, 

    org_id: {type: String, required: true},

    org_name: {type: String, required: true},

    players: {
        type: Array
    }
 
}, {
    timestamps: true,
    versionKey: false,
})

const EventModel = model("event", EventSchema);

module.exports = EventModel;