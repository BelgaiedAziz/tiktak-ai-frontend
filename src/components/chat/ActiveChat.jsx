import React, { useState, useRef, useEffect } from 'react';
import TopActionBar from './TopActionBar';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';

const ActiveChat = ({ chat, onUpdateChat }) => {

    // Initialize state with default mock messages
    const defaultMessages = [
        {
            id: 1,
            sender: 'user',
            text: 'Salem svp nheb nchouf el sbedri malbous reel wala video kn andek bellehi',
            time: '12:25'
        },
        {
            id: 2,
            sender: 'ai',
            text: 'Hello! I\'m your personal AI Assistant. Comment puis-je vous aider aujourd\'hui?',
            time: '12:25'
        },
        {
            id: 3,
            sender: 'ai',
            text: 'Voici une description de l\'article que vous cherchez : Basket noir taille 42 en stock.',
            time: '12:26'
        },
        {
            id: 4,
            sender: 'user',
            text: 'nheb naadi commande mela fl article hetha 42 taille w couleur noir aychek',
            time: '12:27'
        }
    ];

    // Check if we are opening a brand new chat spawned from the Dashboard
    const initialMessages = chat?.initialMessageText ? [
        {
            id: 1,
            sender: 'user',
            text: chat.initialMessageText,
            time: chat.initialMessageTime
        }
    ] : defaultMessages;

    // Notice we re-initialize state if the chat ID changes. 
    // This allows clicking between different chats to "reset" the view.
    const [messages, setMessages] = useState(initialMessages);

    // Reset messages when the chat object changes
    useEffect(() => {
        if (chat?.initialMessageText) {
            setMessages([
                {
                    id: 1,
                    sender: 'user',
                    text: chat.initialMessageText,
                    time: chat.initialMessageTime
                }
            ]);

            // Simulate AI reply to the first message immediately
            setTimeout(() => {
                const now = new Date();
                const aiTimeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    sender: 'ai',
                    text: "Bonjour ! J'ai bien reçu votre message. Comment puis-je vous assister ?",
                    time: aiTimeString
                }]);
            }, 1000);

        } else {
            setMessages(defaultMessages);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat.id]);


    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom whenever messages array changes
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (text) => {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        // Append new message from user
        const newUserMsg = {
            id: Date.now(),
            sender: 'user',
            text: text,
            time: timeString
        };

        setMessages(prev => [...prev, newUserMsg]);

        // Trigger side-effect to update Inbox chat preview
        if (onUpdateChat) {
            onUpdateChat(chat.id, text, timeString);
        }

        // Mock an AI response after a short delay for demonstration
        setTimeout(() => {
            const aiResponseTime = new Date();
            const aiTimeString = `${aiResponseTime.getHours().toString().padStart(2, '0')}:${aiResponseTime.getMinutes().toString().padStart(2, '0')}`;

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: "C'est noté ! Je transmets votre demande à notre équipe. Avez-vous besoin d'autre chose ?",
                time: aiTimeString
            }]);
        }, 1500);
    };

    return (
        <div className="flex-1 flex flex-col relative w-full h-full bg-[#fcfcfc] overflow-hidden">

            {/* Top Header section mirroring the dashboard padding */}
            <div className="w-full flex justify-end px-6 md:px-10 py-6 border-b border-gray-100 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] z-20">
                <TopActionBar />
            </div>

            {/* Messages area wrapper. 
          Use overflow-y-auto here to push the input down only to the bottom of the container,
          but keep scrolling confined to the chat history itself. */}
            <div className="flex-1 flex flex-col px-4 md:px-12 w-full max-w-5xl mx-auto overflow-hidden">

                {/* Date Badge */}
                <div className="w-full flex justify-center py-2 my-5 shrink-0 transition-opacity">
                    <div className="bg-[#6b7280] text-white text-[12.5px] tracking-wide font-bold px-4 py-1.5 rounded-full shadow-sm hover:shadow-md hover:bg-gray-600 transition-all cursor-default relative overflow-hidden group">
                        <span className="relative z-10">Today</span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
                    </div>
                </div>

                {/* Chat History scrollable area */}
                <div className="flex-1 overflow-y-auto pr-2 pb-4 scroll-smooth scrollbar-hide flex flex-col">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}
                    {/* Invisible div used to anchor scrolling to bottom */}
                    <div ref={messagesEndRef} className="h-4 shrink-0"></div>
                </div>

                {/* Chat Input remains sticky at the bottom */}
                <div className="shrink-0 pb-4 pt-2 bg-[#fcfcfc]">
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </div>
    );
};

export default ActiveChat;
