import mongoose from 'mongoose';
import Message from './message.model.js';
import User from './user.model.js'


// Conversation Schema
const conversationSchema = new mongoose.Schema({
    // Unique Conversation Id
    Chat_Id : {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
    },

    // Array of user IDs who are members of the conversation
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],

    // Array of messages in the conversation
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],


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

// Create Conversation model
const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;

