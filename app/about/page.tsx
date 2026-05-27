export default function About() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title mb-12">About Us</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-4">Our Journey</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1962, Vender Auto Parts has grown into one of the leading manufacturers, suppliers, and exporters of two-wheeler and three-wheeler spare parts from India. Starting with the production of piston pins for various applications, we quickly earned a reputation for quality and reliability in the automotive components industry. The 1970s and 1980s were a turning point, as we adopted advanced manufacturing technologies to meet evolving demand.
            </p>
            <p className="text-gray-600">
              By 1985, Vender Auto Parts expanded into the manufacturing of three-wheeler spare parts and two-wheeler components. We continue to form the backbone of our product range today. With over six decades of expertise, we are now a global exporter of three-wheeler parts, supplying high-quality and genuine spare parts to TVS and Bajaj for popular brands like Bajaj RE and TVS King. Our products are trusted by distributors, importers, and retailers across 19 international markets, strengthening our presence in Asia, Africa, the Middle East, and beyond.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-4">Our Mission</h2>
            <p className="text-gray-600">
              As a reliable three-wheeler spare parts supplier in India, Vender Auto Parts is committed to delivering durable, cost-effective, and precision-engineered components that help our clients stay competitive in their markets. Our Promise: Quality parts, timely delivery, and long-term partnerships with our global clients.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-4">Why Choose Us</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Complete range of auto parts available</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Timely Delivery and updates of latest status</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Timely communications and systematic payment procedures</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Genuine Quality – Every single piece is inspected before packing</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Best packaging with proper plastic stretch wrapped cartoon to ensure the safety of the product</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}