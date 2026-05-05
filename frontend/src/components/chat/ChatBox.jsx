import React, { useEffect, useState, useRef } from 'react';
import { getWithAuth, postWithAuth } from '@/service/httpService';
import { userAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';


















const ChatBox = ({ contactId, contactName, contactModel, contactImage }) => {
  const { user } = userAuthStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();

    // Polling every 3 seconds since Socket.io is removed
    const intervalId = setInterval(() => {
      fetchMessages(false);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [contactId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async (showLoading = true) => {
    try {
      if (showLoading && messages.length === 0) setLoading(true);
      const res = await getWithAuth(`/chat/${contactId}`);
      if (res.data) setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Optimistic UI update
    const tempMessage = {
      _id: `temp_${Date.now()}`,
      senderId: user?.id || '',
      senderModel: user?.type === 'doctor' ? 'Doctor' : 'Patient',
      receiverId: contactId,
      receiverModel: contactModel,
      content: newMessage,
      createdAt: new Date().toISOString()
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage('');

    try {
      const res = await postWithAuth('/chat/send', {
        receiverId: contactId,
        receiverModel: contactModel,
        content: tempMessage.content
      });

      if (res.data) {
        // Refresh immediately after DB saves
        fetchMessages(false);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Remove the temp message if failed
      setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
    }
  };

  return (
    <Card className="flex flex-col h-[600px] shadow-lg border">
      <CardHeader className="border-b bg-gray-50 rounded-t-lg py-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={contactImage} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {contactName?.charAt(0) || <User className="w-4 h-4" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{contactName}</CardTitle>
            <p className="text-xs text-green-600 font-medium">Online</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {loading ?
        <div className="flex justify-center items-center h-full">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div> :
        messages.length === 0 ?
        <div className="flex justify-center items-center h-full text-gray-500 flex-col space-y-2">
            <MessageSquare className="w-8 h-8 text-gray-300" />
            <p>No messages yet. Start the conversation!</p>
          </div> :

        messages.map((msg) => {
          const isMe = msg.senderId === user?.id;
          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              
                <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${isMe ?
                'bg-blue-600 text-white rounded-br-none' :
                'bg-gray-100 text-gray-800 rounded-bl-none'}`
                }>
                
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>);

        })
        }
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
        <form onSubmit={handleSend} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-gray-300 focus-visible:ring-blue-600" />
          
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </Card>);

};

export default ChatBox;