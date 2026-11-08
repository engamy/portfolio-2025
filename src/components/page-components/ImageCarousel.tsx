import React, { useCallback, useEffect, useRef, useState } from 'react';
import ImageLightbox from './ImageLightbox';
import { LightboxImage, useLightbox } from '../../hooks/useLightbox';
import './ImageCarousel.css';

export interface CarouselImage extends LightboxImage {
  /** Short name shown under the slide. Falls back to the alt text. */
  title?: string;
  /** Small image for the thumbnail strip. Falls back to `src`. */
  thumb?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  /** Accessible name for the whole carousel. */
  label: string;
}

const Chevron: React.FC<{ dir: 'left' | 'right' }> = ({ dir }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="carousel-chevron">
    <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

const isNear = (i: number, current: number, count: number) => {
  const d = Math.abs(i - current);
  return d <= 1 || d === count - 1;
};

/**
 * One piece at a time. The track is a horizontal scroll-snap strip, so touch
 * devices swipe through it natively; the arrows, thumbnails and arrow keys
 * scroll the same strip. Clicking a slide opens it in the lightbox.
 */
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, label }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());
  const markLoaded = (i: number) =>
    setLoaded(prev => (prev.has(i) ? prev : new Set(prev).add(i)));
  const lightbox = useLightbox(images);

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track || images.length === 0) return;
      const next = (target + images.length) % images.length;
      track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
    },
    [images.length]
  );

  // The scroll position is the source of truth, so a swipe and an arrow
  // click update the counter the same way.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setIndex(Math.round(track.scrollLeft / Math.max(track.clientWidth, 1)));
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Keep the current slide in place when the viewport is resized.
  useEffect(() => {
    const onResize = () => {
      const track = trackRef.current;
      if (track) track.scrollTo({ left: index * track.clientWidth });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [index]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const current = images[index];

  return (
    <section className="carousel" aria-roledescription="carousel" aria-label={label}>
      <div className="carousel-stage">
        <button
          type="button"
          className="carousel-arrow carousel-arrow--prev"
          onClick={() => goTo(index - 1)}
          aria-label="Previous piece"
        >
          <Chevron dir="left" />
        </button>

        <div className="carousel-track" ref={trackRef} tabIndex={0} onKeyDown={onKeyDown}>
          {images.map((image, i) => (
            <div
              key={image.id}
              className={`carousel-slide${loaded.has(i) ? '' : ' is-loading'}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                // The current piece and its neighbours (wrapping) load right
                // away, so the next swipe or arrow press is already there.
                loading={isNear(i, index, images.length) ? 'eager' : 'lazy'}
                onLoad={() => markLoaded(i)}
                draggable={false}
                {...lightbox.triggerProps(i, image.title ?? image.alt)}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="carousel-arrow carousel-arrow--next"
          onClick={() => goTo(index + 1)}
          aria-label="Next piece"
        >
          <Chevron dir="right" />
        </button>
      </div>

      <div className="carousel-meta" aria-live="polite">
        <p className="carousel-title">{current?.title ?? current?.alt}</p>
        <p className="carousel-count">
          {index + 1} / {images.length}
        </p>
      </div>

      <div className="carousel-thumbs">
        {images.map((image, i) => (
          <button
            key={image.id}
            type="button"
            className="carousel-thumb"
            aria-current={i === index}
            aria-label={`Show ${image.title ?? image.alt}`}
            onClick={() => goTo(i)}
          >
            <img src={image.thumb ?? image.src} alt="" />
          </button>
        ))}
      </div>

      <ImageLightbox
        isOpen={lightbox.isOpen}
        currentImage={lightbox.currentImage}
        onClose={lightbox.close}
        onNext={images.length > 1 ? lightbox.next : undefined}
        onPrevious={images.length > 1 ? lightbox.previous : undefined}
      />
    </section>
  );
};

export default ImageCarousel;
