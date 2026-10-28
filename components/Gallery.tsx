"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const galleryImages = [
  { src: "/yoga_1.jpg", alt: "Yoga practice at Bright Academy" },
  { src: "/yoga_2.jpg", alt: "Yoga practice at Bright Academy" },
  { src: "/yoga_3.jpg", alt: "Yoga practice at Bright Academy" },
  { src: "/yoga_6.jpg", alt: "Yoga practice at Bright Academy", position: "top" },
  { src: "/yoga_7.jpg", alt: "Yoga practice at Bright Academy", position: "top" },
  { src: "/yoga_8.jpg", alt: "Yoga practice at Bright Academy" },
];
const repeatedGalleryImages = Array.from({ length: 5 }, (_, setIndex) =>
  galleryImages.map((image, index) => ({ ...image, key: `${setIndex}-${index}`, index }))
).flat();

export default function Gallery() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const requestedScrollLeft = useRef<number | null>(null);
  const scrollEndTimer = useRef<number | null>(null);
  const scrollCarousel = (direction: number) => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !firstCard) return;
    const step = firstCard.offsetWidth + 16;
    const currentScroll = requestedScrollLeft.current ?? carousel.scrollLeft;
    requestedScrollLeft.current = currentScroll + direction * step;
    carousel.scrollTo({ left: requestedScrollLeft.current, behavior: "smooth" });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !firstCard) return;

    const step = firstCard.offsetWidth + 16;
    const setWidth = step * galleryImages.length;
    carousel.scrollLeft = setWidth * 2;

    const handleScroll = () => {
      if (scrollEndTimer.current !== null) {
        window.clearTimeout(scrollEndTimer.current);
      }
      scrollEndTimer.current = window.setTimeout(() => {
        if (carousel.scrollLeft < setWidth) {
          carousel.scrollLeft += setWidth * 2;
        } else if (carousel.scrollLeft > setWidth * 4) {
          carousel.scrollLeft -= setWidth * 2;
        }
        requestedScrollLeft.current = null;
        scrollEndTimer.current = null;
      }, 150);
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    const timer = window.setInterval(() => {
      if (isPaused.current) return;
      scrollCarousel(1);
    }, 3500);
    return () => {
      window.clearInterval(timer);
      carousel.removeEventListener("scroll", handleScroll);
      if (scrollEndTimer.current !== null) {
        window.clearTimeout(scrollEndTimer.current);
      }
    };
  }, []);

  return (
    <section id="gallery" className="overflow-hidden bg-[#071426] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f2c14e]"><span className="h-px w-7 bg-[#f2c14e]" />Inside Bright Academy</p>
            <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">A place to learn,<br /><span className="text-[#f2c14e]">grow and belong.</span></h2>
          </div>
          <div className="flex items-center justify-between gap-5">
            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-white/65 transition-colors hover:text-[#f2c14e]">Visit us in Tiruvannamalai <ArrowUpRight size={16} /></a>
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollCarousel(-1)} aria-label="Previous gallery image" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-[#f2c14e] hover:bg-[#f2c14e] hover:text-[#071426]"><ArrowLeft size={18} /></button>
              <button type="button" onClick={() => scrollCarousel(1)} aria-label="Next gallery image" className="grid h-11 w-11 place-items-center rounded-full bg-[#f2c14e] text-[#071426] transition-transform hover:scale-105"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
        <div ref={carouselRef} onMouseEnter={() => { isPaused.current = true; }} onMouseLeave={() => { isPaused.current = false; }} onFocus={() => { isPaused.current = true; }} onBlur={() => { isPaused.current = false; }} className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {repeatedGalleryImages.map((image) => (
            <motion.figure key={image.key} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, delay: image.index * 0.08 }} className="group relative aspect-[4/3] w-[calc((100%-2rem)/3)] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-[#102a47]">
              <Image src={image.src} alt={image.alt} fill sizes="33.333vw" className={`object-cover ${image.position === "top" ? "object-top" : "object-center"} transition duration-700 group-hover:scale-105`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/80 via-transparent to-transparent opacity-80" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
