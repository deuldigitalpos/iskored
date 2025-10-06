import React, { useState } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatProps {
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. I can help you with questions about iSKORED, setting up your scorecard, creating action plans, or understanding your reports. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputText('');
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('ssl') || lowerInput.includes('security')) {
      return "SSL (Secure Sockets Layer) is a security protocol that encrypts data transmitted between your browser and our servers. This means your sensitive information like passwords and business data is protected from unauthorized access. All iSKORED communications use 256-bit SSL encryption.";
    }
    
    if (lowerInput.includes('scorecard') || lowerInput.includes('balance')) {
      return "The Balance Scorecard helps you align your organization's activities with your vision and strategy. It tracks performance across four perspectives: Financial, Customer, Internal Process, and Learning & Growth. I recommend starting with 3-5 objectives per perspective and setting SMART goals.";
    }
    
    if (lowerInput.includes('action plan') || lowerInput.includes('goals')) {
      return "Action Plans turn your strategic objectives into executable tasks. Each initiative from your scorecard becomes a project with specific goals, deadlines, and assigned owners. I can help you break down complex objectives into manageable tasks.";
    }
    
    if (lowerInput.includes('survey') || lowerInput.includes('feedback')) {
      return "Surveys help gather stakeholder feedback to inform your strategy. You can send surveys to employees, customers, or partners to understand current performance and identify improvement areas. The AI analyzes responses to suggest strategic priorities.";
    }
    
    return "I understand you're asking about " + input + ". Could you be more specific? I can help with scorecard setup, action planning, survey creation, report interpretation, or general platform navigation.";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-6 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md h-96 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-xs text-accent">Online</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-primary' : 'bg-accent'
                }`}>
                  {message.sender === 'user' ? 
                    <User className="w-3 h-3 text-white" /> : 
                    <Bot className="w-3 h-3 text-white" />
                  }
                </div>
                <div className={`p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="bg-accent text-white p-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;