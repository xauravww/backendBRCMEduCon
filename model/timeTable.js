const mongoose = require('mongoose');

// Schema for individual events in the timetable
const eventSchema = new mongoose.Schema({
    id:{
        type: String,
    },
    title: {
        type: String,
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
    color: {
        type: String,
    },
    sem: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    facultyId: {
      type: String,
  },
  facultyName: {
      type: String,
  },
    subject:{
        type: String,
    }
});

// Pre-save hook to set the id field to the _id value
eventSchema.pre('save', function(next) {
    if (!this.id) {
        this.id = this._id.toString();
    }
    next();
});

const Timetable = mongoose.model('Timetable', eventSchema);

module.exports = Timetable;
