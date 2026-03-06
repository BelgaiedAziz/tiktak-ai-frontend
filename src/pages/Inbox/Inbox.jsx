import React, { useState } from 'react';
import ChatList from '../../components/chat/ChatList';
import DashboardWelcome from '../../components/chat/DashboardWelcome';
import ActiveChat from '../../components/chat/ActiveChat';

const Inbox = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    const [chats, setChats] = useState([
        {
            id: 1,
            name: 'Sports Boutique',
            lastMessage: 'You: livreur Itawa la jeni',
            time: '5min',
            avatar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80',
            unread: 0,
        },
        {
            id: 2,
            name: 'JacketHub',
            lastMessage: 'You: Wakte takhlet l com....',
            time: '10:30',
            avatar: 'https://images.unsplash.com/photo-1551028719-01c1eb5c8ab4?w=150&q=80',
            unread: 0,
        },
        {
            id: 3,
            name: 'RobeShop',
            lastMessage: 'You: livreur Itawa la jeni',
            time: '11:45',
            avatar: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=150&q=80',
            unread: 1,
        },
        {
            id: 4,
            name: 'Sports Shoes',
            lastMessage: 'You: livreur Itawa la jeni',
            time: '15:36',
            avatar: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=150&q=80',
            unread: 5,
        },
        {
            id: 5,
            name: 'Dabchi store',
            lastMessage: 'Cet article est disponible',
            time: '16:46',
            avatar: 'https://images.unsplash.com/photo-1572018872087-0b04ebd9611b?w=150&q=80',
            unread: 0,
        },
        {
            id: 6,
            name: 'StreetWearTn',
            lastMessage: 'Typing..',
            time: '18:11',
            avatar: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=150&q=80',
            unread: 0,
        },
        {
            id: 7,
            name: 'AccessoiresTn',
            lastMessage: 'Je voudrais savoir les coul..',
            time: '20:46',
            avatar: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=150&q=80',
            unread: 2,
        }
    ]);

    // Handle starting a new chat from the dashboard
    const handleStartNewChat = (initialMessage) => {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const newChat = {
            id: Date.now(),
            name: 'AI Agent', // Default name for a new chat initiated from Dashboard
            lastMessage: `You: ${initialMessage}`,
            time: 'Just now',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80', // Temp AI Avatar
            unread: 0,
            initialMessageText: initialMessage, // Pass this so ActiveChat knows to render it first
            initialMessageTime: timeString
        };

        setChats([newChat, ...chats]);
        setSelectedChat(newChat);
    };

    // Handle updating an existing chat's last message
    const handleUpdateChat = (chatId, message, timeText) => {
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === chatId
                    ? { ...chat, lastMessage: `You: ${message}`, time: timeText }
                    : chat
            )
        );
    };

    return (
        <div className="flex-1 flex overflow-hidden bg-[#fafafa]">
            {/* Search and Chat List Panel */}
            <ChatList
                chats={chats}
                selectedChat={selectedChat}
                onSelectChat={(chat) => setSelectedChat(chat)}
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-[#fcfcfc]">
                {selectedChat ? (
                    <ActiveChat chat={selectedChat} onUpdateChat={handleUpdateChat} />
                ) : (
                    <DashboardWelcome onStartChat={handleStartNewChat} />
                )}
            </main>
        </div>
    );
};

export default Inbox;
