import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';
import Navigation from './components/Navigation';

// Brand Data - Updated with actual links and brands
const brandData = {
  VANCOUVER: {
    brands: [
      {
        name: 'AZ DRYWALL',
        headline: 'Premier Drywall Solutions',
        description: 'Expert drywall repairs and installations across Greater Vancouver. Professional finishing and guaranteed satisfaction.',
        url: 'https://azhandyman.ca/drywall/'
      },
      {
        name: 'VANCOUVER FLOOD',
        headline: 'Emergency Flood Response',
        description: 'Industry-leading water damage restoration, powered by advanced drying technology and 24/7 emergency response. Your home, restored.',
        url: 'https://vancouverflood.com/flood-repair-services-in-vancouver/'
      },
      {
        name: 'AZ HANDYMAN',
        headline: 'Complete Home Solutions',
        description: 'Professional handyman services for all your home maintenance needs. From repairs to renovations, we do it all.',
        url: 'https://azhandyman.ca/handyman-general/'
      },
      {
        name: 'AZ HVAC',
        headline: 'Climate Control Experts',
        description: 'Professional air conditioning and heating services. Installation, maintenance, and repairs by certified technicians.',
        url: 'https://azhandyman.ca/services/air-conditioning-service/'
      },
      {
        name: 'VANCOUVER DEMOLITION',
        headline: 'Professional Demolition Services',
        description: 'Expert demolition services for residential and commercial projects. Safe, efficient, and environmentally conscious.',
        url: 'https://vancouver-demolition.com'
      },
      {
        name: 'VANCOUVER ROOFING',
        headline: 'Superior Roofing Solutions',
        description: 'Complete roofing services from repairs to full replacements. Quality materials and expert installation.',
        url: 'https://roofsvancouver.com'
      }
    ],
    type: 'HOME SERVICES'
  },
  BURNABY: {
    brands: [
      {
        name: 'BURNABY FLOOD',
        headline: 'Rapid Flood Response',
        description: 'Fast, reliable flood restoration services in Burnaby. Available 24/7 for all water damage emergencies.',
        url: 'https://burnabyflood.com'
      }
    ],
    type: 'RESTORATION'
  },
  SEATTLE: {
    brands: [
      {
        name: 'SEATTLE FLOOD',
        headline: 'Seattle&apos;s Water Damage Experts',
        description: 'Professional water damage restoration services across Greater Seattle. 24/7 emergency response.',
        url: 'https://seattleflood.com'
      }
    ],
    type: 'RESTORATION'
  },
  'NEW YORK': {
    brands: [
      {
        name: 'S-PRO DAMAGE RESTORATION',
        headline: "Manhattan&apos;s Elite Restoration Service",
        description: "Premium damage restoration for Upper Manhattan's luxury properties. When emergencies happen, S-PRO delivers excellence.",
        url: 'https://sprodamage.com'
      },
      {
        name: 'BROOKLYN WATER DAMAGE',
        headline: "Brooklyn&apos;s Trusted Restoration Team",
        description: 'Professional water damage restoration services in Downtown Brooklyn. Fast response, superior results.',
        url: 'https://brooklynwaterdamage.com'
      }
    ],
    type: 'RESTORATION'
  },
  MIAMI: {
    brands: [
      {
        name: 'ON TIME WATER DAMAGE',
        headline: "Miami&apos;s Premium Restoration Service",
        description: 'When storms strike, we respond. Advanced water damage restoration with guaranteed on-time arrival.',
        url: 'https://miamiflood.com/drying-and-dehumidification-services-in-miami/'
      }
    ],
    type: 'RESTORATION'
  },
  MONACO: {
    brands: [
      {
        name: 'RIVIERA YACHTS',
        headline: 'Luxury Yacht Charter',
        description: 'Premium yacht rental experiences in Monaco. Every voyage crafted to perfection.',
        url: 'https://rivierasyachts.com/welcome/'
      },
      {
        name: 'RIVIERA STAYS',
        headline: 'Luxury Apartment Rentals',
        description: "Handpicked luxury apartments in Monaco&apos;s most coveted addresses. Where temporary stays meet permanent luxury.",
        url: 'https://riviera-stays.com/'
      }
    ],
    type: 'LUXURY'
  }
};

const Home = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navigation currentPage={setCurrentPage} showActions={false} />
      <main>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Navigation */}
          <div className="col-span-3 p-4 md:p-8 border-r border-zinc-200 bg-zinc-50">
            <div className="sticky top-8">
              <div className="text-xs uppercase mb-8 tracking-widest text-zinc-700 font-medium">Select Territory</div>
              <div className="space-y-3">
                {Object.keys(brandData).map(territory => (
                  <motion.button
                    key={territory}
                    className={`block text-left text-lg transition-colors w-full px-3 py-2 rounded ${
                      selected === territory 
                        ? 'text-white bg-black font-medium' 
                        : 'text-zinc-600 hover:bg-zinc-100'
                    }`}
                    onClick={() => setSelected(territory)}
                    whileTap={{ x: 3 }}
                  >
                    {territory}
                  </motion.button>
                ))}
              </div>

              <div className="mt-16 text-xs text-zinc-500 space-y-1 font-medium">
                <div>EST. 2024</div>
                <div>OPERATIONS ACROSS 3 CONTINENTS</div>
                <div>12 BRANDS. 1 VISION.</div>
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="col-span-9 p-4 md:p-8">
            <AnimatedContent territory={selected} />
          </div>
        </div>
      </main>
    </div>
  );
};

// Animated Content Component
const AnimatedContent = ({ territory }: { territory: string | null }) => {
  if (!territory) {
    return (
      <div className="h-full flex items-center justify-center text-2xl text-zinc-300 font-light">
        SELECT TERRITORY
      </div>
    );
  }

  const content = brandData[territory as keyof typeof brandData];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div>
        <div className="text-5xl md:text-7xl font-bold text-black leading-none">
          {territory}
        </div>
        <div className="text-sm text-zinc-500 tracking-widest mt-4 font-medium">
          {content.type}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-12">
        {content.brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group space-y-4"
          >
            <div className="flex items-start space-x-4">
              <div className="text-xs text-zinc-400 w-8 pt-2 font-medium">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              <div className="space-y-4 flex-1">
                <a 
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block space-y-4 hover:bg-zinc-50 p-4 -m-4 rounded-lg transition-colors"
                >
                  <div className="text-2xl md:text-3xl font-bold text-black group-hover:text-black transition-colors">
                    {brand.name}
                  </div>
                  <div className="text-xl text-zinc-700 font-medium">
                    {brand.headline}
                  </div>
                  <div className="text-zinc-600">
                    {brand.description}
                  </div>
                </a>
              </div>
            </div>
            <div className="h-px bg-zinc-200" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-zinc-500 mt-16 font-medium"
      >
        © FELICITA GROUP {new Date().getFullYear()}
      </motion.div>
    </motion.div>
  );
};

export default Home;