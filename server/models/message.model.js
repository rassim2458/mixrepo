import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    // Unique Message Id
    

    // Unique ID of the user who sent the message
    SenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
    
    // ID of the conversation the message belongs to
    Chat_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
        
    Content: {
        type: String,
        required: true,
    },

    // Message type
    type: {
        type: String,
        enum: ['text', 'file', 'image'],
        required: true,
    },

    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Message.model.js
const Message = mongoose.model('Message', MessageSchema);
export default Message;
