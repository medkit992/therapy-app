// src/components/MessagingHighFi.jsx
import React from 'react';
import { Plus, Paperclip, Send } from 'lucide-react';

// Stub components for Conversations and Chat Window
const ConversationList = () => (
    <div className="space-y-4">
        {['General', 'Client A', 'Client B'].map((conv, i) => (
            <div key={i} className="flex items-center p-2 hover:bg-teal-50 rounded cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-teal-200 flex items-center justify-center text-teal-600 font-medium mr-3">
                    {conv[0]}
                </div>
                <span className="text-gray-800">{conv}</span>
            </div>
        ))}
    </div>
);

const ChatWindow = () => (
    <div className="flex-1 bg-white shadow rounded-lg p-4 flex flex-col justify-between">
        <div className="overflow-auto mb-4">
            {[
                { from: 'Client', text: 'Hello, I need to reschedule.' },
                { from: 'Therapist', text: 'Sure, what time works for you?' }
            ].map((msg, i) => (
                <div key={i} className={`mb-3 text-${msg.from === 'Therapist' ? 'right' : 'left'}`}>
                    <span className={`inline-block p-2 rounded ${msg.from === 'Therapist' ? 'bg-teal-100' : 'bg-gray-200'} `}>
                        {msg.text}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

export default function MessagingHighFi() {
    return (
        <div className="flex h-screen bg-gray-50 p-6">
            <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
                <h2 className="text-2xl font-semibold text-teal-600 mb-8">Messaging</h2>
                <div className="flex-1 overflow-auto">
                    <ConversationList />
                </div>
                <button className="mt-4 bg-teal-600 text-white flex items-center justify-center p-2 rounded">
                    <Plus size={16} /> <span className="ml-2">New Conversation</span>
                </button>
            </aside>
            <main className="flex-1 flex flex-col ml-6">
                <ChatWindow />
                <div className="border-t p-4 flex items-center space-x-3 bg-white mt-4 rounded-lg shadow">
                    <input
                        placeholder="Type your message..."
                        className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-teal-200"
                    />
                    <button className="p-2 hover:bg-gray-100 rounded">
                        <Paperclip size={20} />
                    </button>
                    <button className="bg-teal-600 text-white p-2 rounded flex items-center space-x-1">
                        <Send size={20} /> <span>Send</span>
                    </button>
                </div>
            </main>
        </div>
    );
}