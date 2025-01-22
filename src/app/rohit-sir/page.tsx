"use client";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import React from "react";

const images = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1682687220509-61b8a906ca19?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=800&auto=format&fit=crop&q=60",
];

const carouselData = Array(12)
  .fill(null)
  .map((_, index) => ({
    speed: 25 + Math.random() * 10,
    direction: index % 2 === 0 ? ("left" as const) : ("right" as const),
    offset: index * 12,
  }));

const Page = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="w-full mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Infinite Image Carousel
        </h1>
        <div className="relative h-[400px] overflow-hidden bg-teal-200">
          <div className="absolute inset-0 -rotate-12 scale-150">
            {carouselData.map((carousel, index) => (
              <div
                key={index}
                className="hover:pause relative group"
                style={{
                  transform: `translateY(${carousel.offset}px)`,
                }}
              >
                <InfiniteCarousel
                  images={images}
                  speed={carousel.speed}
                  direction={carousel.direction}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
