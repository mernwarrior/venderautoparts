import mongoose from 'mongoose'

const MONGO_URI = 'mongodb+srv://venderautoparts:3UkpfjZSn39QHB2L@cluster0.tqkbzhw.mongodb.net/venderautoparts?retryWrites=true&w=majority'

const ProductSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  stockId: { type: String, required: true },
  amount: { type: Number, required: true },
  saleAmount: { type: Number, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=300&auto=format&fit=crop' },
  brandTitle: { type: String, required: true },
  urlSlug: { type: String, required: true, unique: true },
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

function makeSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const products = [
  // ─── ENGINE PARTS (10) ──────────────────────────────────────────────
  {
    category: 'Bajaj', subCategory: 'Engine',
    title: 'Bajaj RE Piston Ring Set (Standard)',
    description: 'High-quality piston ring set for Bajaj RE diesel engine. Precision engineered for optimal compression and oil control. Made from wear-resistant cast iron for long service life.',
    stockId: 'BEP-001', amount: 850, saleAmount: 650,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Engine',
    title: 'Bajaj RE Cylinder Liner',
    description: 'Genuine quality cylinder liner for Bajaj RE engine. Cast iron construction with precision honed bore surface for excellent piston ring sealing and heat dissipation.',
    stockId: 'BEP-002', amount: 1800, saleAmount: 1450,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Engine',
    title: 'Bajaj RE Connecting Rod',
    description: 'High-strength forged steel connecting rod for Bajaj RE engine. Heat-treated and precision machined to ensure durability under heavy load conditions.',
    stockId: 'BEP-003', amount: 1200, saleAmount: 950,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Engine',
    title: 'Bajaj RE Crankshaft Assembly',
    description: 'Complete crankshaft assembly for Bajaj RE engine. Forged steel construction with precision ground journals for smooth operation and long engine life.',
    stockId: 'BEP-004', amount: 4500, saleAmount: 3800,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Engine',
    title: 'Bajaj RE Valve Set (Inlet + Exhaust)',
    description: 'Complete valve set including inlet and exhaust valves for Bajaj RE engine. Made from heat-resistant steel with hardened valve seats for reliable operation.',
    stockId: 'BEP-005', amount: 650, saleAmount: 500,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Engine',
    title: 'Bajaj RE Oil Pump Assembly',
    description: 'Genuine quality oil pump assembly for Bajaj RE engine. Ensures proper lubrication of all engine components for extended engine life and reliable performance.',
    stockId: 'BEP-006', amount: 950, saleAmount: 750,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Engine',
    title: 'Bajaj RE Fuel Injection Pump',
    description: 'Complete fuel injection pump assembly for Bajaj RE diesel engine. Precision calibrated for optimal fuel delivery and combustion efficiency.',
    stockId: 'BEP-007', amount: 5500, saleAmount: 4500,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Engine',
    title: 'Bajaj RE Injector Nozzle Set',
    description: 'Set of fuel injector nozzles for Bajaj RE engine. Precision machined orifices ensure proper fuel atomization for complete combustion and better mileage.',
    stockId: 'BEP-008', amount: 1200, saleAmount: 950,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Engine',
    title: 'Bajaj RE Gasket Kit (Full Engine)',
    description: 'Complete engine gasket kit for Bajaj RE. Includes all necessary gaskets and seals for a full engine overhaul. Made from high-quality materials for leak-free operation.',
    stockId: 'BEP-009', amount: 1100, saleAmount: 850,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Engine',
    title: 'Bajaj RE Tappet Set',
    description: 'Set of tappets for Bajaj RE engine. Heat-treated and precision ground for accurate valve timing and quiet engine operation.',
    stockId: 'BEP-010', amount: 550, saleAmount: 400,
    brandTitle: 'Bajaj',
  },

  // ─── SUSPENSION & STEERING (6) ──────────────────────────────────────
  {
    category: 'Bajaj', subCategory: 'Suspension',
    title: 'Bajaj RE Front Shock Absorber (Pair)',
    description: 'Pair of front shock absorbers for Bajaj RE auto rickshaw. Hydraulic damping for smooth ride comfort. Heavy-duty construction for Indian road conditions.',
    stockId: 'BSS-001', amount: 2800, saleAmount: 2200,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Suspension',
    title: 'Bajaj RE Rear Leaf Spring Assembly',
    description: 'Complete rear leaf spring assembly for Bajaj RE. Made from high-strength spring steel with proper heat treatment for consistent ride height and load capacity.',
    stockId: 'BSS-002', amount: 3500, saleAmount: 2800,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Suspension',
    title: 'Bajaj RE Ball Joint (Upper & Lower)',
    description: 'Set of upper and lower ball joints for Bajaj RE front suspension. Precision machined with sealed grease joints for long-lasting performance.',
    stockId: 'BSS-003', amount: 750, saleAmount: 600,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Steering',
    title: 'Bajaj RE Steering Rack Assembly',
    description: 'Complete steering rack assembly for Bajaj RE auto rickshaw. Precise steering response with smooth operation. Includes all mounting hardware.',
    stockId: 'BSS-004', amount: 3200, saleAmount: 2600,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Steering',
    title: 'Bajaj RE Tie Rod End Set',
    description: 'Set of inner and outer tie rod ends for Bajaj RE steering system. Durable construction with sealed grease fittings for extended service life.',
    stockId: 'BSS-005', amount: 600, saleAmount: 450,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Steering',
    title: 'Bajaj RE Steering Column Assembly',
    description: 'Complete steering column assembly with lock for Bajaj RE. Includes ignition switch mount and turn signal mechanism for convenient operation.',
    stockId: 'BSS-006', amount: 2200, saleAmount: 1800,
    brandTitle: 'Bajaj',
  },

  // ─── BRAKE SYSTEM (6) ─────────────────────────────────────────────
  {
    category: 'Bajaj', subCategory: 'Brake',
    title: 'Bajaj RE Brake Shoe Set (Front & Rear)',
    description: 'Complete set of brake shoes for Bajaj RE auto rickshaw. High-friction lining material provides reliable stopping power in all weather conditions.',
    stockId: 'BBK-001', amount: 950, saleAmount: 750,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Brake',
    title: 'Bajaj RE Brake Drum (Rear)',
    description: 'Cast iron rear brake drum for Bajaj RE. Precision machined braking surface ensures smooth and even brake application. Meets OEM specifications.',
    stockId: 'BBK-002', amount: 1800, saleAmount: 1450,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Brake',
    title: 'Bajaj RE Brake Cable Set',
    description: 'Complete set of brake cables for Bajaj RE. Made from high-tensile steel wire with smooth PVC coating for corrosion resistance and easy operation.',
    stockId: 'BBK-003', amount: 350, saleAmount: 280,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Brake',
    title: 'Bajaj RE Master Cylinder Assembly',
    description: 'Brake master cylinder assembly for Bajaj RE auto rickshaw. Precision bore with rubber seals for consistent brake pressure and reliable operation.',
    stockId: 'BBK-004', amount: 1500, saleAmount: 1200,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Brake',
    title: 'Bajaj RE Brake Wheel Cylinder',
    description: 'Rear brake wheel cylinder for Bajaj RE. Precision honed bore with quality rubber cups for leak-free operation and consistent braking.',
    stockId: 'BBK-005', amount: 450, saleAmount: 350,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Brake',
    title: 'Bajaj RE Brake Adjuster Nut Set',
    description: 'Set of brake adjuster nuts and hardware for Bajaj RE. Zinc-plated for corrosion resistance. Includes lock nuts and adjustment screws.',
    stockId: 'BBK-006', amount: 200, saleAmount: 150,
    brandTitle: 'Bajaj',
  },

  // ─── ELECTRICAL PARTS (8) ──────────────────────────────────────────
  {
    category: 'Bajaj', subCategory: 'Electrical',
    title: 'Bajaj RE Starter Motor Assembly',
    description: 'Complete starter motor assembly for Bajaj RE engine. High-torque motor ensures reliable engine startup even in cold conditions. Includes mounting bracket.',
    stockId: 'BEL-001', amount: 3800, saleAmount: 3000,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Electrical',
    title: 'Bajaj RE Alternator / Dynamo',
    description: 'Complete alternator assembly for Bajaj RE. Provides reliable charging to keep battery topped up. Includes voltage regulator for consistent output.',
    stockId: 'BEL-002', amount: 2800, saleAmount: 2200,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Electrical',
    title: 'Bajaj RE Battery (12V)',
    description: 'Maintenance-free 12V battery for Bajaj RE auto rickshaw. High cold-cranking amps ensure reliable starting. Vibration-resistant construction for auto rickshaw use.',
    stockId: 'BEL-003', amount: 3500, saleAmount: 2800,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Electrical',
    title: 'Bajaj RE Headlight Assembly (Complete)',
    description: 'Complete headlight assembly with bulb and housing for Bajaj RE. DOT-approved reflector provides excellent road illumination. Includes adjustment screws.',
    stockId: 'BEL-004', amount: 1200, saleAmount: 950,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Electrical',
    title: 'Bajaj RE Tail Light Assembly',
    description: 'Complete tail light assembly for Bajaj RE auto rickshaw. Includes brake light and turn signal functions. UV-resistant housing prevents fading.',
    stockId: 'BEL-005', amount: 550, saleAmount: 420,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Electrical',
    title: 'Bajaj RE Ignition Switch Assembly',
    description: 'Complete ignition switch with key set for Bajaj RE. Includes steering lock mechanism. Durable construction with weather-resistant seals.',
    stockId: 'BEL-006', amount: 650, saleAmount: 500,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Electrical',
    title: 'Bajaj RE Horn (Dual Tone)',
    description: 'Dual-tone electric horn for Bajaj RE auto rickshaw. Loud and clear sound for safety. Corrosion-resistant construction for long life.',
    stockId: 'BEL-007', amount: 350, saleAmount: 280,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Electrical',
    title: 'Bajaj RE Wiring Harness (Full)',
    description: 'Complete wiring harness for Bajaj RE auto rickshaw. Color-coded wires with proper connectors for easy installation. Includes all fuses and relays.',
    stockId: 'BEL-008', amount: 1800, saleAmount: 1400,
    brandTitle: 'Bajaj',
  },

  // ─── BODY PARTS (6) ───────────────────────────────────────────────
  {
    category: 'Bajaj', subCategory: 'Body',
    title: 'Bajaj RE Front Bumper Assembly',
    description: 'Heavy-duty front bumper assembly for Bajaj RE auto rickshaw. Made from impact-resistant steel with chrome finish. Includes mounting brackets.',
    stockId: 'BBD-001', amount: 2500, saleAmount: 2000,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Body',
    title: 'Bajaj RE Side Door (Left)',
    description: 'Left side door panel for Bajaj RE auto rickshaw. Made from galvanized steel with proper rust protection. Includes window frame and hinge mounts.',
    stockId: 'BBD-002', amount: 4200, saleAmount: 3500,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Body',
    title: 'Bajaj RE Roof Panel',
    description: 'Roof panel for Bajaj RE auto rickshaw. Galvanized steel construction with weather-resistant coating. Pre-drilled for roof rail installation.',
    stockId: 'BBD-003', amount: 3200, saleAmount: 2600,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Body',
    title: 'Bajaj RE Floor Mat Set',
    description: 'Complete set of rubber floor mats for Bajaj RE. Heavy-duty ribbed rubber construction for durability. Easy to clean and provides insulation.',
    stockId: 'BBD-004', amount: 600, saleAmount: 450,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Body',
    title: 'Bajaj RE Door Handle (Inner & Outer)',
    description: 'Set of inner and outer door handles for Bajaj RE auto rickshaw. Chrome-plated finish with durable latch mechanism for reliable operation.',
    stockId: 'BBD-005', amount: 400, saleAmount: 300,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Body',
    title: 'Bajaj RE Rear View Mirror (Pair)',
    description: 'Pair of rear view mirrors for Bajaj RE. Convex glass provides wide-angle view. Vibration-resistant mounting with adjustable bracket.',
    stockId: 'BBD-006', amount: 500, saleAmount: 380,
    brandTitle: 'Bajaj',
  },

  // ─── TRANSMISSION & CLUTCH (6) ────────────────────────────────────
  {
    category: 'Bajaj', subCategory: 'Transmission',
    title: 'Bajaj RE Clutch Plate Set',
    description: 'Complete clutch plate set for Bajaj RE transmission. Includes friction plates and steel plates. High-quality friction material for smooth engagement.',
    stockId: 'BTR-001', amount: 2200, saleAmount: 1800,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Transmission',
    title: 'Bajaj RE Clutch Cable',
    description: 'Genuine quality clutch cable for Bajaj RE auto rickshaw. Made from high-tensile steel with smooth Teflon lining for light clutch operation.',
    stockId: 'BTR-002', amount: 250, saleAmount: 180,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Transmission',
    title: 'Bajaj RE Gearbox Assembly (4-Speed)',
    description: 'Complete 4-speed gearbox assembly for Bajaj RE. Precision ground gears for smooth shifting. Includes all bearings and synchromesh components.',
    stockId: 'BTR-003', amount: 8500, saleAmount: 7000,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Transmission',
    title: 'Bajaj RE Half Shaft (Axle)',
    description: 'Rear half shaft / axle for Bajaj RE auto rickshaw. Forged steel construction with splined ends. Heat-treated for maximum strength and durability.',
    stockId: 'BTR-004', amount: 2800, saleAmount: 2200,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Transmission',
    title: 'Bajaj RE Differential Assembly',
    description: 'Complete differential assembly for Bajaj RE. Precision machined gears for smooth power delivery. Includes bearings and seals.',
    stockId: 'BTR-005', amount: 6500, saleAmount: 5200,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Transmission',
    title: 'Bajaj RE Gear Shift Linkage Kit',
    description: 'Complete gear shift linkage kit for Bajaj RE transmission. Includes all rods, bushes, and clips for precise gear selection.',
    stockId: 'BTR-006', amount: 450, saleAmount: 350,
    brandTitle: 'Bajaj',
  },

  // ─── COOLING & EXHAUST (4) ────────────────────────────────────────
  {
    category: 'Bajaj', subCategory: 'Cooling',
    title: 'Bajaj RE Radiator Assembly',
    description: 'Complete radiator assembly for Bajaj RE engine. High-efficiency core provides maximum cooling. Includes radiator cap and drain plug.',
    stockId: 'BCE-001', amount: 3500, saleAmount: 2800,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Cooling',
    title: 'Bajaj RE Cooling Fan with Motor',
    description: 'Electric cooling fan assembly with motor for Bajaj RE radiator. High airflow design keeps engine at optimal temperature even in heavy traffic.',
    stockId: 'BCE-002', amount: 1200, saleAmount: 950,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Exhaust',
    title: 'Bajaj RE Silencer / Muffler Assembly',
    description: 'Complete exhaust silencer assembly for Bajaj RE. Corrosion-resistant construction with internal baffles for noise reduction. Meets emission standards.',
    stockId: 'BCE-003', amount: 2800, saleAmount: 2200,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Exhaust',
    title: 'Bajaj RE Exhaust Manifold',
    description: 'Exhaust manifold for Bajaj RE engine. Cast iron construction with smooth flow passages for optimal exhaust gas evacuation.',
    stockId: 'BCE-004', amount: 1500, saleAmount: 1200,
    brandTitle: 'Bajaj',
  },

  // ─── WHEELS & TYRES / OTHER (4) ───────────────────────────────────
  {
    category: 'Bajaj', subCategory: 'Wheels',
    title: 'Bajaj RE Wheel Rim (Front)',
    description: 'Front wheel rim for Bajaj RE auto rickshaw. Sturdy steel construction with correct offset and bolt pattern. Painted with corrosion-resistant finish.',
    stockId: 'BOT-001', amount: 1800, saleAmount: 1450,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Wheels',
    title: 'Bajaj RE Wheel Hub Assembly',
    description: 'Complete wheel hub assembly with bearings for Bajaj RE. Pre-assembled and ready to install. Includes grease seals and mounting hardware.',
    stockId: 'BOT-002', amount: 2200, saleAmount: 1800,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Fuel',
    title: 'Bajaj RE Fuel Tank Assembly',
    description: 'Complete fuel tank assembly for Bajaj RE. Made from rust-resistant steel with internal baffles. Includes fuel cap, sender unit, and outlet pipe.',
    stockId: 'BOT-003', amount: 3800, saleAmount: 3000,
    brandTitle: 'Bajaj',
  },
  {
    category: 'Bajaj', subCategory: 'Fuel',
    title: 'Bajaj RE Accelerator Cable',
    description: 'Genuine quality accelerator cable for Bajaj RE auto rickshaw. Smooth Teflon-lined outer casing for light pedal operation. Corrosion-resistant inner wire.',
    stockId: 'BOT-004', amount: 200, saleAmount: 150,
    brandTitle: 'Bajaj',
  },
]

async function seed() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGO_URI)
    console.log('Connected!\n')

    // Delete existing Bajaj products
    const deleted = await Product.deleteMany({ category: 'Bajaj' })
    console.log(`Deleted ${deleted.deletedCount} existing Bajaj products\n`)

    // Add urlSlug to all products
    const productsWithSlug = products.map((p) => ({
      ...p,
      urlSlug: makeSlug(p.title),
    }))

    let inserted = 0
    for (const product of productsWithSlug) {
      try {
        await Product.create(product)
        inserted++
        process.stdout.write(`✓ ${product.title}\n`)
      } catch (err) {
        process.stdout.write(`✗ ${product.title} - SKIPPED (${err.message})\n`)
      }
    }

    console.log(`\n✅ Successfully inserted ${inserted}/50 Bajaj products!`)
    await mongoose.disconnect()
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

seed()
