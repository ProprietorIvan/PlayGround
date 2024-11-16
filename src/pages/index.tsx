import { Calendar, Wrench, Upload, Star } from 'lucide-react';
import Navigation from './components/Navigation';

const Home = ({ setCurrentPage }: any) => {
  const features = [
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Instant AI-Powered Quotes",
      description: "Get accurate repair estimates in minutes by simply uploading photos - no more waiting days for in-person assessments."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Scheduling",
      description: "Book appointments instantly through our real-time calendar integration. Pick a time that works for you."
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Transparent Pricing",
      description: "Know exactly what you'll pay upfront with our detailed breakdowns covering labor and materials."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      text: "I saved hours of back-and-forth communication. Uploaded a photo of my leaky faucet, got a quote in minutes, and had it fixed the next day. Brilliant!"
    },
    {
      name: "Michael Chen",
      role: "Property Manager",
      text: "Managing repairs across multiple properties used to be a nightmare. Now I can handle everything through one platform. Game changer for my business."
    },
    {
      name: "Emily Rodriguez",
      role: "Working Professional",
      text: "As a busy executive, I love that I can schedule repairs without phone calls or site visits. The AI quotes are surprisingly accurate!"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={setCurrentPage} showActions={false} />
      
      {/* Hero Section - Mobile First */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
            Get Home Repairs Done in Minutes, Not Days
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
            Upload a photo, get an instant AI-powered quote, and book a verified handyman - all without leaving your couch.
          </p>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg text-lg font-medium">
            Get Your Quote Now
          </button>
          <div className="mt-6 flex items-center gap-2 justify-center md:justify-start">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600 text-sm md:text-base">1000+ happy homeowners</span>
          </div>
        </div>
        <div className="w-full md:w-[500px] lg:w-[600px]">
          <img src="/api/placeholder/600/600" alt="Handyman Service" className="w-full h-auto rounded-lg" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16">
            Everything You Need for Hassle-Free Home Repairs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="bg-black text-white rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16">
            Join Thousands of Happy Homeowners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 md:p-8 rounded-xl">
                <img src="/api/placeholder/64/64" alt="" className="w-16 h-16 rounded-full mb-4" />
                <h3 className="font-bold">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{testimonial.role}</p>
                <p className="text-gray-600 text-sm md:text-base">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform How You Handle Home Repairs?
          </h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base">
            Join thousands of happy homeowners who&apos;ve simplified their home maintenance
          </p>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="w-full md:w-auto bg-white text-black px-6 py-3 rounded-lg text-lg font-medium">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home