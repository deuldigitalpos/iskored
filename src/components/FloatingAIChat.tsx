import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Shield, Sparkles, ArrowRight, Lightbulb, BarChart3, Target, Users, TrendingUp } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'canned' | 'normal';
}

interface FloatingAIChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FloatingAIChat: React.FC<FloatingAIChatProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your iSKORED AI Assistant 🎯 I can help you with strategic planning, scorecard creation, SWOT analysis, action plans, and performance insights. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCannedQuestions, setShowCannedQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const cannedQuestions = [
    {
      id: 1,
      text: "How do I create a balanced scorecard?",
      icon: <Target className="w-4 h-4" />,
      category: "Scorecard"
    },
    {
      id: 2,
      text: "What makes a good SWOT analysis?",
      icon: <TrendingUp className="w-4 h-4" />,
      category: "SWOT"
    },
    {
      id: 3,
      text: "How to improve survey response rates?",
      icon: <Users className="w-4 h-4" />,
      category: "Surveys"
    },
    {
      id: 4,
      text: "Show me industry benchmarks",
      icon: <BarChart3 className="w-4 h-4" />,
      category: "Reports"
    },
    {
      id: 5,
      text: "How to set realistic action plan deadlines?",
      icon: <TrendingUp className="w-4 h-4" />,
      category: "Action Plans"
    },
    {
      id: 6,
      text: "How to link SWOT to strategic objectives?",
      icon: <Target className="w-4 h-4" />,
      category: "Integration"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      type: text ? 'canned' : 'normal'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowCannedQuestions(false);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(messageText),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('balanced scorecard') || lowerInput.includes('scorecard')) {
      return "Great question! A balanced scorecard aligns your strategy across four key perspectives:\n\n🎯 **Financial** - Revenue, profitability, cost management\n👥 **Customer** - Satisfaction, retention, market share\n⚙️ **Internal Process** - Efficiency, quality, innovation\n📚 **Learning & Growth** - Employee skills, culture, technology\n\nStart with 3-5 objectives per perspective. Would you like me to guide you through creating your first scorecard?";
    }
    
    if (lowerInput.includes('swot') || lowerInput.includes('swot analysis')) {
      return "Excellent! A strong SWOT analysis is the foundation of strategic planning:\n\n💪 **Strengths** - Internal positive factors you can leverage\n⚠️ **Weaknesses** - Internal areas needing improvement\n🚀 **Opportunities** - External factors you can capitalize on\n🛡️ **Threats** - External challenges to prepare for\n\n**Pro Tips:**\n• Be specific and evidence-based\n• Link each item to strategic objectives\n• Create action plans from your insights\n• Update regularly as conditions change\n\nWant help connecting your SWOT to your balance scorecard?";
    }
    
    if (lowerInput.includes('survey') || lowerInput.includes('response rate')) {
      return "Here are proven strategies to boost survey response rates:\n\n📧 **Timing**: Send Tuesday-Thursday, 10am-2pm\n📝 **Length**: Keep to 8-12 questions (5-10 minutes)\n🎯 **Personalization**: Use recipient names and relevant context\n📱 **Mobile-friendly**: Ensure responsive design\n🎁 **Incentives**: Consider small rewards or recognition\n⏰ **Follow-up**: Send 1-2 gentle reminders\n\nOur data shows these tactics can improve response rates by 40-60%!";
    }
    
    if (lowerInput.includes('benchmark') || lowerInput.includes('industry')) {
      return "Industry benchmarks help you understand your competitive position:\n\n📊 **Financial Metrics**: Revenue growth, profit margins, ROI\n👥 **Customer Metrics**: NPS scores, retention rates, acquisition costs\n⚙️ **Operational Metrics**: Efficiency ratios, quality scores\n📈 **Growth Metrics**: Market share, innovation rates\n\nI can provide specific benchmarks for your industry. What sector are you in? Our database covers 15+ industries with quarterly updates.";
    }
    
    if (lowerInput.includes('action plan') || lowerInput.includes('deadline')) {
      return "Setting realistic deadlines is crucial for action plan success:\n\n⏱️ **Buffer Time**: Add 20-30% to initial estimates\n📋 **Break Down Tasks**: Large projects into smaller milestones\n👥 **Resource Check**: Ensure team availability\n🔄 **Dependencies**: Map task relationships\n📊 **Historical Data**: Learn from past project timelines\n\nRule of thumb: If it feels tight, it probably is! Better to under-promise and over-deliver.";
    }
    
    if (lowerInput.includes('link') || lowerInput.includes('connect') || lowerInput.includes('integration')) {
      return "Strategic integration is key to success! Here's how to connect your tools:\n\n🔗 **SWOT → Scorecard**: Convert opportunities into objectives\n🎯 **Scorecard → Action Plans**: Turn objectives into executable tasks\n📊 **Action Plans → Reports**: Track progress and measure success\n📋 **Surveys → SWOT**: Gather insights to update your analysis\n\n**Best Practice**: Review and update connections quarterly to ensure alignment. Each strategic element should support the others in a cohesive framework.";
    }
    
    if (lowerInput.includes('help') || lowerInput.includes('start')) {
      return "I'm here to help you succeed with strategic performance management! I can assist with:\n\n🎯 **Strategy Development** - Vision, mission, objectives\n📊 **Scorecard Creation** - Balanced scorecard best practices\n🔍 **SWOT Analysis** - Strategic situation assessment\n📋 **Action Planning** - Goal setting and execution\n📈 **Performance Tracking** - KPIs and metrics\n📊 **Data Analysis** - Insights and recommendations\n🔍 **Benchmarking** - Industry comparisons\n\nWhat specific area would you like to explore first?";
    }
    
    return `I understand you're asking about "${input}". As your iSKORED AI Assistant, I can help with strategic planning, balanced scorecards, SWOT analysis, action plans, surveys, and performance analytics. Could you be more specific about what you'd like to know? I'm here to provide expert guidance tailored to your strategic needs! 🎯`;
  };

  const handleCannedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-accent hover:bg-accent/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 animate-glow"
        title="Ask iSKORED AI Assistant"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">iSKORED AI</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs text-white/90">Online & Ready</span>
              <Shield className="w-3 h-3 text-accent" title="Secure & Private" />
            </div>
          </div>
        </div>
        <button 
          onClick={onToggle}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Security Badge */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
          <Shield className="w-3 h-3 text-accent" />
          <span>End-to-end encrypted • GDPR compliant • Your data stays private</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' ? 'bg-primary' : 'bg-accent'
              }`}>
                {message.sender === 'user' ? 
                  <User className="w-4 h-4 text-white" /> : 
                  <Bot className="w-4 h-4 text-white" />
                }
              </div>
              <div className={`p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-900 shadow-sm border border-gray-200'
              }`}>
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-accent" />
                      <span className="text-xs text-accent font-medium">AI</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[85%]">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Canned Questions */}
      {showCannedQuestions && messages.length === 1 && (
        <div className="border-t border-gray-200 p-4 bg-white">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-accent" />
            Quick Questions
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {cannedQuestions.slice(0, 4).map((question) => (
              <button
                key={question.id}
                onClick={() => handleCannedQuestion(question.text)}
                className="flex items-center justify-between p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group border border-gray-200 hover:border-accent/30"
              >
                <div className="flex items-center space-x-2">
                  <div className="text-accent">
                    {question.icon}
                  </div>
                  <span className="flex-1">{question.text}</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-accent transition-colors" />
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowCannedQuestions(false)}
            className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Hide suggestions
          </button>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me about strategy, scorecards, SWOT, or performance..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping}
            className="bg-accent text-white p-2 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {/* Powered by */}
        <div className="flex items-center justify-center mt-2 space-x-2">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>Powered by iSKORED AI</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Shield className="w-3 h-3 text-accent" />
            <span>Secure & Private</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAIChat;