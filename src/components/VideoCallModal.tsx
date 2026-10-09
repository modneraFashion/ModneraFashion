import React, { useState, useEffect } from 'react';
import {
  Video,
  X,
  Maximize2,
  Sun,
  Sparkles,
  Check,
  PhoneCall,
  Calendar,
  ShoppingBag,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { Product, BRAND_INFO } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface VideoCallModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyDirectFromCall: (product: Product, selectedSize: string) => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  product,
  onClose,
  onBuyDirectFromCall,
}) => {
  const [activeTab, setActiveTab] = useState<'live-preview' | 'schedule'>('live-preview');
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);
  const [warmLighting, setWarmLighting] = useState(false);
  const [macroZoom, setMacroZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');

  // Booking form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [preferredHub, setPreferredHub] = useState<'madhubani' | 'mumbai'>('madhubani');
  const [preferredTime, setPreferredTime] = useState('Today ·Within 30 Minutes');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes.includes('M') ? 'M' : product.sizes[0]);
      setActiveAngleIdx(0);
      setMacroZoom(false);
      setBookingConfirmed(false);
    }
  }, [product]);

  // Auto-cycle angles subtly if user hasn't zoomed
  useEffect(() => {
    if (!product || activeTab !== 'live-preview' || macroZoom) return;
    const timer = setInterval(() => {
      setActiveAngleIdx((prev) => (prev + 1) % product.galleryAngles.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [product, activeTab, macroZoom]);

  if (!product) return null;

  const currentAngle = product.galleryAngles[activeAngleIdx] || product.galleryAngles[0];

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    setBookingConfirmed(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-call-modal-title"
    >
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] border border-[#E5DEC9] rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#181615] text-[#FAF8F5] border-b border-[#2E2A27]">
          <div className="flex items-center gap-3">
            <Video className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 id="video-call-modal-title" className="font-display text-xl font-semibold tracking-wide">
                Modnera Live Video Boutique Inspection
              </h2>
              <p className="text-xs text-[#B8B0A8]">
                Inspect fabric drape, zardozi handwork & true color before you buy · Direct Desk: {BRAND_INFO.contact.phoneDisplay}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#B8B0A8] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close video call studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#F2ECE1] border-b border-[#E5DEC9] flex-wrap gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#E5DEC9]/70 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('live-preview')}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'live-preview'
                  ? 'bg-[#181615] text-white shadow-sm'
                  : 'text-[#4A433E] hover:text-[#181615]'
              }`}
            >
              Interactive Stylist Camera Feed
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'schedule'
                  ? 'bg-[#181615] text-white shadow-sm'
                  : 'text-[#4A433E] hover:text-[#181615]'
              }`}
            >
              Book 1-on-1 WhatsApp / Video Call
            </button>
          </div>

          <div className="text-xs text-[#5C534C]">
            <span>Showroom Unit: </span>
            <span className="font-medium text-[#181615]">
              Bhauwara Madhubani (847212) & Bandra Mumbai (400051)
            </span>
          </div>
        </div>

        {activeTab === 'live-preview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Interactive Boutique Camera Viewport */}
            <div className="lg:col-span-7 relative bg-[#12100F] min-h-[420px] lg:min-h-[520px] flex flex-col justify-between overflow-hidden">
              <div className="relative w-full h-full flex-1 overflow-hidden">
                <ResilientImage
                  src={currentAngle.image}
                  alt={`${product.name} - ${currentAngle.label}`}
                  className={`w-full h-[460px] lg:h-[520px] object-cover transition-all duration-500 ${
                    macroZoom ? 'scale-150' : currentAngle.transformClass
                  } ${
                    warmLighting ? 'sepia-[.22] brightness-105 contrast-105' : currentAngle.filterClass
                  }`}
                  style={{ objectPosition: currentAngle.objectPosition }}
                />

                {/* Measured Gradient Scrim for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50 pointer-events-none" />

                {/* Top Camera Overlay Info */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div className="bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/15">
                    <span className="font-medium">Stylist Cam · SKU {product.sku}</span>
                    <span className="mx-2 text-white/50">·</span>
                    <span className="text-[#E6C770]">{currentAngle.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setWarmLighting((prev) => !prev)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors whitespace-nowrap ${
                        warmLighting
                          ? 'bg-[#D4AF37] text-[#181615] border-[#D4AF37]'
                          : 'bg-black/65 text-white border-white/20 hover:bg-black/80'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      {warmLighting ? 'Evening Lighting' : 'Daylight Studio'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMacroZoom((prev) => !prev)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors whitespace-nowrap ${
                        macroZoom
                          ? 'bg-[#7A1C24] text-white border-[#7A1C24]'
                          : 'bg-black/65 text-white border-white/20 hover:bg-black/80'
                      }`}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      {macroZoom ? 'Reset Zoom' : '2x Weave Zoom'}
                    </button>
                  </div>
                </div>

                {/* Bottom Camera Angle Controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-white/80 mb-2">
                    <span className="font-semibold text-white">Stylist Note:</span> {currentAngle.caption}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {product.galleryAngles.map((angle, idx) => (
                      <button
                        key={angle.label}
                        type="button"
                        onClick={() => {
                          setActiveAngleIdx(idx);
                          setMacroZoom(false);
                        }}
                        className={`px-3 py-2 rounded-lg text-left border transition-all ${
                          activeAngleIdx === idx
                            ? 'bg-white text-[#181615] border-white shadow-md'
                            : 'bg-black/60 text-white/85 border-white/20 hover:bg-black/80'
                        }`}
                      >
                        <div className="text-[11px] font-mono-num opacity-70">Angle 0{idx + 1}</div>
                        <div className="text-xs font-semibold truncate">{angle.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Inspection Details & Instant Purchase */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-[#FAF8F5]">
              <div>
                <div className="text-xs text-[#7A1C24] font-medium">
                  {product.categoryName} · {product.atelierOrigin}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#181615] mt-1">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-xl font-bold font-mono-num text-[#181615]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-mono-num text-[#8A8077] line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-medium text-[#7A1C24]">
                    Direct Boutique Price
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5DEC9]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C534C] mb-2.5 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#7A1C24]" />
                    What Our Stylist Demonstrates on Call
                  </h4>
                  <ul className="space-y-2">
                    {product.videoInspectionHighlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#3A332E] leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-[#7A1C24] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5DEC9]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#181615]">Select Size to Lock Piece</span>
                    <span className="text-xs text-[#6E655F]">Fabric: {product.fabric}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                          selectedSize === sz
                            ? 'bg-[#181615] text-white border-[#181615]'
                            : 'bg-white text-[#3A332E] border-[#DCD3C2] hover:border-[#181615]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5DEC9] space-y-2.5">
                <button
                  type="button"
                  onClick={() => onBuyDirectFromCall(product, selectedSize)}
                  className="w-full py-3 px-4 bg-[#7A1C24] hover:bg-[#61151B] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Satisfied with Inspection — Buy Direct (₹{product.price.toLocaleString('en-IN')})
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${BRAND_INFO.contact.phoneRaw}`}
                    className="py-2.5 px-3 bg-white hover:bg-[#F2ECE1] text-[#181615] border border-[#DCD3C2] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#7A1C24]" />
                    Call {BRAND_INFO.contact.phoneDisplay}
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveTab('schedule')}
                    className="py-2.5 px-3 bg-white hover:bg-[#F2ECE1] text-[#181615] border border-[#DCD3C2] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#7A1C24]" />
                    Book WhatsApp Call
                  </button>
                </div>

                <p className="text-[11px] text-[#6E655F] text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7A1C24]" />
                  20-Minute Delivery in 847212 & 847211 · Express Insured Shipping Across India
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 lg:p-8 bg-[#FAF8F5]">
            {bookingConfirmed ? (
              <div className="max-w-xl mx-auto py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#7A1C24]/10 text-[#7A1C24] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display text-3xl font-bold text-[#181615]">
                  Live Video Call Appointment Confirmed
                </h3>
                <p className="text-sm text-[#4A433E] leading-relaxed">
                  Thank you, <span className="font-semibold text-[#181615]">{customerName}</span>. Our senior stylist at{' '}
                  <span className="font-semibold text-[#181615]">
                    {preferredHub === 'madhubani'
                      ? 'Shanghat Muhallah, Bhauwara, Madhubani (847212)'
                      : 'Mumbai Bandra Atelier (400051)'}
                  </span>{' '}
                  has reserved <span className="font-semibold text-[#7A1C24]">{product.name}</span> for your live video call at{' '}
                  <span className="font-semibold">{preferredTime}</span> on WhatsApp number{' '}
                  <span className="font-mono-num font-semibold">{customerPhone}</span>.
                </p>
                <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] text-xs text-[#3A332E] space-y-1">
                  <div>
                    Boutique Direct Helpline: <span className="font-mono-num font-semibold">{BRAND_INFO.contact.phoneDisplay}</span>
                  </div>
                  <div>
                    Concierge Email: <span className="font-semibold">info@modnera.com · modneracare@gmail.com</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => onBuyDirectFromCall(product, selectedSize)}
                    className="px-5 py-2.5 bg-[#7A1C24] text-white text-xs font-semibold rounded-lg hover:bg-[#61151B] transition-colors"
                  >
                    Proceed to Buy Directly Now
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 bg-white border border-[#DCD3C2] text-[#181615] text-xs font-semibold rounded-lg hover:bg-[#F2ECE1] transition-colors"
                  >
                    Return to Product Page
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleScheduleSubmit} className="max-w-2xl mx-auto space-y-5">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#181615]">
                    Request a Live 1-on-1 Video Call for “{product.name}”
                  </h3>
                  <p className="text-xs text-[#5C534C] mt-1">
                    Our boutique stylist will call you via WhatsApp Video from our Madhubani Flagship Store (847212) or Mumbai Bandra Factory (400051) to show you the actual piece in real time.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g., Aarti Sharma"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g., +91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24] font-mono-num"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                      Choose Showroom Camera Desk
                    </label>
                    <select
                      value={preferredHub}
                      onChange={(e) => setPreferredHub(e.target.value as 'madhubani' | 'mumbai')}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                    >
                      <option value="madhubani">
                        Madhubani Flagship Shop (Bhauwara Stadium Road 847212)
                      </option>
                      <option value="mumbai">
                        Mumbai Manufacturing Factory (Bandra 400051)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                    >
                      <option value="Today · Instant Connect (Within 15 Mins)">
                        Today · Instant Connect (Within 15 Mins)
                      </option>
                      <option value="Today · Evening Slot (5:00 PM – 8:00 PM)">
                        Today · Evening Slot (5:00 PM – 8:00 PM)
                      </option>
                      <option value="Tomorrow · Morning Slot (11:00 AM – 2:00 PM)">
                        Tomorrow · Morning Slot (11:00 AM – 2:00 PM)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('live-preview')}
                    className="px-4 py-2.5 text-xs font-semibold text-[#4A433E] hover:text-[#181615]"
                  >
                    Back to Live Camera Feed
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#7A1C24] hover:bg-[#61151B] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    Confirm Live Video Call Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
