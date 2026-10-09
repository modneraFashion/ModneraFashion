import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  Zap,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import {
  Product,
  BRAND_INFO,
  evaluatePincodeDelivery,
  MarketplacePartnerInfo,
} from '../data/catalog';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  pincode: string;
  onPincodeChange: (pin: string) => void;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  pincode,
  onPincodeChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [paymentMode, setPaymentMode] = useState<'cod' | 'upi'>('cod');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const mrpTotal = items.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const totalSavings = mrpTotal - subtotal;
  const deliveryInfo = evaluatePincodeDelivery(pincode);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryInfo.isValid) return;
    const randomId = `MOD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(randomId);
    setStep('confirmed');
  };

  const handleResetAndClose = () => {
    if (step === 'confirmed') {
      onClearCart();
      setStep('cart');
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag and Direct Checkout"
    >
      <div className="w-full max-w-lg bg-[#FAF8F5] h-full flex flex-col justify-between shadow-2xl border-l border-[#E5DEC9] overflow-hidden">
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-[#181615] text-[#FAF8F5] flex items-center justify-between border-b border-[#2E2A27]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 className="font-display text-xl font-semibold">
                {step === 'cart' && 'Modnera Direct Shopping Bag'}
                {step === 'checkout' && 'Direct Website Checkout'}
                {step === 'confirmed' && 'Order Confirmed'}
              </h2>
              <p className="text-xs text-[#B8B0A8]">
                20-Min Delivery in 847212 & 847211 · Express Delivery Pan-India
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-lg text-[#B8B0A8] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Pincode Delivery Speed Bar (Always visible in Cart & Checkout) */}
          {step !== 'confirmed' && (
            <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="drawer-pincode-input"
                  className="text-xs font-semibold text-[#181615] flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#7A1C24]" />
                  Check Delivery Speed by Pincode
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onPincodeChange('847212')}
                    className={`px-2 py-0.5 text-[11px] font-mono-num rounded border transition-colors ${
                      pincode === '847212'
                        ? 'bg-[#7A1C24] text-white border-[#7A1C24]'
                        : 'bg-white text-[#4A433E] border-[#DCD3C2] hover:border-[#181615]'
                    }`}
                  >
                    847212
                  </button>
                  <button
                    type="button"
                    onClick={() => onPincodeChange('847211')}
                    className={`px-2 py-0.5 text-[11px] font-mono-num rounded border transition-colors ${
                      pincode === '847211'
                        ? 'bg-[#7A1C24] text-white border-[#7A1C24]'
                        : 'bg-white text-[#4A433E] border-[#DCD3C2] hover:border-[#181615]'
                    }`}
                  >
                    847211
                  </button>
                  <button
                    type="button"
                    onClick={() => onPincodeChange('400051')}
                    className={`px-2 py-0.5 text-[11px] font-mono-num rounded border transition-colors ${
                      pincode === '400051'
                        ? 'bg-[#181615] text-white border-[#181615]'
                        : 'bg-white text-[#4A433E] border-[#DCD3C2] hover:border-[#181615]'
                    }`}
                  >
                    400051
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  id="drawer-pincode-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => onPincodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit Pincode (e.g. 847212)"
                  className="flex-1 px-3.5 py-2 text-sm font-mono-num bg-white border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                />
              </div>

              {deliveryInfo.isValid ? (
                <div
                  className={`p-3 rounded-lg border text-xs space-y-1 ${
                    deliveryInfo.isHyperlocal20Min
                      ? 'bg-[#7A1C24]/8 border-[#7A1C24]/30 text-[#181615]'
                      : 'bg-white border-[#DCD3C2] text-[#181615]'
                  }`}
                >
                  <div className="font-semibold flex items-center gap-1.5 text-[#7A1C24]">
                    {deliveryInfo.isHyperlocal20Min ? (
                      <Zap className="w-4 h-4 shrink-0" />
                    ) : (
                      <Truck className="w-4 h-4 shrink-0" />
                    )}
                    <span>{deliveryInfo.headline}</span>
                  </div>
                  <p className="text-[#4A433E] leading-relaxed">{deliveryInfo.subline}</p>
                  <div className="text-[11px] text-[#6E655F] pt-1">
                    Origin Hub: <span className="font-medium text-[#181615]">{deliveryInfo.dispatchHub}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#5C534C]">{deliveryInfo.subline}</p>
              )}
            </div>
          )}

          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <ShoppingBag className="w-10 h-10 text-[#8A8077] mx-auto stroke-1" />
                  <h3 className="font-display text-2xl font-semibold text-[#181615]">
                    Your Modnera Bag is Empty
                  </h3>
                  <p className="text-xs text-[#6E655F] max-w-xs mx-auto leading-relaxed">
                    Explore our Ethnic Wear, Dupatta Sets, Hand Work Embroidery Dresses, Kurti/Pant sets, Bottom Wear, and Frocks.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-4 p-3.5 bg-white rounded-xl border border-[#E5DEC9]"
                    >
                      <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-[#F2ECE1]">
                        <ResilientImage
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-display text-base font-bold text-[#181615] leading-snug truncate">
                              {item.product.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id, item.size)}
                              className="text-[#8A8077] hover:text-[#7A1C24] p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-xs text-[#6E655F] mt-0.5">
                            Size: <span className="font-semibold text-[#181615]">{item.size}</span> ·{' '}
                            {item.product.categoryName}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#DCD3C2] rounded-md">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                              className="p-1.5 text-[#4A433E] hover:text-[#181615]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono-num font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                              className="p-1.5 text-[#4A433E] hover:text-[#181615]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-bold font-mono-num text-[#181615]">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </div>
                            <div className="text-[11px] font-mono-num text-[#8A8077] line-through">
                              ₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="direct-checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#181615] mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181615] mb-1">
                  Mobile / WhatsApp Number (for rider updates) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 text-sm font-mono-num bg-white border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181615] mb-1">
                  Complete Delivery Address (House No, Landmark, Area) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder={
                    deliveryInfo.isHyperlocal20Min
                      ? 'e.g. Near Stadium Road / Bhauwara / Madhubani Town...'
                      : 'Enter street address, landmark, city, and state...'
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#181615] mb-2">
                  Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('cod')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      paymentMode === 'cod'
                        ? 'bg-[#181615] text-white border-[#181615]'
                        : 'bg-white text-[#181615] border-[#DCD3C2]'
                    }`}
                  >
                    <div className="text-xs font-semibold">Cash / UPI on Delivery</div>
                    <div className="text-[11px] opacity-75 mt-0.5">
                      Inspect parcel at doorstep
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('upi')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      paymentMode === 'upi'
                        ? 'bg-[#181615] text-white border-[#181615]'
                        : 'bg-white text-[#181615] border-[#DCD3C2]'
                    }`}
                  >
                    <div className="text-xs font-semibold">Instant UPI / Card</div>
                    <div className="text-[11px] opacity-75 mt-0.5">
                      Zero gateway fee
                    </div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-900/10 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono-num text-[#7A1C24] font-semibold">
                ORDER ID #{orderId}
              </div>
              <h3 className="font-display text-3xl font-bold text-[#181615]">
                Thank You, {fullName}!
              </h3>
              <p className="text-xs text-[#4A433E] leading-relaxed">
                Your direct order with <span className="font-semibold text-[#181615]">Modnera Fashion</span> has been registered.
              </p>

              <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6E655F]">Delivery Pincode:</span>
                  <span className="font-mono-num font-bold text-[#181615]">{pincode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E655F]">Delivery Speed Tier:</span>
                  <span className="font-semibold text-[#7A1C24]">
                    {deliveryInfo.isHyperlocal20Min
                      ? '⚡ 20-Minute Madhubani Boutique Rider'
                      : '🚚 Express Insured Pan-India Delivery'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E655F]">Dispatch Facility:</span>
                  <span className="font-medium text-[#181615] text-right">
                    {deliveryInfo.dispatchHub}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#DCD3C2]">
                  <span className="font-semibold text-[#181615]">Total Payable:</span>
                  <span className="font-mono-num font-bold text-sm text-[#181615]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#6E655F]">
                Need assistance? Call or WhatsApp our desk at{' '}
                <span className="font-mono-num font-semibold text-[#181615]">
                  {BRAND_INFO.contact.phoneDisplay}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="p-6 bg-white border-t border-[#E5DEC9] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#6E655F]">
                <span>Direct Website Savings</span>
                <span className="font-mono-num text-emerald-800 font-medium">
                  -₹{totalSavings.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#6E655F]">
                <span>Shipping ({pincode || 'Select Pincode'})</span>
                <span className="font-medium text-[#181615]">
                  {deliveryInfo.isHyperlocal20Min ? 'FREE (20-Min Local)' : 'FREE (Express)'}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#181615] pt-1.5 border-t border-[#EFEAE2]">
                <span>Total Amount</span>
                <span className="font-mono-num">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => {
                  if (!deliveryInfo.isValid) {
                    onPincodeChange('847212');
                  }
                  setStep('checkout');
                }}
                className="w-full py-3 px-4 bg-[#7A1C24] hover:bg-[#61151B] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                Proceed to Direct Website Checkout
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 bg-[#F2ECE1] text-[#181615] text-xs font-semibold rounded-lg hover:bg-[#E5DEC9] transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="direct-checkout-form"
                  disabled={!deliveryInfo.isValid}
                  className="flex-1 py-3 px-4 bg-[#7A1C24] hover:bg-[#61151B] disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                >
                  {deliveryInfo.isHyperlocal20Min
                    ? `Confirm 20-Minute Delivery Order (₹${subtotal.toLocaleString('en-IN')})`
                    : `Confirm Express Delivery Order (₹${subtotal.toLocaleString('en-IN')})`}
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'confirmed' && (
          <div className="p-6 bg-white border-t border-[#E5DEC9]">
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3 px-4 bg-[#181615] text-white text-xs font-semibold rounded-lg hover:bg-[#2E2A27] transition-colors"
            >
              Continue Exploring Modnera Fashion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface PartnerModalProps {
  product: Product | null;
  partner: MarketplacePartnerInfo | null;
  onClose: () => void;
  onSwitchToDirect: () => void;
}

export const PartnerChannelModal: React.FC<PartnerModalProps> = ({
  product,
  partner,
  onClose,
  onSwitchToDirect,
}) => {
  if (!product || !partner) return null;

  const priceDifference = partner.price - product.price;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Buy via ${partner.platform}`}
    >
      <div className="w-full max-w-md bg-[#FAF8F5] border border-[#E5DEC9] rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-[#181615] text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#D4AF37] uppercase tracking-wider font-semibold">
              Authorized Channel Partner
            </div>
            <h3 className="font-display text-xl font-bold">
              Buy via {partner.platform}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-3.5 items-center p-3 bg-white rounded-xl border border-[#E5DEC9]">
            <div className="w-14 h-18 rounded-lg overflow-hidden shrink-0 bg-[#F2ECE1]">
              <ResilientImage
                src={product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-[#6E655F] font-mono-num">
                Partner Listing ID: {partner.productCode}
              </div>
              <h4 className="font-display text-base font-bold text-[#181615] truncate">
                {product.name}
              </h4>
              <div className="text-xs text-[#7A1C24] font-medium mt-0.5">
                {partner.badgeText}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#5C534C]">Official Seller Account:</span>
              <span className="font-semibold text-[#181615]">{partner.sellerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C534C]">{partner.platform} Listing Price:</span>
              <span className="font-mono-num font-bold text-[#181615]">
                ₹{partner.price.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C534C]">Standard Partner Delivery:</span>
              <span className="font-medium text-[#181615]">{partner.deliveryEstimate}</span>
            </div>
          </div>

          {/* Direct Website Privilege Callout */}
          <div className="p-3.5 rounded-xl bg-white border border-[#DCD3C2] text-xs space-y-1.5">
            <div className="font-semibold text-[#181615] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#7A1C24]" />
              Why Buy Direct on Modnera.com Instead?
            </div>
            <p className="text-[#4A433E] leading-relaxed">
              Save <span className="font-mono-num font-bold text-[#7A1C24]">₹{priceDifference}</span> instantly (Direct Price:{' '}
              <span className="font-mono-num font-semibold">₹{product.price.toLocaleString('en-IN')}</span>) + get{' '}
              <span className="font-semibold text-[#181615]">20-Minute Delivery in 847212 & 847211</span> or Priority Express Delivery everywhere else.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={onSwitchToDirect}
              className="w-full py-3 px-4 bg-[#7A1C24] hover:bg-[#61151B] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              Buy Here on Modnera Direct (Save ₹{priceDifference} + Faster Delivery)
            </button>

            <a
              href={partner.searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#F2ECE1] text-[#181615] border border-[#DCD3C2] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue to {partner.platform} Official Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
