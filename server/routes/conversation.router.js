import express from 'express';
import { verifyToken } from "../middleware/auth.js";
import { getUserConversations, getConversation, fetchConversationMessages, createConversation, sendMessageToConversation } from '../controllers/conversation.controller.js';

const createRouter = (io) => { // Function to create the router
    const router = express.Router();

    
    // Route to get all conversations of a user
    router.get('/users/:userId/conversations',verifyToken,  getUserConversations);

    // Route to get a conversation by its ID
    router.get('/:ChatId', verifyToken, getConversation);

    // Route to get all messages in a conversation
    router.get('/:ChatId/messages', verifyToken, fetchConversationMessages);


    // Route to send a new message to a conversation
    router.post('/sendmessage',verifyToken,  (req, res) => {
        sendMessageToConversation(req, res); // Pass 'io' to 'sendMessageToConversation'
    });

    return router;
};

export default createRouter; // Export the function
