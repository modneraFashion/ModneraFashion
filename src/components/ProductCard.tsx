import React, { useState } from 'react';
import { Video, ArrowUpRight, Eye } from 'lucide-react';
import { Product } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onOpenVideoCall: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onOpenVideoCall,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer bg-white border border-[#E5DEC9] rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
    >
      {/* Image Container with Hover Image Swap */}
      <div className="relative aspect-[3/4] w-full bg-[#F2ECE1] overflow-hidden">
        {/* Primary Image */}
        <ResilientImage
          src={product.primaryImage}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Hover Look / Detail Image */}
        <ResilientImage
          src={product.hoverImage}
          alt={`${product.name} alternate look`}
          style={{ objectPosition: product.hoverObjectPosition }}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
            isHovered
              ? `opacity-100 ${product.hoverTransformClass}`
              : 'opacity-0 scale-100'
          }`}
        />

        {/* Subtle Bottom Scrim on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Top-Right Quiet Unboxed Edition Text on Image Scrim */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-medium text-white bg-black/55 backdrop-blur-xs px-2.5 py-1 rounded">
            {isHovered ? 'Look 02 · Detail & Drape View' : 'Hover to Change Look'}
          </span>
        </div>

        {/* Hover Action Bar */}
        <div
          className={`absolute bottom-3 left-3 right-3 flex items-center gap-2 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white text-[#181615] text-xs font-semibold rounded-lg shadow-sm hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-1 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5 text-[#7A1C24]" />
            <span>4 Buy Modes</span>
          </button>
          <button
            type="button"
            onClick={(e) => onOpenVideoCall(product, e)}
            className="py-2 px-3 bg-[#7A1C24] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-[#61151B] transition-colors flex items-center justify-center gap-1 whitespace-nowrap"
            title="Inspect this piece on Live Video Call"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Call</span>
          </button>
        </div>
      </div>

      {/* Clean Unboxed Metadata & Pricing */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6E655F]">
            <span className="uppercase tracking-wider font-medium text-[#7A1C24]">
              {product.categoryName}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.colorName}</span>
          </div>

          <h3 className="font-display text-lg font-bold text-[#181615] mt-1 leading-snug group-hover:text-[#7A1C24] transition-colors line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-[#6E655F] mt-1 truncate">
            {product.fabric}
          </p>
        </div>

        <div className="pt-2.5 border-t border-[#EFEAE2] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-bold font-mono-num text-[#181615]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-mono-num text-[#8A8077] line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          </div>

          <span className="text-xs font-medium text-[#4A433E] group-hover:text-[#181615] flex items-center gap-0.5 whitespace-nowrap">
            <span>View Options</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
