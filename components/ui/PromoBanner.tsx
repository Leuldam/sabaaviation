import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * PromoBanner - a reusable promotional banner component.
 *
 * This component displays a highlighted call‑to‑action with a gradient background,
 * prominent typography, and an optional button. It is designed to blend with the
 * existing Tailwind‑based UI and matches the premium look of the site.
 */
export default function PromoBanner() {
  return (
    <div className='relative overflow-hidden rounded-xl border border-warm-gold/20 bg-gradient-to-r from-warm-gold/10 via-warm-gold/5 to-warm-gold/10 p-6 shadow-lg backdrop-blur-sm md:p-8'>
      <div className='flex flex-col items-start justify-between md:flex-row md:items-center'>
        <div className='mb-4 md:mb-0'>
          <h2 className='text-2xl font-bold text-warm-gold md:text-3xl'>
            Limited Time Offer: 15% Off All Services!
          </h2>
          <p className='mt-1 text-sm text-warm-gold/80'>
            Elevate your aviation operations with our premium ground handling and support.
          </p>
        </div>
        <Link
          href='/services'
          className='inline-flex items-center rounded-full bg-warm-gold px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-warm-gold/90'
        >
          Explore Services
          <ArrowRight className='ml-2' size={16} />
        </Link>
      </div>
    </div>
  );
}
