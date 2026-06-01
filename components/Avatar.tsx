"use client";

import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function Avatar({ src, alt, size = 77, className = "" }: AvatarProps) {
  const [error, setError] = useState(false);

  const initial = alt?.[0]?.toUpperCase() ?? "?";

  return (
    <div
      className={`relative rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-[2px] ${className}`}
      style={{ width: size + 4, height: size + 4 }}
    >
      <div
        className="rounded-full overflow-hidden bg-white p-[2px] w-full h-full"
      >
        {!error && src ? (
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="rounded-full object-cover w-full h-full"
            onError={() => setError(true)}
            unoptimized
          />
        ) : (
          <div
            className="rounded-full bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 font-semibold"
            style={{ fontSize: size * 0.4 }}
          >
            {initial}
          </div>
        )}
      </div>
    </div>
  );
}
