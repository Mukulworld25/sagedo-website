import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, Upload, CheckCircle, AlertCircle, ArrowLeft, Image as ImageIcon, Video, X } from 'lucide-react';
import { trackReviewSubmit } from '@/hooks/useAnalytics';
import { supabase } from '@/lib/supabase';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

export default function ShareYourExperience() {
    const [name, setName] = useState('');
    const [business, setBusiness] = useState('');
    const [rating, setRating] = useState<number>(5);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [writtenReview, setWrittenReview] = useState('');
    const [consent, setConsent] = useState(false);

    // File upload state
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!name.trim() || !business.trim() || !writtenReview.trim()) {
            setErrorMessage('Please fill in your name, business name, and review.');
            return;
        }

        if (rating < 1 || rating > 5) {
            setErrorMessage('Please provide a star rating between 1 and 5.');
            return;
        }

        if (!consent) {
            setErrorMessage('Please accept the consent checkbox to publish your feedback.');
            return;
        }

        setIsSubmitting(true);

        try {
            let uploadedMediaUrl: string | null = null;

            // Upload media to Supabase Storage bucket 'testimonials' if selected
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

                if (uploadError) {
                    console.error('Storage upload error:', uploadError);
                    // Attempt fallback upload endpoint
                    const formData = new FormData();
                    formData.append('file', mediaFile);
                    const fallbackRes = await fetch('/api/upload-review-media', {
                        method: 'POST',
                        body: formData
                    }).catch(() => null);

                    if (fallbackRes && fallbackRes.ok) {
                        const fallbackData = await fallbackRes.json();
                        uploadedMediaUrl = fallbackData.url;
                    } else {
                        throw new Error('Failed to upload photo/video. Please try a smaller file or submit without media.');
                    }
                } else if (uploadData) {
                    const { data: { publicUrl } } = supabase.storage
                        .from('testimonials')
                        .getPublicUrl(uploadData.path);
                    uploadedMediaUrl = publicUrl;
                }
            }

            const reviewPayload = {
                name: name.trim(),
                business: business.trim(),
                rating,
                written_review: writtenReview.trim(),
                media_url: uploadedMediaUrl,
                media_type: mediaType,
                consent,
                status: 'pending' // Pending admin approval in Supabase dashboard
            };

            // 1. Submit via server API endpoint (which handles DB insert and notifies admin)
            const apiRes = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewPayload)
            });

            if (!apiRes.ok) {
                // Direct Supabase insert fallback (with anon INSERT policy)
                const { error: insertError } = await supabase
                    .from('testimonials')
                    .insert([reviewPayload]);

                if (insertError) {
                    throw new Error(insertError.message || 'Failed to submit review.');
                }
            }

            // Track GA4 event
            trackReviewSubmit({
                rating,
                has_media: !!uploadedMediaUrl
            });

            setIsSuccess(true);
        } catch (error: any) {
            console.error('Submit review error:', error);
            setErrorMessage(error.message || 'Could not submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Share Your Experience | SAGE DO</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <main className="min-h-screen bg-[#09090b] text-white pt-24 pb-20 relative overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-2xl relative z-10">

                    {isSuccess ? (
                        <div className="bg-[#18181b] border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl font-black font-outfit text-white">
                                Thank You for Your Feedback!
                            </h1>
                            <p className="text-zinc-400 text-base leading-relaxed">
                                Your review has been submitted successfully. Our team reviews submissions before they go live on the site.
                            </p>
                            <div className="pt-4">
                                <Link href="/">
                                    <Button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl">
                                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#18181b] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
                            
                            <div className="text-center space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                                    Client Feedback
                                </p>
                                <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">
                                    Share Your Experience
                                </h1>
                                <p className="text-sm text-zinc-400">
                                    Tell us how SAGEDO helped your business grow. Your words help other founders make the right choice.
                                </p>
                            </div>

                            {errorMessage && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Star Rating (1-5) */}
                                <div className="space-y-2 text-center pb-2">
                                    <label className="text-sm font-medium text-zinc-300 block">
                                        Your Rating <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="flex items-center justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                type="button"
                                                key={star}
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                                                aria-label={`${star} star rating`}
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${
                                                        (hoverRating || rating) >= star
                                                            ? 'text-amber-400 fill-amber-400'
                                                            : 'text-zinc-600'
                                                    } transition-colors`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-zinc-500">
                                        {rating === 5 && 'Outstanding execution'}
                                        {rating === 4 && 'Great experience'}
                                        {rating === 3 && 'Average'}
                                        {rating <= 2 && 'Needs improvement'}
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="review-name" className="text-sm font-medium text-zinc-300">
                                            Your Name <span className="text-rose-500">*</span>
                                        </label>
                                        <Input
                                            id="review-name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Priya Singh"
                                            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500 h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="review-business" className="text-sm font-medium text-zinc-300">
                                            Business / Role <span className="text-rose-500">*</span>
                                        </label>
                                        <Input
                                            id="review-business"
                                            required
                                            value={business}
                                            onChange={(e) => setBusiness(e.target.value)}
                                            placeholder="e.g. Founder, Singh Textiles"
                                            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500 h-11"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="review-text" className="text-sm font-medium text-zinc-300">
                                        Written Review <span className="text-rose-500">*</span>
                                    </label>
                                    <Textarea
                                        id="review-text"
                                        required
                                        rows={4}
                                        value={writtenReview}
                                        onChange={(e) => setWrittenReview(e.target.value)}
                                        placeholder="What did SAGEDO build or automate for you? What was the result and turnaround time?"
                                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-rose-500 text-sm resize-none"
                                    />
                                </div>

                                {/* Optional Photo or Video Upload */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300 block">
                                        Optional Photo or Video
                                    </label>
                                    <p className="text-xs text-zinc-500">
                                        Images up to 5 MB (JPG, PNG, WebP) or video testimonial up to 50 MB (MP4, WebM, MOV).
                                    </p>

                                    {mediaFile ? (
                                        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-between">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                {mediaType === 'image' ? (
                                                    <ImageIcon className="w-5 h-5 text-rose-500 shrink-0" />
                                                ) : (
                                                    <Video className="w-5 h-5 text-rose-500 shrink-0" />
                                                )}
                                                <div className="truncate text-xs">
                                                    <p className="text-white font-medium truncate">{mediaFile.name}</p>
                                                    <p className="text-zinc-500">
                                                        {(mediaFile.size / (1024 * 1024)).toFixed(2)} MB • {mediaType}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-zinc-900/40">
                                            <Upload className="w-6 h-6 text-zinc-400 mb-2" />
                                            <span className="text-xs font-semibold text-zinc-300">Click to upload photo or video</span>
                                            <span className="text-[11px] text-zinc-500 mt-1">Image &le; 5 MB • Video &le; 50 MB</span>
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Required Consent Checkbox */}
                                <div className="pt-2">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <Checkbox
                                            id="publish-consent"
                                            checked={consent}
                                            onCheckedChange={(c) => setConsent(c === true)}
                                            required
                                            className="mt-1 border-zinc-600 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                                        />
                                        <span className="text-xs text-zinc-400 group-hover:text-zinc-300 leading-relaxed select-none">
                                            I agree to SAGE DO publishing my name, business name, and submitted review/media on their website and promotional materials.{' '}
                                            <span className="text-rose-500">*</span>
                                        </span>
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !consent}
                                    className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold h-12 text-base rounded-xl transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting Review...' : 'Submit Your Review'}
                                </Button>
                            </form>
                        </div>
                    )}

                </div>
            </main>
        </>
    );
}
