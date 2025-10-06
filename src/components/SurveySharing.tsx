import React, { useState } from 'react';
import { X, Mail, Upload, Users, Copy, Send, CheckCircle, Clock, AlertCircle, Download, Plus, Trash2, Eye, BarChart3 } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  title?: string;
  status: 'pending' | 'sent' | 'opened' | 'completed' | 'bounced';
  sentDate?: string;
  completedDate?: string;
}

interface SurveySharingProps {
  surveyId: number;
  surveyTitle: string;
  onClose: () => void;
  onComplete: (contacts: Contact[]) => void;
}

const SurveySharing: React.FC<SurveySharingProps> = ({ 
  surveyId, 
  surveyTitle, 
  onClose, 
  onComplete 
}) => {
  const [activeTab, setActiveTab] = useState<'email' | 'csv' | 'link'>('email');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [emailList, setEmailList] = useState('');
  const [customMessage, setCustomMessage] = useState(`Hi there,

I'd like to invite you to participate in our strategic feedback survey: "${surveyTitle}".

Your insights are valuable to help us improve and align our strategic objectives. The survey takes approximately 5-10 minutes to complete.

Thank you for your time and input!

Best regards`);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvContacts, setCsvContacts] = useState<Contact[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [surveyLink] = useState(`https://iskored.com/survey/${surveyId}`);
  const [showPreview, setShowPreview] = useState(false);

  // Sample existing contacts for demo
  const [existingContacts] = useState<Contact[]>([
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', title: 'CEO', status: 'completed', sentDate: '2025-01-15', completedDate: '2025-01-16' },
    { id: 2, name: 'Mike Chen', email: 'mike.chen@company.com', title: 'CTO', status: 'sent', sentDate: '2025-01-15' },
    { id: 3, name: 'Lisa Rodriguez', email: 'lisa.rodriguez@company.com', title: 'CFO', status: 'opened', sentDate: '2025-01-15' },
    { id: 4, name: 'David Wilson', email: 'david.wilson@company.com', title: 'COO', status: 'pending' },
  ]);

  const handleEmailListChange = (value: string) => {
    setEmailList(value);
    
    // Parse emails and create contacts
    const emails = value.split(/[,\n]/).map(email => email.trim()).filter(email => email);
    const newContacts = emails.map((email, index) => ({
      id: Date.now() + index,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      status: 'pending' as const
    }));
    setContacts(newContacts);
  };

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvFile(file);
      setIsProcessing(true);
      
      // Simulate CSV processing
      setTimeout(() => {
        const mockCsvContacts: Contact[] = [
          { id: 101, name: 'Emma Davis', email: 'emma.davis@stakeholder.com', title: 'Board Member', status: 'pending' },
          { id: 102, name: 'Alex Thompson', email: 'alex.thompson@partner.com', title: 'Partner', status: 'pending' },
          { id: 103, name: 'Jennifer Lee', email: 'jennifer.lee@vendor.com', title: 'Account Manager', status: 'pending' },
          { id: 104, name: 'Michael Rodriguez', email: 'michael.rodriguez@client.com', title: 'Director', status: 'pending' },
          { id: 105, name: 'Rachel Kim', email: 'rachel.kim@consultant.com', title: 'Senior Consultant', status: 'pending' }
        ];
        setCsvContacts(mockCsvContacts);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const removeContact = (contactId: number, fromCsv = false) => {
    if (fromCsv) {
      setCsvContacts(prev => prev.filter(contact => contact.id !== contactId));
    } else {
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
    }
  };

  const sendSurvey = () => {
    const allContacts = [...contacts, ...csvContacts];
    
    // Simulate sending
    setIsProcessing(true);
    setTimeout(() => {
      const updatedContacts = allContacts.map(contact => ({
        ...contact,
        status: 'sent' as const,
        sentDate: new Date().toISOString().split('T')[0]
      }));
      
      onComplete(updatedContacts);
      setIsProcessing(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(surveyLink);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-accent text-white';
      case 'opened': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'bounced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'opened': return <Eye className="w-4 h-4" />;
      case 'sent': return <Mail className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'bounced': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalContacts = contacts.length + csvContacts.length + existingContacts.length;
  const completedCount = existingContacts.filter(c => c.status === 'completed').length;
  const sentCount = existingContacts.filter(c => c.status === 'sent' || c.status === 'opened').length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">Share Survey</h2>
              <p className="text-white/80 text-sm">{surveyTitle}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Summary */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{totalContacts}</div>
              <div className="text-xs text-white/80">Total Recipients</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{sentCount}</div>
              <div className="text-xs text-white/80">Sent</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{completedCount}</div>
              <div className="text-xs text-white/80">Completed</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full max-h-[calc(90vh-200px)]">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('email')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'email'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email Invites
              </button>
              <button
                onClick={() => setActiveTab('csv')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'csv'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Upload className="w-4 h-4 inline mr-2" />
                CSV Upload
              </button>
              <button
                onClick={() => setActiveTab('link')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'link'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Copy className="w-4 h-4 inline mr-2" />
                Share Link
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'email' && (
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Addresses
                  </label>
                  <textarea
                    value={emailList}
                    onChange={(e) => handleEmailListChange(e.target.value)}
                    placeholder="Enter email addresses separated by commas or new lines&#10;example@company.com, another@company.com"
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple emails with commas or new lines
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message
                  </label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  />
                </div>

                {contacts.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Recipients ({contacts.length})
                    </h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {contacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                          </div>
                          <button
                            onClick={() => removeContact(contact.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'csv' && (
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CSV File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-accent transition-colors">
                    {csvFile ? (
                      <div className="space-y-3">
                        <CheckCircle className="w-12 h-12 text-accent mx-auto" />
                        <div>
                          <p className="font-medium text-gray-900">{csvFile.name}</p>
                          <p className="text-sm text-gray-500">{(csvFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        {isProcessing && (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
                            <span className="text-sm text-gray-600">Processing...</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="font-medium text-gray-900">Upload contact list</p>
                          <p className="text-sm text-gray-500">CSV file with Name, Email, Title columns</p>
                        </div>
                        <label className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose CSV File
                          <input
                            type="file"
                            accept=".csv"
                            onChange={handleCsvUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">CSV Format Requirements</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• Required columns: Name, Email</p>
                      <p>• Optional columns: Title, Company</p>
                      <p>• First row should contain column headers</p>
                      <p>• Maximum 1000 contacts per upload</p>
                    </div>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      Download sample CSV
                    </button>
                  </div>
                </div>

                {csvContacts.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Imported Contacts ({csvContacts.length})
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {csvContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                            {contact.title && <p className="text-xs text-gray-500">{contact.title}</p>}
                          </div>
                          <button
                            onClick={() => removeContact(contact.id, true)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'link' && (
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Survey Link
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={surveyLink}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Share this link directly with stakeholders via your preferred communication method
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">QR Code</h4>
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <BarChart3 className="w-16 h-16 text-gray-400" />
                    </div>
                    <button className="text-sm text-accent hover:text-accent/80">
                      Download QR Code
                    </button>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Social Sharing</h4>
                    <div className="space-y-2">
                      <button className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                        Share on LinkedIn
                      </button>
                      <button className="w-full px-3 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-900 transition-colors">
                        Share on Twitter
                      </button>
                      <button className="w-full px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                        Share via WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Recipients Status */}
            {existingContacts.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Current Recipients Status ({existingContacts.length})
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {existingContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        {contact.title && <p className="text-xs text-gray-500">{contact.title}</p>}
                      </div>
                      <div className="flex items-center space-x-3">
                        {contact.sentDate && (
                          <div className="text-xs text-gray-500">
                            Sent: {new Date(contact.sentDate).toLocaleDateString()}
                          </div>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                          {getStatusIcon(contact.status)}
                          <span className="ml-1 capitalize">{contact.status}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {activeTab === 'email' && contacts.length > 0 && (
                  <span>{contacts.length} new recipients ready to send</span>
                )}
                {activeTab === 'csv' && csvContacts.length > 0 && (
                  <span>{csvContacts.length} contacts imported from CSV</span>
                )}
                {activeTab === 'link' && (
                  <span>Share link is ready to use</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                
                {(activeTab === 'email' || activeTab === 'csv') && (
                  <button
                    onClick={() => setShowPreview(true)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                )}
                
                {activeTab !== 'link' && (contacts.length > 0 || csvContacts.length > 0) && (
                  <button
                    onClick={sendSurvey}
                    disabled={isProcessing}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Survey
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveySharing;