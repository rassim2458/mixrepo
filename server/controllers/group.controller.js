import User from '../models/user.model.js'; 
import Group from '../models/group.model.js';
import Message from '../models/message.model.js';
import { Server } from "socket.io";

// Function to send a new message to a group
export const sendMessageToGroup = async (req, res ,io) => {
    const { ChatId, SenderId, Content } = req.body;

    // Check if the user is a member of the group
    const group = await Group.findById(SenderId);
    if (!group.members.includes(SenderId)) {
      return res.status(403).json({ message: "You are not a member of this group." });
    }

    try {
        // Create a new message
        const newMessage = new Message({
            ChatId,
            SenderId,
            Content
        });

        // Save the message
        await newMessage.save();
         // Update the messages field of the group object
        await Group.findByIdAndUpdate(ChatId, { $push: { messages: newMessage._id } });
        // Emit the message to the group using Socket.io
        io.to(ChatId).emit('newMessage', newMessage);

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// Function to fetch messages from a group
export const fetchGroupMessages = async (req, res) => {
    const { ChatId } = req.params;

    try {
        // Fetch messages of the group
        const messages = await Message.find({ ChatId });

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};


export const createGroupChat = async (req, res) => {
    const { members,adminId, name } = req.body;
     
    
    try {
        // Create a new group chat
        const newGroup = new Group({
            name,
            members: [req.body.adminId, ...req.body.members],
            admin: adminId // Set the admin to the authenticated user
        });

        // Save the group chat
        const group = await newGroup.save();

        // Update the chats field of each user with the new group chat ID
        await Promise.all(members.map(async (memberId) => {
            await User.findByIdAndUpdate(memberId, { $push: { groups: group._id } });
        }));
        await User.findByIdAndUpdate(adminId, { $push: { groups: group._id } });
        
        res.status(201).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create group chat' });
    }
};



// Function to kick a user out of a group
export const removeUserFromGroupChat = async (req, res) => {
    const { groupId, userIdToRemove } = req.body;
    const adminId = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id
    
    try {
        // Check if the authenticated user is the admin of the group
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        if (group.admin.toString() !== adminId) {
            return res.status(403).json({ error: 'Only the admin can remove users from the group' });
        }
        
        // Remove the user from the group's members array
        const updatedGroup = await Group.findByIdAndUpdate(groupId, {
            $pull: { members: userIdToRemove }
        }, { new: true });
        
        // Update the user's chats field to remove the group chat ID
        await User.findByIdAndUpdate(userIdToRemove, {
            $pull: { chats: groupId }
        });

        res.status(200).json(updatedGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove user from group chat' });
    }
};

// Function to add users to a group chat
export const addUserToGroupChat = async (req, res) => {
    const { groupId, usersToAdd } = req.body;
    const adminId = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id
    
    try {
        // Check if the authenticated user is the admin of the group
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        if (group.admin.toString() !== adminId) {
            return res.status(403).json({ error: 'Only the admin can add users to the group' });
        }
        
        // Add users to the group's members array
        const updatedGroup = await Group.findByIdAndUpdate(groupId, {
            $addToSet: { members: { $each: usersToAdd } }
        }, { new: true });
        
        // Update the chats field of added users to include the group chat ID
        await User.updateMany({ _id: { $in: usersToAdd } }, {
            $addToSet: { chats: groupId }
        });
        
        res.status(200).json(updatedGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add users to group chat' });
    }
};


// Socket.io connection for real-time messaging
export const setupSocketIO = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('User connected');

        // Join a group room when the user connects
        socket.on('joinGroup', (groupId) => {
            socket.join(groupId);
        });
    });

    return io;
};