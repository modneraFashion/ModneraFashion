import React, { useState } from 'react';
import {
  MapPin,
  PhoneCall,
  Mail,
  Building2,
  Store,
  Award,
  Clock,
  CheckCircle2,
  Send,
  ExternalLink,
  Truck,
  Video,
} from 'lucide-react';
import { BRAND_INFO, CATEGORIES, CategoryId } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface AboutViewProps {
  onExploreCategory: (cat: CategoryId) => void;
  onNavigateContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onExploreCategory,
  onNavigateContact,
}) => {
  const [activeMapHub, setActiveMapHub] = useState<'madhubani' | 'mumbai'>('madhubani');

  const mapEmbedUrl =
    activeMapHub === 'madhubani'
      ? 'https://maps.google.com/maps?q=Shanghat+Muhallah+Bhauwara+Madhubani+Stadium+Road+847212&t=&z=15&ie=UTF8&iwloc=&output=embed'
      : 'https://maps.google.com/maps?q=Bandra+Mumbai+400051&t=&z=14&ie=UTF8&iwloc=&output=embed';

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Story Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-7 bg-white border border-[#E5DEC9] rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#7A1C24]">
              Founded in {BRAND_INFO.foundedYear} · By {BRAND_INFO.founder}
            </div>
            <h1
              className="font-display text-3xl sm:text-5xl font-bold text-[#181615] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              The House of Modnera Fashion: From Mumbai Looms to Madhubani Grace
            </h1>
            <p className="text-sm sm:text-base text-[#3A332E] leading-relaxed">
              Founded in <span className="font-semibold text-[#181615]">2016</span> by visionary designer and entrepreneur{' '}
              <span className="font-semibold text-[#7A1C24]">The Armaan</span>, Modnera Fashion was born with a singular conviction: women across India deserve direct access to authentic, couture-grade ethnic wear, hand-worked embroidery dresses, and tailored contemporary silhouettes without middleman markups.
            </p>
            <p className="text-sm sm:text-base text-[#3A332E] leading-relaxed">
              By uniting our <span className="font-semibold text-[#181615]">Manufacturing Factory in Bandra, Mumbai (400051)</span>—where master karigars execute intricate zardozi, dabka, and pattern cutting—with our <span className="font-semibold text-[#181615]">Physical Flagship Store at Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road (847212)</span>, Modnera bridges metropolitan design excellence with heartfelt personal hospitality.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E5DEC9] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-[#6E655F]">Founded</div>
              <div className="font-display text-2xl font-bold font-mono-num text-[#181615] mt-0.5">
                2016
              </div>
              <div className="text-[11px] text-[#7A1C24] font-medium">By The Armaan</div>
            </div>
            <div>
              <div className="text-xs text-[#6E655F]">Factory Looms</div>
              <div className="font-display text-2xl font-bold font-mono-num text-[#181615] mt-0.5">
                400051
              </div>
              <div className="text-[11px] text-[#5C534C]">Bandra, Mumbai</div>
            </div>
            <div>
              <div className="text-xs text-[#6E655F]">Flagship Shop</div>
              <div className="font-display text-2xl font-bold font-mono-num text-[#181615] mt-0.5">
                847212
              </div>
              <div className="text-[11px] text-[#5C534C]">Bhauwara, Madhubani</div>
            </div>
            <div>
              <div className="text-xs text-[#6E655F]">Local Express</div>
              <div className="font-display text-2xl font-bold font-mono-num text-[#7A1C24] mt-0.5">
                20 Min
              </div>
              <div className="text-[11px] text-[#5C534C]">In 847212 & 847211</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#E5DEC9] min-h-[380px]">
          <ResilientImage
            src={CATEGORIES[2].heroImage}
            alt="Modnera Fashion Artisanal Handwork Embroidery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="text-xs font-semibold text-[#E6C770] uppercase tracking-wider">
              Founder’s Pledge · The Armaan (Est. 2016)
            </div>
            <blockquote className="font-display text-xl sm:text-2xl italic leading-snug">
              “Every stitch crafted in our Bandra 400051 factory and showcased at our Bhauwara Madhubani 847212 boutique carries our promise of pure fabric and timeless elegance.”
            </blockquote>
            <div className="text-xs text-white/80 pt-1">
              — The Armaan, Founder of Modnera Fashion
            </div>
          </div>
        </div>
      </section>

      {/* Two Architectural Pillars: Manufacturing Factory & Physical Shop */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#7A1C24]">
            02. Dual Infrastructure
          </div>
          <h2 className="font-display text-3xl font-bold text-[#181615]">
            Our Manufacturing Factory & Physical Flagship Store
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Physical Shop Card */}
          <div className="bg-white border border-[#E5DEC9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C24] flex items-center gap-1.5">
                  <Store className="w-4 h-4" />
                  Physical Flagship Shop (847212)
                </span>
                <span className="text-xs font-mono-num text-[#6E655F]">Pin: 847212</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#181615]">
                Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road — 847212
              </h3>

              <p className="text-sm text-[#4A433E] leading-relaxed">
                Our flagship walk-in boutique in Madhubani welcomes customers to touch and try our complete range of Ethnic Wear, Dupatta Sets, Hand Work Embroidery Dresses, Kurti/Pant sets, Bottom Wear, and Frocks. It also houses our Live Video Call Shopping Studio and dispatches 20-Minute Hyperlocal orders for Pincodes <span className="font-mono-num font-semibold text-[#181615]">847212</span> and <span className="font-mono-num font-semibold text-[#181615]">847211</span>.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EFEAE2] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#5C534C] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#7A1C24]" />
                Open Daily: 10:00 AM – 9:30 PM
              </span>
              <button
                type="button"
                onClick={() => setActiveMapHub('madhubani')}
                className="font-semibold text-[#7A1C24] hover:underline"
              >
                Focus on Google Map Below →
              </button>
            </div>
          </div>

          {/* Manufacturing Factory Card */}
          <div className="bg-white border border-[#E5DEC9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#181615] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#7A1C24]" />
                  Manufacturing Factory (400051)
                </span>
                <span className="text-xs font-mono-num text-[#6E655F]">Pin: 400051</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#181615]">
                Mumbai, Bandra — 400051
              </h3>

              <p className="text-sm text-[#4A433E] leading-relaxed">
                Located in the heart of Mumbai’s garment and couture district at Bandra (400051), our in-house manufacturing factory oversees raw silk sourcing, wooden adda hand-embroidery, precision tailoring, 3-stage quality inspection, and pan-India Express dispatch.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EFEAE2] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#5C534C] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#7A1C24]" />
                Direct Factory-to-Wardrobe Quality
              </span>
              <button
                type="button"
                onClick={() => setActiveMapHub('mumbai')}
                className="font-semibold text-[#7A1C24] hover:underline"
              >
                View Mumbai Factory on Map →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Channel Partners Section */}
      <section className="p-8 rounded-2xl bg-[#181615] text-[#FAF8F5] space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              03. Authorized Omnichannel Presence
            </div>
            <h2 className="font-display text-3xl font-bold text-white mt-1">
              Official Channel Partners: Flipkart, Amazon & Meesho + Direct Store
            </h2>
          </div>
          <p className="text-xs text-[#B8B0A8] max-w-md">
            Every Modnera Fashion product page gives you 4 transparent ways to shop—via Flipkart, Amazon, Meesho, or directly here on Modnera.com.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xs font-mono-num text-[#D4AF37]">01 · DIRECT WEBSITE</div>
            <h3 className="font-display text-xl font-bold text-white">Modnera.com Direct</h3>
            <p className="text-xs text-[#B8B0A8] leading-relaxed">
              Lowest factory-direct prices, Live Video Call inspection, 20-Min delivery in 847212 & 847211, and Express pan-India shipping.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xs font-mono-num text-[#D4AF37]">02 · CHANNEL PARTNER</div>
            <h3 className="font-display text-xl font-bold text-white">Flipkart Official</h3>
            <p className="text-xs text-[#B8B0A8] leading-relaxed">
              Verified Flipkart Assured storefront offering Modnera Fashion’s complete catalog with national doorstep coverage.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xs font-mono-num text-[#D4AF37]">03 · CHANNEL PARTNER</div>
            <h3 className="font-display text-xl font-bold text-white">Amazon India</h3>
            <p className="text-xs text-[#B8B0A8] leading-relaxed">
              Prime-eligible Modnera Couture listings with verified buyer reviews and seamless marketplace checkout.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xs font-mono-num text-[#D4AF37]">04 · CHANNEL PARTNER</div>
            <h3 className="font-display text-xl font-bold text-white">Meesho Mall</h3>
            <p className="text-xs text-[#B8B0A8] leading-relaxed">
              Direct manufacturer presence on Meesho enabling accessible ethnic fashion across every tier-2 and tier-3 town.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Modnera Fashion Google Map */}
      <section className="bg-white border border-[#E5DEC9] rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-[#E5DEC9] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#7A1C24] flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Modnera Fashion Google Map
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#181615] mt-1">
              {activeMapHub === 'madhubani'
                ? 'Physical Shop: Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road — 847212'
                : 'Manufacturing Factory: Mumbai, Bandra — 400051'}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#F2ECE1] rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setActiveMapHub('madhubani')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeMapHub === 'madhubani'
                  ? 'bg-[#181615] text-white shadow-xs'
                  : 'text-[#4A433E] hover:text-[#181615]'
              }`}
            >
              Madhubani Shop (847212)
            </button>
            <button
              type="button"
              onClick={() => setActiveMapHub('mumbai')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeMapHub === 'mumbai'
                  ? 'bg-[#181615] text-white shadow-xs'
                  : 'text-[#4A433E] hover:text-[#181615]'
              }`}
            >
              Mumbai Factory (400051)
            </button>
          </div>
        </div>

        <div className="w-full h-[400px] bg-[#F2ECE1] relative">
          <iframe
            title="Modnera Fashion Google Map Location"
            src={mapEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="p-4 bg-[#FAF8F5] border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="text-[#4A433E]">
            <span className="font-semibold text-[#181615]">Search on Google Maps:</span> “modnera fashion google map” ·{' '}
            {activeMapHub === 'madhubani'
              ? 'Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road 847212'
              : 'Mumbai Bandra 400051'}
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${
                activeMapHub === 'madhubani'
                  ? 'Modnera+Fashion+Shanghat+Muhallah+Bhauwara+Madhubani+Stadium+Road+847212'
                  : 'Modnera+Fashion+Bandra+Mumbai+400051'
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#7A1C24] hover:underline flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onNavigateContact}
              className="font-semibold text-[#181615] hover:text-[#7A1C24] underline"
            >
              Contact Boutique Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('847212');
  const [topic, setTopic] = useState('Live Video Call Product Viewing');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Header */}
      <div className="border-b border-[#E5DEC9] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-[#7A1C24]">
            Direct Concierge · Founded by The Armaan (2016)
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#181615] mt-1">
            Contact Modnera Fashion
          </h1>
          <p className="text-sm text-[#5C534C] mt-2 max-w-2xl">
            Reach our physical boutique at Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road (847212) or our Manufacturing Factory in Bandra, Mumbai (400051).
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <a
            href={`tel:${BRAND_INFO.contact.phoneRaw}`}
            className="px-4 py-2.5 bg-[#7A1C24] hover:bg-[#61151B] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {BRAND_INFO.contact.phoneDisplay}</span>
          </a>
          <a
            href="mailto:info@modnera.com"
            className="px-4 py-2.5 bg-white hover:bg-[#F2ECE1] text-[#181615] border border-[#DCD3C2] text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Mail className="w-4 h-4 text-[#7A1C24]" />
            <span>info@modnera.com</span>
          </a>
        </div>
      </div>

      {/* Contact Details + Interactive Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: All Official Details */}
        <div className="lg:col-span-5 space-y-4">
          {/* Phone & WhatsApp Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5DEC9] space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7A1C24] flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4" />
              Direct Phone & Live Video Call Desk
            </div>
            <div className="font-mono-num text-2xl font-bold text-[#181615]">
              {BRAND_INFO.contact.phoneDisplay}
            </div>
            <p className="text-xs text-[#5C534C]">
              Call or WhatsApp on <span className="font-mono-num font-semibold">7715966368</span> for instant live video shopping, 20-minute Madhubani delivery tracking, or custom tailoring inquiries.
            </p>
          </div>

          {/* Official Emails Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5DEC9] space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7A1C24] flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              Official Email Desks
            </div>
            <div className="space-y-1 text-sm font-semibold text-[#181615]">
              <div>
                <a href="mailto:info@modnera.com" className="hover:text-[#7A1C24] transition-colors">
                  info@modnera.com
                </a>
              </div>
              <div>
                <a href="mailto:modneracare@gmail.com" className="hover:text-[#7A1C24] transition-colors">
                  modneracare@gmail.com
                </a>
              </div>
            </div>
            <p className="text-xs text-[#5C534C]">
              Customer care, partner inquiries (Flipkart, Amazon, Meesho), and wholesale dispatch support.
            </p>
          </div>

          {/* Physical Shop Address */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5DEC9] space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7A1C24] flex items-center gap-1.5">
              <Store className="w-4 h-4" />
              Physical Shop & 20-Min Hub (847212)
            </div>
            <h3 className="font-display text-xl font-bold text-[#181615]">
              Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road — 847212
            </h3>
            <p className="text-xs text-[#5C534C] leading-relaxed">
              Walk-in Flagship Boutique · Hyperlocal 20-Minute Delivery hub for Pincodes <span className="font-mono-num font-semibold text-[#181615]">847212</span> & <span className="font-mono-num font-semibold text-[#181615]">847211</span>.
            </p>
          </div>

          {/* Manufacturing Factory Address */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5DEC9] space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#181615] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#7A1C24]" />
              Manufacturing Factory (400051)
            </div>
            <h3 className="font-display text-xl font-bold text-[#181615]">
              Mumbai, Bandra — 400051
            </h3>
            <p className="text-xs text-[#5C534C] leading-relaxed">
              Modnera Fashion Production & Handwork Embroidery Atelier · Express Pan-India Dispatch.
            </p>
          </div>
        </div>

        {/* Right: Interactive Inquiry & Appointment Form */}
        <div className="lg:col-span-7 bg-white border border-[#E5DEC9] rounded-2xl p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-900/10 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl font-bold text-[#181615]">
                Message Received by Modnera Concierge
              </h2>
              <p className="text-sm text-[#4A433E] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#181615]">{name}</span>. Our team at Modnera Fashion has logged your request regarding <span className="font-semibold text-[#7A1C24]">{topic}</span> and will reach out to you on <span className="font-mono-num font-semibold">{phone}</span> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-5 py-2.5 bg-[#181615] text-white text-xs font-semibold rounded-lg hover:bg-[#2E2A27] transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#181615]">
                  Send a Direct Message or Book a Boutique Visit
                </h2>
                <p className="text-xs text-[#5C534C] mt-1">
                  Whether you want a Live Video Call session, 20-minute delivery in Madhubani (847212/847211), or custom bridal sizing from our Mumbai Bandra (400051) factory, write to us below.
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 7715966368"
                    className="w-full px-3.5 py-2.5 text-sm font-mono-num bg-[#FAF8F5] border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                    Your Area Pincode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="847212 / 847211 / 400051"
                    className="w-full px-3.5 py-2.5 text-sm font-mono-num bg-[#FAF8F5] border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                >
                  <option value="Live Video Call Product Viewing">
                    Live Video Call Product Viewing
                  </option>
                  <option value="20-Minute Local Delivery (847212 / 847211)">
                    20-Minute Local Delivery (Pincodes 847212 / 847211)
                  </option>
                  <option value="Visit Bhauwara Madhubani Boutique (847212)">
                    Visit Bhauwara Madhubani Physical Shop (847212)
                  </option>
                  <option value="Custom Bridal / Bulk Inquiry — Bandra Factory (400051)">
                    Custom Bridal / Bulk Inquiry — Mumbai Bandra Factory (400051)
                  </option>
                  <option value="Channel Partner Order Support (Flipkart / Amazon / Meesho)">
                    Channel Partner Order Support (Flipkart / Amazon / Meesho)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                  Message or Dress Preferences
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us which Ethnic Wear, Dupatta Set, Hand Work Dress, Kurti/Pant, Bottom Wear, or Frock you would like to see..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 bg-[#7A1C24] hover:bg-[#61151B] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Modnera Fashion</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Google Map for Modnera Fashion */}
      <div className="bg-white border border-[#E5DEC9] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 bg-[#F2ECE1] border-b border-[#E5DEC9] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#181615]">
            <MapPin className="w-4 h-4 text-[#7A1C24]" />
            <span>Modnera Fashion Google Map — Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road 847212</span>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Modnera+Fashion+Shanghat+Muhallah+Bhauwara+Madhubani+Stadium+Road+847212"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#7A1C24] hover:underline flex items-center gap-1"
          >
            <span>Open Full Screen Map</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="w-full h-[360px]">
          <iframe
            title="Modnera Fashion Madhubani Flagship Store Map"
            src="https://maps.google.com/maps?q=Shanghat+Muhallah+Bhauwara+Madhubani+Stadium+Road+847212&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};
