import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import { Server } from "socket.io";
//import jwt from 'jsonwebtoken';
//import getUserIdFromRequest from '../utils/IdFromToken.js'
// Function to send a new message to a conversation
export const sendMessageToConversation = async (req, res) => {
    const { SenderId, Content, ReceiverId, Type} = req.body;
    try {
        // If conversation does not exist, create a new one
        let conversation = await Conversation.findOne({
            members: { $all: [SenderId, ReceiverId] }
        });
        
        if (!conversation) {
            // Create conversation and store the result in a variable
            const conversationResult = await createConversation(SenderId, ReceiverId);
            // Check if conversation was successfully created
            if (conversationResult.conversation) {
                conversation = conversationResult.conversation;
            } else {
                // Handle error if conversation creation failed
                console.error(conversationResult.error);
                return res.status(500).json({ error: 'Failed to create conversation2' });
            }
        }

        let ChatId = conversation._id;
        // Create a new message
        const newMessage = new Message({
            type : Type,
            Chat_Id: conversation._id,
            SenderId,
            Content
});
        // Save the message
        await newMessage.save();

        //update the conversation document
        await Conversation.updateOne(
            { _id: ChatId },
            { $push: { messages: newMessage._id } }
        );

        // Emit the message to the conversation using Socket.io
        //io.emit("NewMessage");
        console.log("message_sent");
        //io.to(ChatId).emit('newMessage', newMessage);
        //console.log("message sent");
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// Function to create a conversation
export const createConversation = async (SenderId, ReceiverId) => {
    //const authHeader = req.headers.authorization;
  
    //if (!authHeader) {
      //  return res.status(401).json({ message: 'No token provided' });
    //}
    //const SenderId = getUserIdFromToken(authHeader);
    //console.log(SenderId);
    try {
        // Check if users exist
        const senderExists = await User.exists({ _id: SenderId });
        const receiverExists = await User.exists({ _id: ReceiverId });

        if (!senderExists || !receiverExists) {
            console.log('One or more users not found');
            return; // Exit the function
        }

        // Create a new conversation
        const newConversation = new Conversation({
            members: [SenderId, ReceiverId]
        });
        
        // Save the conversation
        await newConversation.save();
        
        // update the conversation field for both users 
        await User.updateOne(
            { _id: SenderId },
            { $push: { conversations: newConversation._id } }
        );
        await User.updateOne(
            { _id: ReceiverId },
            { $push: { conversations: newConversation._id } }
        );
        
        // Notify users in real time
        //io.to(SenderId).emit('newConversation', newConversation);
        //io.to(ReceiverId).emit('newConversation', newConversation);
        

        return { message: 'Conversation created successfully', conversation: newConversation };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to create conversation33' };
    }
};

// Function to fetch messages of a conversation
export const fetchConversationMessages = async (req, res) => {
    const { ChatId, userId} = req.body;
    //add userid in the requestparams
    console.log("userid",userId)
    console.log("chatid",ChatId)

    try {
        // Fetch conversation by conversationId
        const conversation = await Conversation.findById(ChatId);

        if (!conversation || conversation.messages.length === 0) {
            // If conversation is empty or does not exist, return "Start chatting!"
            res.status(200).json({ message: 'Start chatting' });
            return;
        }

        // Check if the user is a member of the conversation
        if (!conversation.members.includes(userId)) {
            res.status(403).json({ error: 'You are not a member of this conversation' });
            return;
        }

        // Fetch messages of the conversation
        const messages = await Message.find({ Chat_Id : ChatId });
        //console.log("fetched messages with success");

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

// Function to get a convo by Id
export const getConversation = async (req, res) => {
    const { ChatId ,userId} = req.body;

    try {
        const conversation = await Conversation.findById(ChatId);

        if (!conversation) {
            res.status(404).json({ message: 'Conversation not found' });
            return;
        }
        // Check if the user is a member of the conversation
        if (!conversation.members.includes(userId)) {
            res.status(403).json({ error: 'You are not a member of this conversation' });
            return;
        }

        res.status(200).json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch conversation' });
    }
};

// Function to get all conversations of a user
export const getUserConversations = async (req, res) => {
  
    const userId = req.params.userId; 
    //console.log(userId);

    try {
        // Fetch user by userId
        const user = await User.findById(userId).populate('conversations');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user.conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
};

// testing 
// Socket.io connection for real-time messaging
export const setupSocketIO = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('User connected');

        // Join a conversation room when the user connects
        socket.on('joinConversation', (conversationId) => {
            socket.join(conversationId);
        });
    });

    return io;
};