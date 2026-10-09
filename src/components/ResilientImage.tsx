import React, { useState } from 'react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFEAE2] via-[#E5DEC9] to-[#D6C7B2] text-[#3A2E2B] p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-10 h-10 mb-3 text-[#7A1C24] opacity-80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" />
        </svg>
        <span className="font-display text-lg font-semibold tracking-wide">
          {fallbackTitle || alt}
        </span>
        <span className="text-xs text-[#6E655F] mt-1">
          Modnera Fashion Couture Archive
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
};
