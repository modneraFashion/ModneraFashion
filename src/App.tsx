import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  Video,
  Search,
  MapPin,
  Zap,
  Truck,
  ArrowRight,
  Menu,
  X,
  PhoneCall,
  Mail,
  Store,
  Building2,
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  BRAND_INFO,
  CategoryId,
  Product,
  MarketplacePartnerInfo,
  evaluatePincodeDelivery,
} from './data/catalog';
import { ResilientImage } from './components/ResilientImage';
import { HomeCategoryColumns } from './components/HomeCategoryColumns';
import { ProductCard } from './components/ProductCard';
import { ProductDetailView } from './components/ProductDetailView';
import { VideoCallModal } from './components/VideoCallModal';
import {
  CartDrawer,
  CartItem,
  PartnerChannelModal,
} from './components/CartAndCheckoutModal';
import { AboutView, ContactView } from './components/AboutAndContactViews';

type NavPage = 'home' | 'products' | 'about' | 'contact';

export default function App() {
  const [activePage, setActivePage] = useState<NavPage>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Pincode State (Defaulting to 847212 so users can immediately see and test 20-min vs Express)
  const [pincode, setPincode] = useState('847212');

  // Shopping Bag State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      size: 'M',
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Live Video Call Studio Modal State
  const [videoCallProduct, setVideoCallProduct] = useState<Product | null>(null);

  // Channel Partner Modal State
  const [partnerModalState, setPartnerModalState] = useState<{
    product: Product | null;
    partner: MarketplacePartnerInfo | null;
  }>({ product: null, partner: null });

  // Hero Lookbook Auto-Slider
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  useEffect(() => {
    if (activePage !== 'home' || selectedProduct) return;
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % CATEGORIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activePage, selectedProduct]);

  const totalCartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const deliveryStatus = useMemo(() => evaluatePincodeDelivery(pincode), [pincode]);

  // Filtered & Sorted Products for ALL PRODUCTS page
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.embroideryType.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  // Featured Home Products (1 signature piece from each of the 6 categories)
  const homeFeaturedProducts = useMemo(() => {
    return CATEGORIES.map(
      (cat) => PRODUCTS.find((p) => p.category === cat.id) || PRODUCTS[0]
    );
  }, []);

  // Handlers
  const handleNavigate = (page: NavPage, categoryFilter?: CategoryId | 'all') => {
    setActivePage(page);
    setSelectedProduct(null);
    if (categoryFilter !== undefined) {
      setSelectedCategory(categoryFilter);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCategoryFromHome = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
    setSelectedProduct(null);
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToBag = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const handleBuyDirectNow = (product: Product, size: string) => {
    handleAddToBag(product, size);
    setVideoCallProduct(null);
    setPartnerModalState({ product: null, partner: null });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const activeHeroCategory = CATEGORIES[heroSlideIdx] || CATEGORIES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#181615]">
      {/* Strict 3-Zone Top Navigation Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DEC9]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('home', 'all');
            }}
            className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#181615] whitespace-nowrap shrink-0"
          >
            Modnera Fashion
          </a>

          {/* Zone 2: 4 Clean Single-Line Text Navigation Links (HOME, ALL PRODUCTS, ABOUT, CONTACT) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A433E]"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('home', 'all');
              }}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activePage === 'home' && !selectedProduct
                  ? 'text-[#7A1C24] border-[#7A1C24] font-semibold'
                  : 'border-transparent hover:text-[#181615] hover:border-[#181615]/30'
              }`}
            >
              Home
            </a>
            <a
              href="#all-products"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('products', 'all');
              }}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activePage === 'products' || selectedProduct
                  ? 'text-[#7A1C24] border-[#7A1C24] font-semibold'
                  : 'border-transparent hover:text-[#181615] hover:border-[#181615]/30'
              }`}
            >
              All Products
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('about');
              }}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activePage === 'about' && !selectedProduct
                  ? 'text-[#7A1C24] border-[#7A1C24] font-semibold'
                  : 'border-transparent hover:text-[#181615] hover:border-[#181615]/30'
              }`}
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('contact');
              }}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activePage === 'contact' && !selectedProduct
                  ? 'text-[#7A1C24] border-[#7A1C24] font-semibold'
                  : 'border-transparent hover:text-[#181615] hover:border-[#181615]/30'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#181615] hover:bg-[#7A1C24] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Shopping Bag ({totalCartCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-[#181615] hover:bg-[#F2ECE1]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-b border-[#E5DEC9] px-4 py-3 flex items-center justify-around text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleNavigate('home', 'all')}
              className={`py-2 px-3 rounded-md ${
                activePage === 'home' ? 'bg-[#7A1C24] text-white' : 'text-[#181615]'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('products', 'all')}
              className={`py-2 px-3 rounded-md ${
                activePage === 'products' ? 'bg-[#7A1C24] text-white' : 'text-[#181615]'
              }`}
            >
              All Products
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('about')}
              className={`py-2 px-3 rounded-md ${
                activePage === 'about' ? 'bg-[#7A1C24] text-white' : 'text-[#181615]'
              }`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('contact')}
              className={`py-2 px-3 rounded-md ${
                activePage === 'contact' ? 'bg-[#7A1C24] text-white' : 'text-[#181615]'
              }`}
            >
              Contact
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetailView
            product={selectedProduct}
            pincode={pincode}
            onPincodeChange={setPincode}
            onBack={() => setSelectedProduct(null)}
            onBuyDirectNow={handleBuyDirectNow}
            onAddToBag={handleAddToBag}
            onOpenVideoCall={(prod) => setVideoCallProduct(prod)}
            onOpenPartnerModal={(prod, partner) =>
              setPartnerModalState({ product: prod, partner })
            }
            onSelectRelatedProduct={(prod) => handleSelectProduct(prod)}
          />
        ) : activePage === 'home' ? (
          <div>
            {/* STOREFRONT HERO SECTION */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column: Campaign Focal Point & Pincode Speed Checker */}
                <div className="lg:col-span-7 bg-white border border-[#E5DEC9] rounded-2xl p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-xs text-[#6E655F] flex-wrap">
                      <span className="font-semibold text-[#7A1C24] uppercase tracking-widest">
                        Founded by The Armaan · Est. 2016
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Mumbai Bandra 400051 Looms</span>
                      <span aria-hidden="true">·</span>
                      <span>Madhubani 847212 Flagship</span>
                    </div>

                    <h1
                      className="font-display font-bold text-[#181615] tracking-tight leading-[1.08]"
                      style={{
                        fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                        textWrap: 'balance',
                      }}
                    >
                      Artisanal Indian Couture & Contemporary Silhouettes for the Modern Woman
                    </h1>

                    <p className="text-sm sm:text-base text-[#4A433E] leading-relaxed max-w-[65ch]">
                      Discover heirloom <span className="font-semibold text-[#181615]">Ethnic Wear</span>, handwoven{' '}
                      <span className="font-semibold text-[#181615]">Dupatta Sets</span>, master-karigar{' '}
                      <span className="font-semibold text-[#181615]">Hand Work Embroidery Dresses</span>, tailored{' '}
                      <span className="font-semibold text-[#181615]">Kurti / Pant</span> co-ords,{' '}
                      <span className="font-semibold text-[#181615]">Bottom Wear</span>, and flowing{' '}
                      <span className="font-semibold text-[#181615]">Frocks</span>. Inspect any garment on a Live Video Call and shop via Direct Website, Flipkart, Amazon, or Meesho.
                    </p>

                    {/* Primary & Secondary CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleNavigate('products', 'all')}
                        className="px-6 py-3.5 bg-[#7A1C24] hover:bg-[#61151B] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
                      >
                        <span>Explore All 18 Couture Pieces</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setVideoCallProduct(PRODUCTS[0])}
                        className="px-5 py-3.5 bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#181615] border border-[#DCD3C2] text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                      >
                        <Video className="w-4 h-4 text-[#7A1C24]" />
                        <span>Try Live Video Call Boutique</span>
                      </button>
                    </div>
                  </div>

                  {/* Interactive Pincode Speed Bar inside Hero */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-2.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="text-xs font-bold text-[#181615] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#7A1C24]" />
                        <span>Direct Website Pincode Delivery Engine:</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPincode('847212')}
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
                          onClick={() => setPincode('847211')}
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
                          onClick={() => setPincode('400051')}
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

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) =>
                          setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))
                        }
                        placeholder="Enter 6-digit Pincode"
                        aria-label="Enter 6-digit Pincode"
                        className="w-full sm:w-44 px-3 py-2 text-xs font-mono-num font-semibold bg-white border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                      />
                      <div className="flex-1 text-xs text-[#181615] flex items-center gap-1.5">
                        {deliveryStatus.isHyperlocal20Min ? (
                          <Zap className="w-4 h-4 text-[#7A1C24] shrink-0" />
                        ) : (
                          <Truck className="w-4 h-4 text-[#181615] shrink-0" />
                        )}
                        <span className="font-semibold">{deliveryStatus.headline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Auto-Playing Couture Lookbook Showcase */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#E5DEC9] bg-[#181615] min-h-[460px] flex flex-col justify-between">
                  {CATEGORIES.map((cat, idx) => (
                    <div
                      key={cat.id}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        idx === heroSlideIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <ResilientImage
                        src={cat.heroImage}
                        alt={cat.name}
                        className="w-full h-full object-cover animate-slow-pan"
                      />
                    </div>
                  ))}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45 pointer-events-none" />

                  <div className="relative z-10 p-6 flex items-center justify-between text-white text-xs">
                    <span className="font-mono-num uppercase tracking-wider text-[#E6C770]">
                      Lookbook 0{heroSlideIdx + 1} / 06 · {activeHeroCategory.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {CATEGORIES.map((cat, idx) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setHeroSlideIdx(idx)}
                          aria-label={`Show ${cat.name}`}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === heroSlideIdx ? 'w-6 bg-[#E6C770]' : 'w-1.5 bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 p-6 space-y-3 text-white">
                    <div className="text-xs text-[#E6C770] font-medium">
                      {activeHeroCategory.fabricSignature}
                    </div>
                    <h2 className="font-display text-3xl font-bold leading-tight">
                      {activeHeroCategory.name}: {activeHeroCategory.tagline}
                    </h2>
                    <p className="text-xs text-white/85 leading-relaxed line-clamp-2">
                      {activeHeroCategory.description}
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenCategoryFromHome(activeHeroCategory.id)}
                        className="px-4 py-2 bg-white text-[#181615] text-xs font-semibold rounded-lg hover:bg-[#F2ECE1] transition-colors whitespace-nowrap"
                      >
                        Shop {activeHeroCategory.shortName} Segment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-Width 4-Column Atelier & Omnichannel Proof Strip Below Hero */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#E5DEC9]">
                  <div className="text-xs font-mono-num text-[#7A1C24] font-semibold">
                    01 · MANUFACTURING ATELIER
                  </div>
                  <div className="font-display text-lg font-bold text-[#181615] mt-0.5">
                    Mumbai, Bandra — 400051
                  </div>
                  <p className="text-xs text-[#6E655F] mt-0.5">
                    In-house adda hand-embroidery & master tailoring factory.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E5DEC9]">
                  <div className="text-xs font-mono-num text-[#7A1C24] font-semibold">
                    02 · PHYSICAL FLAGSHIP SHOP
                  </div>
                  <div className="font-display text-lg font-bold text-[#181615] mt-0.5">
                    Bhauwara, Madhubani — 847212
                  </div>
                  <p className="text-xs text-[#6E655F] mt-0.5">
                    Shanghat Muhallah, Stadium Road walk-in boutique.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E5DEC9]">
                  <div className="text-xs font-mono-num text-[#7A1C24] font-semibold">
                    03 · 20-MIN & EXPRESS DELIVERY
                  </div>
                  <div className="font-display text-lg font-bold text-[#181615] mt-0.5">
                    847212 & 847211 in 20 Mins
                  </div>
                  <p className="text-xs text-[#6E655F] mt-0.5">
                    Express insured air/surface delivery to all other pincodes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E5DEC9]">
                  <div className="text-xs font-mono-num text-[#7A1C24] font-semibold">
                    04 · 4 MODES TO BUY + VIDEO CALL
                  </div>
                  <div className="font-display text-lg font-bold text-[#181615] mt-0.5">
                    Direct · Flipkart · Amazon · Meesho
                  </div>
                  <p className="text-xs text-[#6E655F] mt-0.5">
                    See any product live on Video Call before purchasing.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 1: 6 DISTINCT ANIMATED CATEGORY COLUMNS WITH AUTO REELS */}
            <HomeCategoryColumns onSelectCategory={handleOpenCategoryFromHome} />

            {/* SECTION 2: FEATURED SIGNATURE COLLECTION (HOVER IMAGE SWAP + 4 BUY MODES) */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 border-t border-[#E5DEC9]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#7A1C24]">
                    02. Curated Flagship Edit · Hover to Preview Alternate Look
                  </div>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-bold text-[#181615]"
                    style={{ textWrap: 'balance' }}
                  >
                    Signature Pieces Across All Six Segments
                  </h2>
                  <p className="text-sm text-[#5C534C] max-w-2xl">
                    Hover over any dress to reveal its secondary lookbook angle. Click any piece to access all 4 buying modes (Direct Website, Flipkart, Amazon, Meesho) and Live Video Call inspection.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleNavigate('products', 'all')}
                  className="self-start md:self-auto px-5 py-2.5 bg-[#181615] hover:bg-[#7A1C24] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>View All {PRODUCTS.length} Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {homeFeaturedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={handleSelectProduct}
                    onOpenVideoCall={(prod, e) => {
                      e.stopPropagation();
                      setVideoCallProduct(prod);
                    }}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 3: CRAFTSMANSHIP & FOUNDER HERITAGE CALLOUT */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="rounded-2xl bg-[#181615] text-[#FAF8F5] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                    03. Founded by The Armaan in 2016 · Direct Manufacturer
                  </div>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Crafted in Mumbai Bandra (400051). Celebrated at Our Madhubani Flagship (847212).
                  </h2>
                  <p className="text-sm text-[#B8B0A8] leading-relaxed max-w-2xl">
                    Visit our physical boutique at <span className="text-white font-medium">Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road — 847212</span> or inspect any garment from home via our Live Video Call Concierge on <span className="text-white font-mono-num font-medium">+91 77159 66368</span>.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => handleNavigate('about')}
                    className="px-6 py-3 bg-[#D4AF37] hover:bg-[#c5a02e] text-[#181615] text-xs font-bold rounded-lg transition-colors text-center whitespace-nowrap"
                  >
                    Read Our Story & View Google Map
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('contact')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg transition-colors text-center whitespace-nowrap"
                  >
                    Contact Boutique Desk ({BRAND_INFO.contact.phoneDisplay})
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : activePage === 'products' ? (
          /* ALL PRODUCTS PAGE WITH SUB-HEADING SEGMENT FILTER BUTTONS */
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Heading & Sub-Heading Category Filter Buttons */}
            <div className="bg-white border border-[#E5DEC9] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#7A1C24]">
                    Modnera Fashion Complete Archive · Hover on Any Dress to Change Look
                  </div>
                  <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#181615]">
                    {selectedCategory === 'all'
                      ? 'All Couture & Contemporary Products'
                      : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#5C534C] max-w-2xl">
                    {selectedCategory === 'all'
                      ? 'Select any segment below to filter by category. Click any garment to open its 4 buying modes (Direct Website, Flipkart, Amazon, Meesho) and Live Video Call option.'
                      : CATEGORIES.find((c) => c.id === selectedCategory)?.description}
                  </p>
                </div>

                {/* Search & Sort Controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#8A8077] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search fabric, work, dress..."
                      className="pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24] w-52 sm:w-60"
                    />
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')
                    }
                    aria-label="Sort products"
                    className="px-3 py-2 text-xs font-medium bg-[#FAF8F5] border border-[#DCD3C2] rounded-lg focus:outline-none focus:border-[#7A1C24]"
                  >
                    <option value="featured">Sort: Featured Archive</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* SUB-HEADING SEGMENT FILTER BAR (Interactive Buttons) */}
              <div className="pt-4 border-t border-[#EFEAE2] space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6E655F]">
                  Filter by Fashion Segment (Click to Open Segment):
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === 'all'
                        ? 'bg-[#7A1C24] text-white border-[#7A1C24] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#3A332E] border-[#DCD3C2] hover:border-[#181615] hover:text-[#181615]'
                    }`}
                  >
                    All Products ({PRODUCTS.length})
                  </button>

                  {CATEGORIES.map((cat) => {
                    const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-[#7A1C24] text-white border-[#7A1C24] shadow-xs'
                            : 'bg-[#FAF8F5] text-[#3A332E] border-[#DCD3C2] hover:border-[#181615] hover:text-[#181615]'
                        }`}
                      >
                        {cat.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Active Pincode Delivery Banner in All Products */}
            <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                {deliveryStatus.isHyperlocal20Min ? (
                  <Zap className="w-4 h-4 text-[#7A1C24] shrink-0" />
                ) : (
                  <Truck className="w-4 h-4 text-[#181615] shrink-0" />
                )}
                <span>
                  <strong className="text-[#181615]">{deliveryStatus.headline}:</strong>{' '}
                  <span className="text-[#4A433E]">{deliveryStatus.subline}</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[#6E655F]">Pincode:</span>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  aria-label="Delivery Pincode"
                  className="w-20 px-2 py-1 text-xs font-mono-num font-bold bg-white border border-[#DCD3C2] rounded"
                />
                <button
                  type="button"
                  onClick={() => setPincode('847212')}
                  className="px-2 py-1 bg-white border border-[#DCD3C2] rounded font-mono-num hover:border-[#7A1C24]"
                >
                  847212
                </button>
                <button
                  type="button"
                  onClick={() => setPincode('847211')}
                  className="px-2 py-1 bg-white border border-[#DCD3C2] rounded font-mono-num hover:border-[#7A1C24]"
                >
                  847211
                </button>
              </div>
            </div>

            {/* Product Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E5DEC9] rounded-2xl p-12 text-center space-y-3">
                <h3 className="font-display text-2xl font-bold text-[#181615]">
                  No Matching Garments Found
                </h3>
                <p className="text-xs text-[#6E655F]">
                  Try clearing your search filter or switching to All Products.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#181615] text-white text-xs font-semibold rounded-lg"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={handleSelectProduct}
                    onOpenVideoCall={(prod, e) => {
                      e.stopPropagation();
                      setVideoCallProduct(prod);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : activePage === 'about' ? (
          <AboutView
            onExploreCategory={(cat) => handleNavigate('products', cat)}
            onNavigateContact={() => handleNavigate('contact')}
          />
        ) : (
          <ContactView />
        )}
      </main>

      {/* Clean Luxury Editorial Footer */}
      <footer className="bg-[#181615] text-[#FAF8F5] border-t border-[#2E2A27] mt-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Brand & Founder Column */}
            <div className="lg:col-span-4 space-y-3">
              <div className="font-display text-3xl font-bold text-white">
                Modnera Fashion
              </div>
              <p className="text-xs text-[#B8B0A8] leading-relaxed">
                Founded in <span className="text-white font-semibold">2016</span> by{' '}
                <span className="text-[#E6C770] font-semibold">The Armaan</span>. Direct-to-wardrobe luxury Indian women’s ethnic wear, dupatta sets, hand-work embroidery dresses, kurti/pant sets, bottom wear, and frocks.
              </p>
              <div className="pt-1 text-xs text-[#B8B0A8]">
                Authorized Channel Partners:{' '}
                <span className="text-white font-semibold">Flipkart · Amazon · Meesho</span>
              </div>
            </div>

            {/* Categories Column */}
            <div className="lg:col-span-3 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#E6C770]">
                Six Fashion Segments
              </div>
              <ul className="space-y-1.5 text-xs text-[#B8B0A8]">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => handleNavigate('products', cat.id)}
                      className="hover:text-white transition-colors"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations Column */}
            <div className="lg:col-span-3 space-y-3 text-xs">
              <div className="font-bold uppercase tracking-wider text-[#E6C770]">
                Boutique & Factory Locations
              </div>
              <div className="space-y-1 text-[#B8B0A8]">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-[#E6C770]" />
                  <span>Physical Flagship Shop (847212)</span>
                </div>
                <p>Shanghat Muhallah, Bhauwara, Madhubani, Stadium Road — 847212</p>
              </div>
              <div className="space-y-1 text-[#B8B0A8]">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#E6C770]" />
                  <span>Manufacturing Factory (400051)</span>
                </div>
                <p>Mumbai, Bandra — 400051</p>
              </div>
            </div>

            {/* Direct Contact Column */}
            <div className="lg:col-span-2 space-y-2.5 text-xs">
              <div className="font-bold uppercase tracking-wider text-[#E6C770]">
                Direct Concierge
              </div>
              <div className="space-y-1.5 text-[#B8B0A8]">
                <a
                  href={`tel:${BRAND_INFO.contact.phoneRaw}`}
                  className="text-white font-mono-num font-semibold hover:text-[#E6C770] flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#E6C770]" />
                  <span>{BRAND_INFO.contact.phoneDisplay}</span>
                </a>
                <a
                  href="mailto:info@modnera.com"
                  className="hover:text-white flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E6C770]" />
                  <span>info@modnera.com</span>
                </a>
                <a
                  href="mailto:modneracare@gmail.com"
                  className="hover:text-white flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E6C770]" />
                  <span>modneracare@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8077]">
            <div>
              © {new Date().getFullYear()} Modnera Fashion · Founded by The Armaan in 2016. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => handleNavigate('home', 'all')}
                className="hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('products', 'all')}
                className="hover:text-white transition-colors"
              >
                All Products
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('about')}
                className="hover:text-white transition-colors"
              >
                About & Map
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('contact')}
                className="hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <VideoCallModal
        product={videoCallProduct}
        onClose={() => setVideoCallProduct(null)}
        onBuyDirectFromCall={(prod, size) => handleBuyDirectNow(prod, size)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        pincode={pincode}
        onPincodeChange={setPincode}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <PartnerChannelModal
        product={partnerModalState.product}
        partner={partnerModalState.partner}
        onClose={() => setPartnerModalState({ product: null, partner: null })}
        onSwitchToDirect={() => {
          if (partnerModalState.product) {
            handleBuyDirectNow(partnerModalState.product, 'M');
          }
        }}
      />
    </div>
  );
}
