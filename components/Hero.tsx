import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-3 h-full">
          <div className="bg-cover bg-center" style={{backgroundImage: 'url(/images/hero-1.jpg)'}}></div>
          <div className="bg-cover bg-center" style={{backgroundImage: 'url(/images/hero-2.jpg)'}}></div>
          <div className="bg-cover bg-center" style={{backgroundImage: 'url(/images/hero-3.jpg)'}}></div>
        </div>
      </div>
      
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            High Quality<br />
            <span className="text-accent">Spare Parts</span>
          </h1>
          <Link href="/products" className="btn-primary inline-block">
            Explore Range
          </Link>
        </div>
      </div>
    </div>
  );
}