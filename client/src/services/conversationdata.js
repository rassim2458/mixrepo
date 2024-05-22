import conversation from "../redux/slices/conversation";
import {useQuery} from 'react-query';

//const token = localStorage.getItem("token");
export const fetchConversations = async (userId) => {
  const response = await fetch(`http://localhost:5000/conversations/users/${userId}/conversations`,{ headers:{ 'Authorization':token}});
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchUserInfo = async (userId) => {
  const inforesponse = await fetch(`http://localhost:5000/users/${userId}/info`,{headers:{'Authorization':token}});
  if(!inforesponse.ok){
    throw new Error(`HTTP error! status: ${inforesponse.status}`);
  }
  return inforesponse.json();
}

export const fetchConversationMessages = async (ChatId) => {
    const messagesresponse = await fetch(`http://localhost:5000/conversations/${ChatId}/messages`,{ headers:{ 'Authorization':token}});
  
    if(!messagesresponse.ok){
    throw new Error(`HTTP error! status: ${messagesresponse.status}`);
    }
    const messagesData = await messagesresponse.json(); 
    console.log("messages --->", messagesData);
    return messagesData;
};