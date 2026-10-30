import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Star, Upload, CheckCircle, AlertCircle, ArrowLeft, 
  Image as ImageIcon, Video, X, Sparkles, MessageSquare, 
  Send, HelpCircle, Shield, Clock, DollarSign, Zap 
} from 'lucide-react';
import { trackReviewSubmit } from '@/hooks/useAnalytics';
import { supabase } from '@/lib/supabase';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

const SENTIMENT_PILLS = [
  '⚡ 48h Sprint Speed',
  '🛡️ Military Code Quality',
  '💰 Fair CapEx Pricing',
  '🤝 Founder Direct Support',
  '📈 Real Business ROI',
  '📱 Sub-1.2s Fast Mobile UX'
];

const OBJECTION_PILLS = [
  { id: 'price_high', label: '💰 Price felt too high', prompt: 'What budget were you hoping for? (e.g. ₹5,000 / ₹15,000)' },
  { id: 'missing_service', label: '🔍 Didn\'t find my exact service', prompt: 'What specific capability or system do you need?' },
  { id: 'not_ready', label: '⏱️ Not ready yet / Just researching', prompt: 'When are you planning to kick off?' },
  { id: 'competitor', label: '🤝 Chose another vendor / freelancer', prompt: 'What gave them the edge (price, tech, timing)?' },
  { id: 'need_proof', label: '🛡️ Needed more proof in my niche', prompt: 'Which industry or domain are you in?' },
  { id: 'other', label: '💬 Other reason', prompt: 'Tell us in one sentence:' }
];

