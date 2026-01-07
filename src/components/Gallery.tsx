import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/hooks/useLanguage";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const { t, lang } = useLanguage();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images with descriptions in French and English
  const images = [
    {
      src: "/images/img-1.jpg",
      alt_fr: "Curry traditionnel",
      alt_en: "Traditional curry",
    },
    {
      src: "/images/img-2.jpg",
      alt_fr: "Tandoori grillé",
      alt_en: "Tandoori grilled",
    },
    {
      src: "/images/img-3.jpg",
      alt_fr: "Boissons fraîches",
      alt_en: "Fresh drinks",
    },
    {
      src: "/images/img-4.jpg",
      alt_fr: "Poulet tikka",
      alt_en: "Chicken tikka",
    },
  ];

  const getAlt = (image: typeof images[0]) => {
    return lang === "fr" ? image.alt_fr : image.alt_en;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="galerie" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">
            {t.gallery.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">
            {t.gallery.title}
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            {t.gallery.description}
          </p>
        </motion.div>

        {/* Slider for 4 images */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-medium"
          >
            {images.map((image, idx) => (
              <motion.img
                key={idx}
                src={image.src}
                alt={getAlt(image)}
                initial={{ opacity: 0 }}
                animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ))}

            {/* Image description */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent p-6">
              <motion.p
                key={currentImageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white font-serif text-lg font-semibold"
              >
                {getAlt(images[currentImageIndex])}
              </motion.p>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>

          {/* Thumbnail indicators */}
          <div className="flex gap-2 mt-6 justify-center">
            {images.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-3 rounded-full transition-all ${
                  idx === currentImageIndex
                    ? "bg-primary w-8"
                    : "bg-border w-3 hover:bg-border/70"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentImageIndex
                  ? "border-primary shadow-soft"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <img
                src={image.src}
                alt={getAlt(image)}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
