'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/images/hero-split-layout.png"
        width={1920}
        height={500}
        alt="Cantinho do Bebê - Desenvolvido com Amor"
        className="w-full h-auto"
        priority
      />
      
      {/* Seção esquerda inteira clicável */}
      <Link
        href="#products"
        className="absolute inset-y-0 left-0 w-[50%] cursor-pointer z-20"
        aria-label="Conheça a coleção"
      />
    </section>
  );
}