import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Film, Play, Pause } from 'lucide-react';
import { CATEGORIES, CategoryId, CategoryInfo } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface HomeCategoryColumnsProps {
  onSelectCategory: (categoryId: CategoryId) => void;
}

export const HomeCategoryColumns: React.FC<HomeCategoryColumnsProps> = ({
  onSelectCategory,
}) => {
  const [frameTick, setFrameTick] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCol, setHoveredCol] = useState<CategoryId | null>(null);

  // Auto-cycle the reel frames across all 6 columns independently with staggered offsets
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setFrameTick((prev) => prev + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5DEC9] pb-6">
        <div className="space-y-1.5">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#7A1C24]">
            01. Six Signature Couture Houses · Auto-Motion Lookbook Columns
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold text-[#181615]"
            style={{ textWrap: 'balance' }}
          >
            Explore Our Six Animated Fashion Segments
          </h2>
          <p className="text-sm text-[#5C534C] max-w-2xl">
            Every category features its own dedicated animated column with continuous auto-playing lookbook reels and macro embroidery motion. Hover to inspect or click any column to open its collection.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAutoPlaying((prev) => !prev)}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#181615] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#7A1C24]" />
              <span>Auto-Reel Active (Pause)</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#7A1C24]" />
              <span>Resume Auto-Reel</span>
            </>
          )}
        </button>
      </div>

      {/* 6 Distinct Animated Columns (1 column per category on desktop, 2-3 on tablet, 1 on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {CATEGORIES.map((category: CategoryInfo, colIndex: number) => {
          // Stagger frame index per column so each column feels alive & distinct
          const currentFrameIdx = (frameTick + colIndex) % category.reelFrames.length;
          const activeFrame = category.reelFrames[currentFrameIdx];
          const isHovered = hoveredCol === category.id;

          return (
            <div
              key={category.id}
              onMouseEnter={() => setHoveredCol(category.id)}
              onMouseLeave={() => setHoveredCol(null)}
              onClick={() => onSelectCategory(category.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory(category.id);
                }
              }}
              className={`group relative h-[480px] sm:h-[520px] rounded-2xl overflow-hidden border border-[#E5DEC9] bg-[#181615] cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                isHovered ? '-translate-y-1.5 shadow-2xl border-[#7A1C24]' : 'shadow-sm'
              }`}
            >
              {/* All Reel Frames Rendered for Smooth Crossfade + Auto Motion */}
              {category.reelFrames.map((frame, fIdx) => {
                const isActive = fIdx === currentFrameIdx;
                return (
                  <div
                    key={frame.caption}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ResilientImage
                      src={frame.image}
                      alt={`${category.name} - ${frame.caption}`}
                      style={{ objectPosition: frame.objectPosition }}
                      className={`w-full h-full object-cover animate-slow-pan transition-transform duration-700 ${
                        isHovered ? 'scale-110' : frame.scaleClass
                      }`}
                    />
                  </div>
                );
              })}

              {/* Measured Multi-Stop Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/55 pointer-events-none" />

              {/* Top Column Bar: Edition Number & Auto-Reel Frame Indicator */}
              <div className="relative z-10 p-4 flex items-center justify-between text-white">
                <span className="font-mono-num text-xs font-semibold tracking-wider text-[#E6C770]">
                  {category.editionNumber}.
                </span>

                <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono-num text-white/90 border border-white/15">
                  <Film className="w-3 h-3 text-[#E6C770]" />
                  <span>
                    0{currentFrameIdx + 1}/0{category.reelFrames.length}
                  </span>
                </div>
              </div>

              {/* Bottom Column Content: Live Frame Caption, Category Title & Hover Reveal */}
              <div className="relative z-10 p-4 space-y-3 text-white">
                {/* Frame Progress Bars */}
                <div className="grid grid-cols-3 gap-1">
                  {category.reelFrames.map((_, idx) => (
                    <div
                      key={idx}
                      className="h-0.5 rounded-full overflow-hidden bg-white/25"
                    >
                      <div
                        className={`h-full transition-all duration-500 ${
                          idx === currentFrameIdx ? 'w-full bg-[#E6C770]' : 'w-0'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Auto-Reel Motion Caption */}
                <div className="text-[11px] text-white/80 truncate">
                  {activeFrame.caption} · {activeFrame.subcaption}
                </div>

                {/* Category Name & Tagline */}
                <div>
                  <h3 className="font-display text-2xl font-bold text-white leading-tight group-hover:text-[#E6C770] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5 line-clamp-2">
                    {category.tagline}
                  </p>
                </div>

                {/* Hover Expansion Description */}
                <p
                  className={`text-[11px] text-white/75 leading-relaxed transition-all duration-200 ${
                    isHovered ? 'opacity-100 max-h-24' : 'opacity-80 line-clamp-2'
                  }`}
                >
                  {category.description}
                </p>

                {/* Open Segment CTA */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-white group-hover:text-[#E6C770] transition-colors">
                  <span>Open {category.shortName}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
