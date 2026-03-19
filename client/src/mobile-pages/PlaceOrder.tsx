import React, { useState, useEffect } from 'react';
import { Upload, ChevronRight, CheckCircle2, X, Star, Loader2, CreditCard, Sparkles, Clock, Shield } from 'lucide-react';
import { allServices, ServiceDetail } from '../data/serviceData';
import { useAuth } from '@/contexts/AuthContext';
import { apiRequest } from '@/lib/queryClient';

// Declare Razorpay on window
declare global {
  interface Window {
    Razorpay: any;
  }
}

const API_URL = 'https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1';

export const PlaceOrder: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    requirements: '',
    deliveryPreference: 'platform' as 'platform' | 'email',
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Pre-fill email when user loads
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'error' = 'error') => setToast({ message, type });

  const filteredServices = allServices.filter(s =>
    !searchQuery.trim() || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isGoldenEligible = selectedService?.isGoldenEligible && user?.hasGoldenTicket;
  const orderAmount = isGoldenEligible ? 0 : (selectedService?.price || 0);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      showToast('Please log in first to place an order.');
      return;
    }
    if (!selectedService) {
      showToast('Please select a service.');
      return;
    }
    if (!formData.email) {
      showToast('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload file if present
      let fileUrls: string[] = [];
      if (file) {
        const uploadFormData = new FormData();
        uploadFormData.append('files', file);
        const uploadRes = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: uploadFormData,
          credentials: 'include',
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          fileUrls = uploadData.urls || [];
        }
      }

      // 2. Create order via API
      const response = await apiRequest('POST', '/api/orders', {
        customerName: user?.name || '',
        customerEmail: formData.email,
        serviceName: selectedService.name,
        requirements: formData.requirements,
        fileUrls,
        deliveryPreference: formData.deliveryPreference,
        isFreeOrder: isGoldenEligible || orderAmount === 0,
      });

      const data = await response.json();
      const orderId = data.id;
      setCreatedOrderId(orderId);

      // 3. If free order, go straight to success
      if (isGoldenEligible || orderAmount === 0) {
        setStep('success');
        setIsSubmitting(false);
        return;
      }

      // 4. For paid orders, trigger Razorpay
      if (!isRazorpayLoaded) {
        showToast('Payment system loading, please try again.');
        setIsSubmitting(false);
        return;
      }

      const payRes = await fetch(`${API_URL}/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: orderAmount,
          service_name: selectedService.name,
          order_id: orderId,
        }),
      });

      if (!payRes.ok) throw new Error('Failed to create payment order');
      const paymentOrder = await payRes.json();

      const options = {
        key: paymentOrder.key_id,
        amount: paymentOrder.amount,
        currency: 'INR',
        name: 'SAGE DO',
        description: selectedService.name,
        order_id: paymentOrder.razorpay_order_id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch(`${API_URL}/verify-razorpay`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: orderId,
              }),
            });
            if (verifyRes.ok) {
              setStep('success');
            } else {
              showToast('Payment verification failed. Contact support.');
            }
          } catch {
            showToast('Payment verification failed.');
          }
        },
        prefill: { email: formData.email },
        theme: { color: '#ef4444' },
        modal: {
          ondismiss: () => showToast('Payment cancelled. Your order is saved.', 'error'),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      showToast(err?.message || 'Order submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ────────────────── SUCCESS SCREEN ──────────────────
  if (step === 'success') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Order Placed! 🎉</h2>
        <p className="text-neutral-400 text-sm mb-6">
          We've received your request. Track your order using the ID below.
        </p>
        <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl w-full mb-6">
          <p className="text-xs text-neutral-500 mb-1">Order ID</p>
          <p className="text-xl font-mono text-red-400 font-black">#{createdOrderId}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl w-full mb-6">
          <p className="text-xs text-neutral-500 mb-1">Service</p>
          <p className="text-sm text-white font-bold">{selectedService?.name}</p>
          <p className="text-xs text-neutral-500 mt-1">{isGoldenEligible ? '🎫 Free (Golden Ticket)' : `₹${orderAmount}`}</p>
        </div>
        <button
          onClick={() => { setStep('form'); setSelectedService(null); setCreatedOrderId(null); }}
          className="w-full py-3.5 rounded-2xl border border-white/10 text-white/80 text-sm font-bold active:scale-95 transition-all"
        >
          Place Another Order
        </button>
      </div>
    );
  }

  // ────────────────── ORDER FORM ──────────────────
  return (
    <div className="pb-32">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 left-4 right-4 z-50 p-4 rounded-2xl text-sm font-bold ${toast.type === 'error' ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'}`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Place Your Order
        </h1>
        <p className="text-xs text-neutral-400">
          Select a service, describe your needs, and we'll get it done.
        </p>
      </div>

      <div className="px-5 space-y-5">

        {/* ──── SERVICE SELECTOR ──── */}
        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Service *</label>
          {selectedService ? (
            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{selectedService.name}</p>
                <p className="text-neutral-400 text-xs">{selectedService.category} • {selectedService.priceRange}</p>
                {isGoldenEligible && (
                  <span className="inline-block mt-1 text-[9px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">🎫 FREE with Golden Ticket</span>
                )}
              </div>
              <button onClick={() => { setSelectedService(null); setShowServicePicker(true); }} className="p-2 rounded-xl bg-white/5 active:scale-90 transition-all">
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowServicePicker(true)}
              className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/8 text-left active:scale-[0.98] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Select a Service</p>
                    <p className="text-neutral-500 text-xs">Browse 30+ AI-powered services</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-600" />
              </div>
            </button>
          )}
        </div>

        {/* ──── SERVICE PICKER MODAL ──── */}
        {showServicePicker && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <h2 className="text-lg font-black text-white">Select a Service</h2>
              <button onClick={() => setShowServicePicker(false)} className="p-2 rounded-xl bg-white/5 active:scale-90 transition-all">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="px-5 py-3">
              <input
                placeholder="Search services..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/40"
              />
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-2">
              {filteredServices.map(service => (
                <button
                  key={service.id}
                  onClick={() => { setSelectedService(service); setShowServicePicker(false); setSearchQuery(''); }}
                  className="w-full p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-left active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-3">
                      <p className="text-white font-bold text-sm">{service.name}</p>
                      <p className="text-neutral-500 text-[11px] mt-0.5">{service.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-red-400 font-black text-sm">{service.priceRange.split(' - ')[0]}</p>
                      {service.isGoldenEligible && user?.hasGoldenTicket && (
                        <span className="text-[8px] font-bold text-amber-400">🎫 FREE</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ──── EMAIL ──── */}
        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Email Address *</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/40"
          />
          <p className="text-[10px] text-neutral-600 mt-1">We'll send order updates here</p>
        </div>

        {/* ──── REQUIREMENTS ──── */}
        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Requirements & Details *</label>
          <textarea
            placeholder="Describe exactly what you need..."
            value={formData.requirements}
            onChange={e => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-500/40 resize-none"
          />
        </div>

        {/* ──── FILE UPLOAD ──── */}
        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Attach Files (Optional)</label>
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center relative active:scale-[0.98] transition-all">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={e => setFile(e.target.files?.[0] || null)}
            />
            <Upload className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            {file ? (
              <p className="text-red-400 font-bold text-sm">{file.name}</p>
            ) : (
              <>
                <p className="text-neutral-300 text-sm font-bold">Tap to upload</p>
                <p className="text-neutral-600 text-[10px] mt-1">PDF, DOC, DOCX, ZIP, Images (Max 10MB)</p>
              </>
            )}
          </div>
        </div>

        {/* ──── DELIVERY PREFERENCE ──── */}
        <div>
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Delivery Method</label>
          <div className="grid grid-cols-2 gap-3">
            {['platform', 'email'].map(pref => (
              <button
                key={pref}
                onClick={() => setFormData(prev => ({ ...prev, deliveryPreference: pref as 'platform' | 'email' }))}
                className={`p-3.5 rounded-2xl text-center transition-all active:scale-95 ${formData.deliveryPreference === pref
                  ? 'bg-red-500/10 border border-red-500/30 text-white'
                  : 'bg-white/[0.03] border border-white/5 text-neutral-400'
                }`}
              >
                <p className="text-xs font-bold">{pref === 'platform' ? '📱 Dashboard' : '📧 Email'}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ──── ORDER SUMMARY ──── */}
        {selectedService && (
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Order Summary</p>
            <div className="flex items-center justify-between">
              <span className="text-neutral-300 text-sm">{selectedService.name}</span>
              <span className="text-white font-black text-sm">
                {isGoldenEligible ? <span className="text-green-400">FREE 🎫</span> : `₹${orderAmount}`}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[10px] text-neutral-500">
              <Shield className="w-3 h-3 text-green-500" /> Secure payment via Razorpay
              <span className="mx-1">•</span>
              <Clock className="w-3 h-3 text-red-400" /> 24-48h delivery
            </div>
          </div>
        )}

        {/* ──── SUBMIT BUTTON ──── */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedService}
          className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all ${
            !selectedService ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
            : isSubmitting ? 'bg-red-500/50 text-white/50'
            : 'bg-red-600 text-white'
          }`}
          style={{ boxShadow: selectedService ? '0 4px 20px rgba(239,68,68,0.3)' : 'none' }}
        >
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
          ) : isGoldenEligible ? (
            <><Star className="w-5 h-5" /> Claim Free Service</>
          ) : orderAmount === 0 ? (
            <><Sparkles className="w-5 h-5" /> Submit Order</>
          ) : (
            <><CreditCard className="w-5 h-5" /> Pay ₹{orderAmount} & Place Order</>
          )}
        </button>

        {/* ──── TRUST BADGES ──── */}
        <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-600 pb-4">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Satisfaction Guarantee</span>
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-blue-400" /> SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
};
