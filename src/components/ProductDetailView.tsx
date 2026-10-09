import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Video,
  ShoppingBag,
  Zap,
  Truck,
  MapPin,
  Check,
  ExternalLink,
  ShieldCheck,
  Play,
  Pause,
  PhoneCall,
} from 'lucide-react';
import {
  Product,
  PRODUCTS,
  BRAND_INFO,
  evaluatePincodeDelivery,
  MarketplacePartnerInfo,
} from '../data/catalog';
import { ResilientImage } from './ResilientImage';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
  pincode: string;
  onPincodeChange: (pin: string) => void;
  onBack: () => void;
  onBuyDirectNow: (product: Product, size: string) => void;
  onAddToBag: (product: Product, size: string) => void;
  onOpenVideoCall: (product: Product) => void;
  onOpenPartnerModal: (product: Product, partner: MarketplacePartnerInfo) => void;
  onSelectRelatedProduct: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  pincode,
  onPincodeChange,
  onBack,
  onBuyDirectNow,
  onAddToBag,
  onOpenVideoCall,
  onOpenPartnerModal,
  onSelectRelatedProduct,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [activeAngleIdx, setActiveAngleIdx] = useState<number>(0);
  const [isAutoReelPlaying, setIsAutoReelPlaying] = useState<boolean>(false);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  useEffect(() => {
    setSelectedSize(product.sizes.includes('M') ? 'M' : product.sizes[0]);
    setActiveAngleIdx(0);
    setIsAutoReelPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  useEffect(() => {
    if (!isAutoReelPlaying) return;
    const timer = setInterval(() => {
      setActiveAngleIdx((prev) => (prev + 1) % product.galleryAngles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isAutoReelPlaying, product]);

  const currentAngle = product.galleryAngles[activeAngleIdx] || product.galleryAngles[0];
  const deliveryInfo = evaluatePincodeDelivery(pincode);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddWithFeedback = () => {
    onAddToBag(product, selectedSize);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E5DEC9] pb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#181615] hover:text-[#7A1C24] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {product.categoryName} & All Products</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#6E655F]">
          <span>Modnera Fashion</span>
          <span aria-hidden="true">/</span>
          <span>{product.categoryName}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#181615] font-mono-num">{product.sku}</span>
        </div>
      </div>

      {/* Main Two-Column Contiguous PDP Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Sticky Multi-Angle Gallery & Video Call Showcase */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#F2ECE1] border border-[#E5DEC9]">
            <ResilientImage
              src={currentAngle.image}
              alt={`${product.name} - ${currentAngle.label}`}
              style={{ objectPosition: currentAngle.objectPosition }}
              className={`w-full h-full object-cover transition-all duration-500 ${currentAngle.transformClass} ${currentAngle.filterClass}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            {/* Top Overlay Controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-white bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-md">
                {currentAngle.label}
              </span>

              <button
                type="button"
                onClick={() => setIsAutoReelPlaying((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black/65 hover:bg-black/85 backdrop-blur-xs px-3 py-1.5 rounded-md transition-colors"
              >
                {isAutoReelPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Pause Lookbook Reel</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Auto-Play Lookbook Reel</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Caption & Live Video Call Trigger */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
              <div className="text-white">
                <div className="text-[11px] text-white/75 uppercase tracking-wider">
                  Atelier Perspective 0{activeAngleIdx + 1}
                </div>
                <p className="text-xs font-medium mt-0.5">{currentAngle.caption}</p>
              </div>

              <button
                type="button"
                onClick={() => onOpenVideoCall(product)}
                className="px-3.5 py-2 bg-[#7A1C24] hover:bg-[#61151B] text-white text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <Video className="w-4 h-4" />
                <span>Live Video Call</span>
              </button>
            </div>
          </div>

          {/* 3-Angle Thumbnail Selector */}
          <div className="grid grid-cols-3 gap-3">
            {product.galleryAngles.map((angle, idx) => (
              <button
                key={angle.label}
                type="button"
                onClick={() => {
                  setActiveAngleIdx(idx);
                  setIsAutoReelPlaying(false);
                }}
                className={`group relative rounded-xl overflow-hidden border text-left transition-all ${
                  activeAngleIdx === idx
                    ? 'border-[#7A1C24] ring-2 ring-[#7A1C24]/25'
                    : 'border-[#E5DEC9] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="aspect-[4/3] w-full bg-[#F2ECE1] overflow-hidden">
                  <ResilientImage
                    src={angle.image}
                    alt={angle.label}
                    style={{ objectPosition: angle.objectPosition }}
                    className={`w-full h-full object-cover ${angle.transformClass}`}
                  />
                </div>
                <div className="p-2 bg-white">
                  <div className="text-[11px] font-semibold text-[#181615] truncate">
                    0{idx + 1}. {angle.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (4 Buy Modes + Pincode Engine + Video Call) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Price */}
          <div className="space-y-2 border-b border-[#E5DEC9] pb-5">
            <div className="flex items-center gap-2 text-xs text-[#6E655F]">
              <span className="font-semibold text-[#7A1C24] uppercase tracking-wider">
                {product.categoryName}
              </span>
              <span aria-hidden="true">·</span>
              <span>{product.atelierOrigin}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">{product.sku}</span>
            </div>

            <h1
              className="font-display text-3xl sm:text-4xl font-bold text-[#181615] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono-num text-[#181615]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-base font-mono-num text-[#8A8077] line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-semibold text-emerald-800">
                Save ₹{(product.mrp - product.price).toLocaleString('en-IN')} on Direct Website
              </span>
            </div>
            <p className="text-xs text-[#6E655F]">
              Inclusive of all taxes · {product.availability}
            </p>
          </div>

          {/* Size Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#181615]">
                Select Size: <span className="text-[#7A1C24]">{selectedSize}</span>
              </span>
              <span className="text-[#6E655F]">Color: {product.colorName}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                    selectedSize === size
                      ? 'bg-[#181615] text-white border-[#181615]'
                      : 'bg-white text-[#181615] border-[#DCD3C2] hover:border-[#181615]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Smart Location Pincode Delivery Engine (847212 & 847211 = 20-Min Delivery; Others = Express) */}
          <div className="p-5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label
                htmlFor="pdp-pincode-input"
                className="text-xs font-bold uppercase tracking-wider text-[#181615] flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-[#7A1C24]" />
                Direct Website Delivery Speed Checker
              </label>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#6E655F]">Quick Test:</span>
                <button
                  type="button"
                  onClick={() => onPincodeChange('847212')}
                  className={`px-2 py-0.5 text-[11px] font-mono-num rounded border transition-colors ${
                    pincode === '847212'
                      ? 'bg-[#7A1C24] text-white border-[#7A1C24]'
                      : 'bg-white text-[#181615] border-[#DCD3C2]'
                  }`}
                >
                  847212 (20-Min)
                </button>
                <button
                  type="button"
                  onClick={() => onPincodeChange('847211')}
                  className={`px-2 py-0.5 text-[11px] font-mono-num rounded border transition-colors ${
                    pincode === '847211'
                      ? 'bg-[#7A1C24] text-white border-[#7A1C24]'
                      : 'bg-white text-[#181615] border-[#DCD3C2]'
                  }`}
                >
                  847211 (20-Min)
                </button>
                <button
                  type="button"
                  onClick={() => onPincodeChange('400051')}
                  className={`px-2 py-0.5 text-[11px] font-mono-num rounded border transition-colors ${
                    pincode === '400051'
                      ? 'bg-[#181615] text-white border-[#181615]'
                      : 'bg-white text-[#181615] border-[#DCD3C2]'
                  }`}
                >
                  400051 (Express)
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                id="pdp-pincode-input"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={pincode}
                onChange={(e) => onPincodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit Pincode (Try 847212, 847211, or your Pincode)"
                className="flex-1 px-3.5 py-2.5 text-sm font-mono-num bg-white border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
              />
            </div>

            <div
              className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                deliveryInfo.isHyperlocal20Min
                  ? 'bg-[#7A1C24]/10 border-[#7A1C24]/35 text-[#181615]'
                  : 'bg-white border-[#DCD3C2] text-[#181615]'
              }`}
            >
              <div className="font-bold text-sm flex items-center gap-1.5 text-[#7A1C24]">
                {deliveryInfo.isHyperlocal20Min ? (
                  <Zap className="w-4 h-4 shrink-0" />
                ) : (
                  <Truck className="w-4 h-4 shrink-0" />
                )}
                <span>{deliveryInfo.headline}</span>
              </div>
              <p className="text-[#3A332E] leading-relaxed">{deliveryInfo.subline}</p>
              <div className="text-[11px] text-[#6E655F] pt-0.5">
                Dispatch Location: <span className="font-semibold text-[#181615]">{deliveryInfo.dispatchHub}</span>
              </div>
            </div>
          </div>

          {/* 4 MODES TO BUY SECTION */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5DEC9] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#181615]">
                Choose Your Mode to Buy (4 Official Options)
              </h2>
              <span className="text-xs text-[#6E655F]">100% Authentic Modnera</span>
            </div>

            {/* Mode 1: Direct From This Website */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#7A1C24]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A1C24]">
                    Option 01 · Recommended Direct Storefront
                  </span>
                  <h3 className="text-sm font-bold text-[#181615]">
                    Buy Directly from Modnera Website
                  </h3>
                </div>
                <span className="text-base font-bold font-mono-num text-[#7A1C24]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-xs text-[#4A433E]">
                {deliveryInfo.isHyperlocal20Min
                  ? `⚡ Instant 20-Minute Delivery to Pincode ${pincode} from our Bhauwara Madhubani Boutique.`
                  : '🚚 Priority Express Insured Delivery across India + Lowest Direct Factory Price.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onBuyDirectNow(product, selectedSize)}
                  className="py-3 px-4 bg-[#7A1C24] hover:bg-[#61151B] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {deliveryInfo.isHyperlocal20Min
                      ? 'Buy Here (20-Min Delivery)'
                      : 'Buy Here (Direct Express)'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleAddWithFeedback}
                  className="py-3 px-4 bg-[#181615] hover:bg-[#2E2A27] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · Size {selectedSize}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Modes 2, 3, 4: Buy via Flipkart, Amazon, Meesho */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#5C534C]">
                Or Buy via Our Official Marketplace Channel Partners:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Mode 2: Buy via Flipkart */}
                <button
                  type="button"
                  onClick={() => onOpenPartnerModal(product, product.partners.flipkart)}
                  className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#DCD3C2] hover:border-[#181615] transition-all text-left flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-[#181615] group-hover:text-[#7A1C24]">
                      Buy via Flipkart
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6E655F]" />
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-bold font-mono-num text-[#181615]">
                      ₹{product.partners.flipkart.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-[#6E655F] truncate">
                      Flipkart Assured · 3–5d
                    </div>
                  </div>
                </button>

                {/* Mode 3: Buy via Amazon */}
                <button
                  type="button"
                  onClick={() => onOpenPartnerModal(product, product.partners.amazon)}
                  className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#DCD3C2] hover:border-[#181615] transition-all text-left flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-[#181615] group-hover:text-[#7A1C24]">
                      Buy via Amazon
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6E655F]" />
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-bold font-mono-num text-[#181615]">
                      ₹{product.partners.amazon.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-[#6E655F] truncate">
                      Amazon Prime · 2–4d
                    </div>
                  </div>
                </button>

                {/* Mode 4: Buy via Meesho */}
                <button
                  type="button"
                  onClick={() => onOpenPartnerModal(product, product.partners.meesho)}
                  className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#DCD3C2] hover:border-[#181615] transition-all text-left flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-[#181615] group-hover:text-[#7A1C24]">
                      Buy via Meesho
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6E655F]" />
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-bold font-mono-num text-[#181615]">
                      ₹{product.partners.meesho.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-[#6E655F] truncate">
                      Meesho Mall · 4–6d
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* LIVE VIDEO CALL INSPECTION CARD ON PRODUCT PAGE */}
          <div className="p-5 rounded-2xl bg-[#181615] text-[#FAF8F5] space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Live Video Shopping Concierge
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Want to See This Dress Live on Video Call Before You Buy?
                </h3>
                <p className="text-xs text-[#B8B0A8] leading-relaxed">
                  Connect with our stylists at our Bhauwara Madhubani Boutique (847212) or Bandra Mumbai Factory (400051). Inspect the real embroidery, fabric weight, and color on live video call—and buy only when delighted.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenVideoCall(product)}
                className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#c5a02e] text-[#181615] text-xs font-bold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Video className="w-4 h-4" />
                <span>Open Live Video Call Inspection</span>
              </button>

              <a
                href={`tel:${BRAND_INFO.contact.phoneRaw}`}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Direct Call: {BRAND_INFO.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Craftsmanship & Fabric Specifications */}
          <div className="space-y-4 pt-2 border-t border-[#E5DEC9]">
            <h3 className="font-display text-xl font-bold text-[#181615]">
              Artisanal Craftsmanship & Specifications
            </h3>
            <p className="text-sm text-[#3A332E] leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-[#E5DEC9]">
                <div className="text-[#6E655F]">Fabric Weave</div>
                <div className="font-semibold text-[#181615] mt-0.5">{product.fabric}</div>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#E5DEC9]">
                <div className="text-[#6E655F]">Surface Needlework</div>
                <div className="font-semibold text-[#181615] mt-0.5">{product.embroideryType}</div>
              </div>
            </div>

            <ul className="space-y-2 pt-1">
              {product.craftDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#3A332E]">
                  <ShieldCheck className="w-4 h-4 text-[#7A1C24] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products in this Category */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E5DEC9] space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-[#7A1C24] font-semibold uppercase tracking-wider">
                More from {product.categoryName}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#181615] mt-1">
                Complementary Silhouettes
              </h2>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-semibold text-[#181615] hover:text-[#7A1C24] underline underline-offset-4"
            >
              View Full {product.categoryName} Segment
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelectProduct={onSelectRelatedProduct}
                onOpenVideoCall={(prod, e) => {
                  e.stopPropagation();
                  onOpenVideoCall(prod);
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
