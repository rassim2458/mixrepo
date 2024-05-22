import mongoose from 'mongoose';
import User from './user.model.js'; 
import Message from './message.model.js';

const groupSchema = new mongoose.Schema({
    // Unique Group Id
    Chat_Id : {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        unique: true
    },
    

    //Group name
    name: {
        type: String,
        required: true 
    },

    // Array of user IDs who are members of the group
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }],

    // Array of message IDs in the group
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message' // Reference to the Message model
    }],

    // Admin of the group (single user ID)
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
        unique: true // Ensure each group has only one admin
    },
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


// Create Group model
const Group = mongoose.model('Group', groupSchema);
export default Group;

