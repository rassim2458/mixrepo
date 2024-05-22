import express from 'express';
import { verifyToken } from "../middleware/auth.js";
import { fetchGroupMessages, createGroupChat, removeUserFromGroupChat, addUserToGroupChat, sendMessageToGroup } from '../controllers/group.controller.js';

const createGroupRouter = (io) => { // Function to create the router
    const router = express.Router();

    // Route to create a new group chat
    router.post('/groups', verifyToken, (req, res) => {
        createGroupChat(req, res, io); // Pass 'io' to 'createGroupChat'
    });

    // Route to send a new message to a group chat
    router.post('/:GroupId', verifyToken, (req, res) => {
        sendMessageToGroup(req, res, io); // Pass 'io' to 'sendMessageToGroup'
    });

    // Route to get all messages in a group chat
    router.get('/:GroupId/messages', verifyToken, fetchGroupMessages);

    // Route to add a user to a group chat
    router.put('/:GroupId/addUser', verifyToken, addUserToGroupChat);

    // Route to remove a user from a group chat
    router.put('/:GroupId/removeUser', verifyToken, removeUserFromGroupChat);

    return router;
};

export default createGroupRouter; // Export the function
