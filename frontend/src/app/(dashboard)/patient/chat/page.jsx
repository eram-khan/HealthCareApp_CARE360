"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import Header from "@/components/landing/Header";
import ChatBox from "@/components/chat/ChatBox";
import { getWithAuth } from "@/service/httpService";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MessageSquare } from "lucide-react";

const PatientChatPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await getWithAuth('/chat/contacts/list');
      if (res.data) {
        setContacts(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header showDashboardNav={true} />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Contacts Sidebar */}
            <div className="md:col-span-1">
              <Card className="h-[600px] flex flex-col shadow-lg border">
                <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                    Chats
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                  {/* Default Dummy Doctor Contact visible always if not in list yet to encourage starting */}
                  {!contacts.some((c) => c._id === 'dummy_doctor_123') &&
                  <div
                    onClick={() => setSelectedContact({
                      _id: 'dummy_doctor_123',
                      name: 'Dr. Health Bot',
                      specialization: 'General AI Assistant',
                      type: 'Doctor'
                    })}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedContact?._id === 'dummy_doctor_123' ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-100'}`}>
                    
                      <Avatar>
                        <AvatarFallback className="bg-green-100 text-green-600"><MessageSquare className="w-4 h-4" /></AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Dr. Health Bot</p>
                        <p className="text-xs text-gray-500">AI Assistant</p>
                      </div>
                    </div>
                  }

                  {loading ?
                  <div className="text-center text-sm text-gray-500 p-4">Loading contacts...</div> :
                  contacts.length === 0 ?
                  <div className="text-center text-sm text-gray-500 p-4 mt-2">No other recent chats.</div> :

                  contacts.map((contact) =>
                  <div
                    key={contact._id}
                    onClick={() => setSelectedContact(contact)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedContact?._id === contact._id ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-100'}`}>
                    
                        <Avatar>
                          <AvatarImage src={contact.profileImage} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {contact.name?.charAt(0) || <User className="w-4 h-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm text-gray-900">{contact.name}</p>
                          <p className="text-xs text-gray-500">{contact.specialization || contact.type}</p>
                        </div>
                      </div>
                  )
                  }
                </div>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-3">
              {selectedContact ?
              <ChatBox
                contactId={selectedContact._id}
                contactName={selectedContact.name}
                contactModel={selectedContact.type}
                contactImage={selectedContact.profileImage} /> :


              <Card className="h-[600px] flex items-center justify-center shadow-lg border bg-white">
                  <CardContent className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      Select a conversation from the sidebar or start a new chat with the AI Assistant to get instant help.
                    </p>
                  </CardContent>
                </Card>
              }
            </div>

          </div>
        </div>
      </div>
    </>);

};

export default PatientChatPage;