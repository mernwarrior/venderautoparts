import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import ServiceCard from '@/components/ServiceCard';
import { products } from '@/data/products';
import Link from 'next/link';
import { FaCogs, FaWrench, FaUsers, FaAward } from 'react-icons/fa';

export default function Home() {
  const topProducts = products.slice(0, 6);

  return (
    <>
      <Hero />

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<FaCogs />}
              title="SERVING SINCE 1962"
              description="We have been part of the manufacturing industry for the past 58 years and counting. With the same experience we are..."
            />
            <ServiceCard
              icon={<FaWrench />}
              title="STATE OF THE ART MACHINERY"
              description="With state of the art machinery and a highly skilled workforce with over 30 years of experience, Jayna Engineering Works has driven our manufacturing..."
            />
            <ServiceCard
              icon={<FaUsers />}
              title="ON TIME CUSTOMER SUPPORT"
              description="Capturing business from 15+ countries has ensured timely responses and updates to satisfy the customer to the highest ex..."
            />
            <ServiceCard
              icon={<FaAward />}
              title="PRECISION IN QUALITY"
              description="We strive to achieving the best quality products in the market and ensure high quality grade checks and a systematic on-floor inspection..."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                <span className="text-accent">◆◆</span> About the company
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 1962, Vender Auto Parts has grown into one of the leading manufacturers, suppliers, and exporters of two-wheeler and three-wheeler spare parts from India. Starting with the production of piston pins for various applications, we quickly earned a reputation for quality and reliability in the automotive components industry.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                As a reliable three-wheeler spare parts supplier in India, Vender Auto Parts is committed to delivering durable, cost-effective, and precision-engineered components that help our clients stay competitive in their markets.
              </p>
              <Link href="/about" className="btn-primary">
                Know more
              </Link>
            </div>
            <div className="relative">
              <div className="bg-accent text-white p-8 rounded-lg">
                <div className="text-6xl font-bold mb-2">1200 +</div>
                <div className="text-2xl">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">
            <span className="text-accent">◆◆</span> Top selling products <span className="text-accent">◆◆</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {topProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/products" className="btn-primary">
              Explore more
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}