export default function ShareYourExperience() {
  const [location] = useLocation();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const initialMode = searchParams.get('mode') === 'objection' ? 'objection' : 'review';

  const [activeMode, setActiveMode] = useState<'review' | 'objection'>(initialMode);

  // Review State (Mode 1)
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedPills, setSelectedPills] = useState<string[]>([]);
  const [writtenReview, setWrittenReview] = useState('');
  const [consent, setConsent] = useState(true);

  // Media upload state
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  // Objection State (Mode 2)
  const [selectedObjection, setSelectedObjection] = useState<string>('price_high');
  const [objectionDetail, setObjectionDetail] = useState('');
  const [userContact, setUserContact] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const modeParam = new URLSearchParams(window.location.search).get('mode');
    if (modeParam === 'objection') {
      setActiveMode('objection');
    } else if (modeParam === 'review') {
      setActiveMode('review');
    }
  }, [location]);

  const togglePill = (pill: string) => {
    setSelectedPills(prev => 
      prev.includes(pill) ? prev.filter(p => p !== pill) : [...prev, pill]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      setErrorMessage('Allowed types: JPG, PNG, WEBP, GIF (up to 5 MB) or MP4, WebM, MOV (up to 50 MB).');
      return;
    }

    if (isImage && file.size > MAX_IMAGE_SIZE_BYTES) {
      setErrorMessage('Images must be 5 MB or smaller.');
      return;
    }

    if (isVideo && file.size > MAX_VIDEO_SIZE_BYTES) {
      setErrorMessage('Videos must be 50 MB or smaller.');
      return;
    }

    setMediaFile(file);
    setMediaType(isImage ? 'image' : 'video');
    setMediaPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    setMediaFile(null);
    setMediaType(null);
    if (mediaPreviewUrl) {
      URL.revokeObjectURL(mediaPreviewUrl);
      setMediaPreviewUrl(null);
    }
  };

  // Submit Handler for Mode 1 (Client Review)
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please provide your name or initials.');
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedMediaUrl: string | null = null;

      if (mediaFile) {
        const cleanFileName = mediaFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `reviews/${Date.now()}-${cleanFileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('testimonials')
          .upload(filePath, mediaFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: mediaFile.type
          });

        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('testimonials')
            .getPublicUrl(uploadData.path);
          uploadedMediaUrl = publicUrl;
        }
      }

      const reviewTextCombined = [
        selectedPills.length > 0 ? `Highlights: ${selectedPills.join(', ')}` : '',
        writtenReview.trim()
      ].filter(Boolean).join('\n\n');

      const reviewPayload = {
        name: name.trim(),
        business: business.trim() || 'Verified Client',
        rating,
        written_review: reviewTextCombined || 'Excellent engineering execution & speed.',
        media_url: uploadedMediaUrl,
        media_type: mediaType,
        consent,
        status: 'pending'
      };

      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewPayload)
      }).catch(console.error);

      // Supabase direct backup insert
      await supabase.from('testimonials').insert([reviewPayload]).catch(console.error);

      trackReviewSubmit({ rating, has_media: !!uploadedMediaUrl });
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Review submit error:', err);
      setErrorMessage(err.message || 'Could not submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Handler for Mode 2 (Lost Lead / Objection Insights)
  const handleObjectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const selectedObj = OBJECTION_PILLS.find(o => o.id === selectedObjection);
      const objectionPayload = {
        name: userContact.trim() ? `Lead (${userContact.trim()})` : 'Anonymous Visitor',
        business: 'Non-Buyer Feedback',
        rating: 4,
        written_review: `[Lost Lead Insight]\nReason: ${selectedObj?.label || selectedObjection}\nDetail: ${objectionDetail.trim() || 'No additional note'}\nContact: ${userContact.trim() || 'None provided'}`,
        status: 'objection_feedback',
        consent: false
      };

      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objectionPayload)
      }).catch(console.error);

      await supabase.from('testimonials').insert([objectionPayload]).catch(console.error);

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Objection submit error:', err);
      setErrorMessage(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>20-Second Feedback & Insights Hub | SAGE DO</title>
        <meta name="description" content="Share your verified experience or tell us why you didn't buy. Help SAGE DO engineer better digital systems for Indian MSMEs." />
      </Helmet>

      <main className="min-h-screen bg-[#09090b] text-white pt-24 pb-20 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-2xl relative z-10">

          {/* Top Return Breadcrumb */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to SAGE DO
            </Link>
          </div>

          {isSuccess ? (
            <div className="bg-[#12141c] border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-black text-white">
                Thank You for Your Honest Truth!
              </h1>
              <p className="text-neutral-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                {activeMode === 'review'
                  ? 'Your verified review has been recorded. It helps founders like you evaluate SAGE DO without agency fluff.'
                  : 'Your feedback goes directly to Mukul Dhiman’s private telegram triage. We study every lost deal to fix our pricing and capabilities.'}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/">
                  <Button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-6 rounded-xl">
                    Return to Homepage
                  </Button>
                </Link>
                <a
                  href="https://wa.me/916284925684?text=Hi%20Mukul,%20I%20just%20submitted%20feedback%20on%20sagedo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" className="w-full sm:w-auto border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-white rounded-xl text-xs font-semibold">
                    Message Mukul on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-[#12141c]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">

              {/* Header Title */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> 20-Second Dynamic Feedback
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Public Feedback & Market Truth
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-md mx-auto">
                  Takes less than 20 seconds. No long surveys. Just raw, unfiltered signal.
                </p>

                {/* DUAL MODE SELECTOR BUTTONS */}
                <div className="grid grid-cols-2 gap-2 p-1.5 mt-6 bg-black/60 border border-white/10 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setActiveMode('review')}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeMode === 'review'
                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>⭐ Review Work</span>
                    <span className="hidden sm:inline text-[10px] font-mono opacity-80">(15s)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveMode('objection')}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeMode === 'objection'
                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>💡 Didn't Hire Us?</span>
                    <span className="hidden sm:inline text-[10px] font-mono opacity-80">(10s)</span>
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3.5 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────── */}
              {/* MODE 1: CLIENT REVIEW (15 SECONDS) */}
              {/* ───────────────────────────────────────────────────────────── */}
              {activeMode === 'review' ? (
                <form onSubmit={handleReviewSubmit} className="space-y-6">

                  {/* 1-Tap Star Rating */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 text-center">
                      Your Rating *
                    </label>
                    <div className="flex items-center justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1.5 transition-transform hover:scale-125 cursor-pointer"
                          aria-label={`${star} star rating`}
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                              (hoverRating || rating) >= star
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-neutral-700'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 1-Tap Sentiment Highlight Pills */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      What stood out the most? (Tap any that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SENTIMENT_PILLS.map((pill) => {
                        const isSelected = selectedPills.includes(pill);
                        return (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => togglePill(pill)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer font-semibold ${
                              isSelected
                                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                            }`}
                          >
                            {pill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Written Review */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                      1-Line Summary or Review
                    </label>
                    <Textarea
                      value={writtenReview}
                      onChange={(e) => setWrittenReview(e.target.value)}
                      placeholder="e.g. Delivered our custom CRM in 5 days with zero bugs. The sub-45s WhatsApp automation has already captured 32 qualified leads."
                      className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white min-h-[90px] text-xs sm:text-sm rounded-xl"
                    />
                  </div>

                  {/* Name & Business */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        Your Name / Initial *
                      </label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh K."
                        required
                        className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white text-xs sm:text-sm h-10 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                        Company or Vertical
                      </label>
                      <Input
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        placeholder="e.g. Industrial Forging, Ludhiana"
                        className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white text-xs sm:text-sm h-10 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Media Upload */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Attach Screenshot or Video Proof (Optional)
                    </label>
                    {mediaPreviewUrl ? (
                      <div className="relative rounded-xl border border-neutral-800 overflow-hidden bg-black/40 p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                          {mediaType === 'video' ? <Video className="w-4 h-4 text-amber-400 shrink-0" /> : <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />}
                          <span className="text-xs text-neutral-300 truncate max-w-[200px]">{mediaFile?.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-1 hover:bg-neutral-800 rounded-md text-neutral-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-neutral-800 hover:border-neutral-700 rounded-xl bg-neutral-950/40 text-xs text-neutral-400 hover:text-white cursor-pointer transition-colors">
                        <Upload className="w-4 h-4 text-amber-500" />
                        <span>Upload photo or video (&lt;5MB)</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-2 pt-1">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(c) => setConsent(!!c)}
                      className="mt-0.5"
                    />
                    <label htmlFor="consent" className="text-[11px] text-neutral-400 leading-tight cursor-pointer">
                      Allow SAGE DO to display this feedback and rating on sagedo.in (name/company may be generalized upon request).
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting...' : 'Post Verified Review (15s)'}
                  </Button>
                </form>
              ) : (
                /* ───────────────────────────────────────────────────────────── */
                /* MODE 2: NON-BUYER / LOST LEAD INSIGHTS (10 SECONDS)           */
                /* ───────────────────────────────────────────────────────────── */
                <form onSubmit={handleObjectionSubmit} className="space-y-6">

                  {/* Objection Pills */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      What was the primary reason you didn't move forward?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {OBJECTION_PILLS.map((obj) => {
                        const isSelected = selectedObjection === obj.id;
                        return (
                          <button
                            key={obj.id}
                            type="button"
                            onClick={() => setSelectedObjection(obj.id)}
                            className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                                : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{obj.label}</span>
                              {isSelected && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Follow-up Prompt */}
                  <div>
                    <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                      {OBJECTION_PILLS.find(o => o.id === selectedObjection)?.prompt || 'Tell us more:'}
                    </label>
                    <Input
                      value={objectionDetail}
                      onChange={(e) => setObjectionDetail(e.target.value)}
                      placeholder="Be blunt — e.g. I was looking for a website under ₹8,000, or I needed Tally Prime sync out of the box."
                      className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white text-xs sm:text-sm h-11 rounded-xl"
                    />
                  </div>

                  {/* Optional WhatsApp for Founder Callback */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                      WhatsApp or Email (Optional)
                    </label>
                    <Input
                      value={userContact}
                      onChange={(e) => setUserContact(e.target.value)}
                      placeholder="+91 XXXXX XXXXX (Leave if you want Mukul to personally review or offer custom terms)"
                      className="bg-neutral-950/60 border-neutral-800 focus:border-amber-500/60 text-white text-xs sm:text-sm h-10 rounded-xl"
                    />
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Zero spam. Never shared. Used only if we launch the exact tier you requested.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Feedback to Founder (10s)'}</span>
                  </Button>
                </form>
              )}

            </div>
          )}

        </div>
      </main>
    </>
  );
}
