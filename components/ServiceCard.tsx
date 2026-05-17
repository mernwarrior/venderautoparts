import Link from 'next/link';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
      <div className="text-5xl text-primary mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-primary-dark mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">{description}</p>
      <Link href="/services" className="text-accent hover:text-accent-dark font-semibold text-sm inline-flex items-center gap-1">
        Read More
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}