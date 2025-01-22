import React from "react";
import { motion } from "framer-motion";

interface CarouselProps {
  images: string[];
  speed: number;
  direction: "left" | "right";
}

const InfiniteCarousel: React.FC<CarouselProps> = ({
  images,
  speed,
  direction,
}) => {
  return (
    <div className="relative flex overflow-hidden group">
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["-16.666%", "-50%"] : ["-50%", "-16.666%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...images, ...images, ...images].map((image, index) => (
          <div
            key={index}
            className="relative w-[150px] h-[100px] overflow-hidden flex-shrink-0 rounded-lg"
          >
            <img
              src={image}
              alt={`Carousel image ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;
