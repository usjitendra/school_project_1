const mongoose = require('mongoose');
const db = require('../config/dbconnection');

// Define the student schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    class: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    permanent_address: {
        type: String,
        required: true
    },
    father_name: {
        type: String,
        required: true,
        trim: true
    },
    mother_name: {
        type: String,
        required: true,
        trim: true
    },
    father_occupation: {
        type: String,
        required: true,
        trim: true
    },
    mother_occupation: {
        type: String
    },
    student_mobile_number: {
        type: Number
    },
    mother_mobile_number: {
        type: Number,
        required: true
    },
    father_mobile_number: {
        type: Number,
        required: true,
        trim: true
    },
    student_email: {
        type: String,
        trim: true
    },
    father_email: {
        type: String,
        trim: true
    },
    mother_email: {
        type: String,
        trim: true
    },
    age:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    document: [{
        type: String,
        enum: ['aadhar', 'pan', 'driving licence']
    }]
});

// Export the 'student' model using the connection defined in db.connect
module.exports = db.connect.model('student', studentSchema);
