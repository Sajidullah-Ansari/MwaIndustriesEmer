import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, FileText, Calendar, CheckCircle, AlertCircle, Download } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Admin = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [contacts, setContacts] = useState([]);
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contactsRes, rfqsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/admin/contacts`),
        fetch(`${BACKEND_URL}/api/admin/rfqs`)
      ]);
      
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContacts(contactsData);
      }
      if (rfqsRes.ok) {
        const rfqsData = await rfqsRes.json();
        setRfqs(rfqsData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (type, id, status) => {
    try {
      const endpoint = type === 'contact' 
        ? `${BACKEND_URL}/api/admin/contacts/${id}/status?status=${status}`
        : `${BACKEND_URL}/api/admin/rfqs/${id}/status?status=${status}`;
      
      const response = await fetch(endpoint, { method: 'PATCH' });
      
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const downloadFile = async (type, id) => {
    try {
      const endpoint = type === 'contact'
        ? `${BACKEND_URL}/api/admin/contacts/${id}/file`
        : `${BACKEND_URL}/api/admin/rfqs/${id}/file`;
      
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        const link = document.createElement('a');
        link.href = `data:application/octet-stream;base64,${data.file_data}`;
        link.download = data.file_name;
        link.click();
      }
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-blue-500/20 text-blue-400',
      in_progress: 'bg-yellow-500/20 text-yellow-400',
      completed: 'bg-green-500/20 text-green-400',
      closed: 'bg-slate-500/20 text-slate-400',
    };
    return styles[status] || styles.new;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen pt-32 lg:pt-44 pb-24" data-testid="admin-page">
      {/* Header */}
      <section className="py-8 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="font-mono text-xs uppercase tracking-widest text-[rgb(var(--safety-yellow))] mb-4 block">
              Admin Dashboard
            </span>
            <h1 className="font-oswald font-bold text-4xl uppercase tracking-tight text-[rgb(var(--text-primary))] mb-2">
              Form Submissions
            </h1>
            <p className="text-[rgb(var(--text-secondary))]">
              View and manage contact inquiries and quote requests.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-[rgb(var(--industrial-gray))] border-y border-[rgb(var(--border))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] p-6">
              <div className="flex items-center gap-3 mb-2">
                <Mail size={20} className="text-[rgb(var(--safety-yellow))]" />
                <span className="font-oswald text-3xl text-[rgb(var(--text-primary))]">{contacts.length}</span>
              </div>
              <span className="text-[rgb(var(--text-secondary))] text-sm">Contact Inquiries</span>
            </div>
            <div className="bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText size={20} className="text-[rgb(var(--safety-yellow))]" />
                <span className="font-oswald text-3xl text-[rgb(var(--text-primary))]">{rfqs.length}</span>
              </div>
              <span className="text-[rgb(var(--text-secondary))] text-sm">Quote Requests</span>
            </div>
            <div className="bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle size={20} className="text-blue-400" />
                <span className="font-oswald text-3xl text-[rgb(var(--text-primary))]">
                  {contacts.filter(c => c.status === 'new').length + rfqs.filter(r => r.status === 'new').length}
                </span>
              </div>
              <span className="text-[rgb(var(--text-secondary))] text-sm">New Submissions</span>
            </div>
            <div className="bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle size={20} className="text-green-400" />
                <span className="font-oswald text-3xl text-[rgb(var(--text-primary))]">
                  {contacts.filter(c => c.status === 'completed').length + rfqs.filter(r => r.status === 'completed').length}
                </span>
              </div>
              <span className="text-[rgb(var(--text-secondary))] text-sm">Completed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-[rgb(var(--industrial-black))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`font-oswald uppercase text-sm px-6 py-3 transition-all ${
                activeTab === 'contacts'
                  ? 'bg-[rgb(var(--safety-yellow))] text-black'
                  : 'bg-[rgb(var(--industrial-gray))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'
              }`}
              data-testid="admin-contacts-tab"
            >
              Contact Inquiries ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab('rfqs')}
              className={`font-oswald uppercase text-sm px-6 py-3 transition-all ${
                activeTab === 'rfqs'
                  ? 'bg-[rgb(var(--safety-yellow))] text-black'
                  : 'bg-[rgb(var(--industrial-gray))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'
              }`}
              data-testid="admin-rfqs-tab"
            >
              Quote Requests ({rfqs.length})
            </button>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-8 h-8 border-2 border-[rgb(var(--safety-yellow))] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-[rgb(var(--text-secondary))]">Loading submissions...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeTab === 'contacts' && contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[rgb(var(--industrial-gray))] border border-[rgb(var(--border))] p-6"
                >
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-oswald text-xl text-[rgb(var(--text-primary))]">{contact.name}</h3>
                      {contact.company_name && (
                        <p className="text-[rgb(var(--text-secondary))] text-sm">{contact.company_name}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-mono uppercase ${getStatusBadge(contact.status)}`}>
                        {contact.status.replace('_', ' ')}
                      </span>
                      <select
                        value={contact.status}
                        onChange={(e) => updateStatus('contact', contact.id, e.target.value)}
                        className="bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] text-[rgb(var(--text-primary))] text-sm px-3 py-1 focus:outline-none focus:border-[rgb(var(--safety-yellow))]"
                        data-testid={`contact-status-${contact.id}`}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--safety-yellow))] text-sm">
                      <Mail size={14} />
                      {contact.email}
                    </a>
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--safety-yellow))] text-sm">
                      <Phone size={14} />
                      {contact.phone}
                    </a>
                    <div className="flex items-center gap-2 text-[rgb(var(--text-secondary))] text-sm">
                      <Calendar size={14} />
                      {formatDate(contact.created_at)}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-xs text-[rgb(var(--text-secondary))] uppercase block mb-1">Requirement: {contact.requirement_type}</span>
                    <p className="text-[rgb(var(--text-secondary))] text-sm">{contact.message}</p>
                  </div>
                  
                  {contact.file_name && (
                    <button
                      onClick={() => downloadFile('contact', contact.id)}
                      className="flex items-center gap-2 text-[rgb(var(--safety-yellow))] text-sm hover:underline"
                    >
                      <Download size={14} />
                      {contact.file_name}
                    </button>
                  )}
                </motion.div>
              ))}

              {activeTab === 'rfqs' && rfqs.map((rfq) => (
                <motion.div
                  key={rfq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[rgb(var(--industrial-gray))] border border-[rgb(var(--border))] p-6"
                >
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-oswald text-xl text-[rgb(var(--text-primary))]">{rfq.name}</h3>
                      <p className="text-[rgb(var(--text-secondary))] text-sm">{rfq.company_name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-mono uppercase ${getStatusBadge(rfq.status)}`}>
                        {rfq.status.replace('_', ' ')}
                      </span>
                      <select
                        value={rfq.status}
                        onChange={(e) => updateStatus('rfq', rfq.id, e.target.value)}
                        className="bg-[rgb(var(--industrial-black))] border border-[rgb(var(--border))] text-[rgb(var(--text-primary))] text-sm px-3 py-1 focus:outline-none focus:border-[rgb(var(--safety-yellow))]"
                        data-testid={`rfq-status-${rfq.id}`}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <a href={`mailto:${rfq.email}`} className="flex items-center gap-2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--safety-yellow))] text-sm">
                      <Mail size={14} />
                      {rfq.email}
                    </a>
                    <a href={`tel:${rfq.phone}`} className="flex items-center gap-2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--safety-yellow))] text-sm">
                      <Phone size={14} />
                      {rfq.phone}
                    </a>
                    <div className="flex items-center gap-2 text-[rgb(var(--text-secondary))] text-sm">
                      <Calendar size={14} />
                      {formatDate(rfq.created_at)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-[rgb(var(--industrial-black))]/50 p-4">
                    <div>
                      <span className="text-xs text-[rgb(var(--text-secondary))] uppercase block mb-1">Service</span>
                      <span className="text-[rgb(var(--text-primary))] text-sm">{rfq.product_service}</span>
                    </div>
                    <div>
                      <span className="text-xs text-[rgb(var(--text-secondary))] uppercase block mb-1">Material</span>
                      <span className="text-[rgb(var(--text-primary))] text-sm">{rfq.material_type}</span>
                    </div>
                    <div>
                      <span className="text-xs text-[rgb(var(--text-secondary))] uppercase block mb-1">Quantity</span>
                      <span className="text-[rgb(var(--text-primary))] text-sm">{rfq.quantity}</span>
                    </div>
                    <div>
                      <span className="text-xs text-[rgb(var(--text-secondary))] uppercase block mb-1">Timeline</span>
                      <span className="text-[rgb(var(--text-primary))] text-sm">{rfq.timeline}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-xs text-[rgb(var(--text-secondary))] uppercase block mb-1">Delivery Location</span>
                    <p className="text-[rgb(var(--text-secondary))] text-sm">{rfq.delivery_location}</p>
                  </div>
                  
                  {rfq.notes && (
                    <div className="mb-4">
                      <span className="text-xs text-[rgb(var(--text-secondary))] uppercase block mb-1">Notes</span>
                      <p className="text-[rgb(var(--text-secondary))] text-sm">{rfq.notes}</p>
                    </div>
                  )}
                  
                  {rfq.file_name && (
                    <button
                      onClick={() => downloadFile('rfq', rfq.id)}
                      className="flex items-center gap-2 text-[rgb(var(--safety-yellow))] text-sm hover:underline"
                    >
                      <Download size={14} />
                      {rfq.file_name}
                    </button>
                  )}
                </motion.div>
              ))}

              {activeTab === 'contacts' && contacts.length === 0 && (
                <div className="text-center py-16 text-[rgb(var(--text-secondary))]">
                  No contact inquiries yet.
                </div>
              )}

              {activeTab === 'rfqs' && rfqs.length === 0 && (
                <div className="text-center py-16 text-[rgb(var(--text-secondary))]">
                  No quote requests yet.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;
