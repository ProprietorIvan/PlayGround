import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import Navigation from './components/Navigation';

interface Brand {
  name: string;
  headline: string;
  description: string;
  url: string;
}

interface Territory {
  brands: Brand[];
  type: string;
}

interface BrandData {
  [key: string]: Territory;
}

const brandData: BrandData = {
  VANCOUVER: {
    brands: [
      {
        name: 'AZ DRYWALL',
        headline: 'Premier Drywall Solutions',
        description: 'Expert drywall repairs and installations across Greater Vancouver. Professional finishing and guaranteed satisfaction.',
        url: 'https://az-handyman.ca/drywall/'
      },
      {
        name: 'VANCOUVER FLOOD',
        headline: 'Emergency Flood Response',
        description: 'Industry-leading water damage restoration, powered by advanced drying technology and 24/7 emergency response. Your home, restored.',
        url: 'https://vancouverflood.com'
      },
      {
        name: 'AZ HANDYMAN',
        headline: 'Complete Home Solutions',
        description: 'Professional handyman services for all your home maintenance needs. From repairs to renovations, we do it all.',
        url: 'https://az-handyman.ca'
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
  SEATTLE: {
    brands: [
      {
        name: 'SEATTLE FLOOD',
        headline: "Seattle's Water Damage Experts",
        description: 'Professional water damage restoration services across Greater Seattle. 24/7 emergency response.',
        url: 'https://floodbrooklyn.com'
      }
    ],
    type: 'RESTORATION'
  },
  'NEW YORK': {
    brands: [
      {
        name: 'S-PRO DAMAGE RESTORATION',
        headline: "Manhattan's Elite Restoration Service",
        description: "Premium damage restoration for Upper Manhattan's luxury properties. When emergencies happen, S-PRO delivers excellence.",
        url: 'https://floodbrooklyn.com'
      },
      {
        name: 'BROOKLYN WATER DAMAGE',
        headline: "Brooklyn's Trusted Restoration Team",
        description: 'Professional water damage restoration services in Downtown Brooklyn. Fast response, superior results.',
        url: 'https://floodbrooklyn.com'
      }
    ],
    type: 'RESTORATION'
  },
  MIAMI: {
    brands: [
      {
        name: 'ON TIME WATER DAMAGE',
        headline: "Miami's Premium Restoration Service",
        description: 'When storms strike, we respond. Advanced water damage restoration with guaranteed on-time arrival.',
        url: 'https://miamiflood.com/'
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
        url: 'https://rivierasyachts.com'
      },
      {
        name: 'RIVIERA STAYS',
        headline: 'Luxury Apartment Rentals',
        description: "Handpicked luxury apartments in Monaco's most coveted addresses. Where temporary stays meet permanent luxury.",
        url: 'https://riviera-stays.com/'
      }
    ],
    type: 'LUXURY'
  }
};

const TypeWriter = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 80);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{currentText}</span>;
};

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

const Home = ({ setCurrentPage }: HomeProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      <Navigation currentPage={setCurrentPage} showActions={false} />
      <main className="flex-1 flex">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full">
          {/* Navigation */}
          <div className="col-span-3 bg-zinc-50 border-r border-zinc-200">
            <div className="sticky top-0 p-4 md:p-8 h-screen overflow-y-auto">
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
                <div>EST. 2022</div>
                <div>OPERATIONS ACROSS 3 CONTINENTS</div>
                <div>12 BRANDS. 1 VISION.</div>
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="col-span-9 min-h-screen">
            <div className="p-4 md:p-8 h-full">
              <AnimatedContent territory={selected} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface AnimatedContentProps {
  territory: string | null;
}

const AnimatedContent = ({ territory }: AnimatedContentProps) => {
  const messages = useMemo(
    () => [
      "Welcome to Felicita Group",
      "We build and scale service companies",
      "From Vancouver to Monaco",
      "12 brands. 2 continents. 1 vision.",
      "A new era of service companies",
    ],
    []
  );

  const [introComplete, setIntroComplete] = useState(false);
  const [step, setStep] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (step >= messages.length) {
      setIntroComplete(true);
      return;
    }

    const typeMessage = () => {
      const currentMessage = messages[step];
      if (currentText.length < currentMessage.length) {
        const nextChar = currentMessage[currentText.length];
        setCurrentText((prev) => prev + nextChar);
      } else {
        setIsTyping(false);
      }
    };

    if (isTyping) {
      const timeout = setTimeout(typeMessage, 80);
      return () => clearTimeout(timeout);
    } else {
      const delay = setTimeout(() => {
        setStep((prev) => prev + 1);
        setCurrentText('');
        setIsTyping(true);
      }, 1500);
      return () => clearTimeout(delay);
    }
  }, [isTyping, currentText, step, messages]);

  if (territory) {
    const content = brandData[territory];
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
          {content.brands.map((brand: Brand, index: number) => (
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
                    <div className="text-zinc-600">{brand.description}</div>
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
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-6xl md:text-7xl text-black font-light tracking-tight">
        {introComplete ? "A new era of service companies" : currentText}
      </div>
    </div>
  );
};

export default Home;