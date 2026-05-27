import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import HomeClient from '@/components/HomeClient'
import { getProducts } from '@/services/productService'

import {
  FaCogs,
  FaWrench,
  FaUsers,
  FaAward
} from 'react-icons/fa'
import Navbar from '@/components/Navbar'

export default async function Home() {

  const products = await getProducts()

  const topProducts = products.slice(0, 6)

  return (
    <>
    {/* <Navbar cartCount={0} /> */}

  {/* <HomeClient products={topProducts} /> */}
      <Hero />

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            <ServiceCard
              icon={<FaCogs />}
              title="SERVING SINCE 1962"
              description="We have been part of the manufacturing industry for the past 58 years."
            />

            <ServiceCard
              icon={<FaWrench />}
              title="STATE OF THE ART MACHINERY"
              description="Advanced machinery with highly skilled workforce."
            />

            <ServiceCard
              icon={<FaUsers />}
              title="ON TIME CUSTOMER SUPPORT"
              description="Timely support and customer satisfaction guaranteed."
            />

            <ServiceCard
              icon={<FaAward />}
              title="PRECISION IN QUALITY"
              description="High quality products with systematic inspection."
            />

          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">

          <h2 className="section-title">
            Top selling products
          </h2>

          <HomeClient products={topProducts} />

        </div>
      </section>
    </>
  )
}