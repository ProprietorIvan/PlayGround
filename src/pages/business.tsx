import React from 'react';
import { User, Globe, MapPin, ExternalLink } from 'lucide-react';

const Navigation = ({ showActions = true }) => {
  return (
    <div className="p-3 border-b border-zinc-100 flex justify-between items-center sticky top-0 bg-white z-10">
      <div className="text-lg font-light tracking-tight cursor-pointer">
        FELICITA GROUP
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-sm text-zinc-500 hover:text-black transition-colors">
          ABOUT
        </button>
        <button className="w-6 h-6 rounded-full flex items-center justify-center border border-zinc-200 hover:border-zinc-400 transition-colors">
          <User className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const LocationsPage = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      <Navigation showActions={false} />
      
      <div className="p-4 md:p-8">
        <div className="space-y-16">
          {Object.entries(locationsData).map(([territory, data]) => (
            <div key={territory} className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-black">
                  {territory}
                </div>
                <div className="text-sm text-zinc-500 tracking-widest mt-2 font-medium">
                  {data.type}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {data.businesses.map((business, index) => (
                  <div key={business.name} className="bg-zinc-50 rounded-lg p-6 hover:bg-zinc-100 transition-colors">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-black">
                          {business.name}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          business.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-800' :
                          business.status.toLowerCase() === 'suspended' ? 'bg-red-100 text-red-800' :
                          'bg-zinc-200 text-zinc-800'
                        }`}>
                          {business.status}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-zinc-500">Email</div>
                          <div className="text-zinc-900">{business.email}</div>
                        </div>
                        <div>
                          <div className="font-medium text-zinc-500">Ranking</div>
                          <div className="text-zinc-900">{business.ranking}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-2">
                        {business.website !== "N/A" && business.website !== "Coming Soon" && (
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-black bg-white px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                            Visit Website
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        
                        {business.gmb && (
                          <a
                            href={business.gmb}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-black bg-white px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors"
                          >
                            <MapPin className="w-4 h-4" />
                            GMB Profile
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-zinc-500 mt-16 mb-8 font-medium">
          © FELICITA GROUP {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

// Data
const locationsData = {
  Vancouver: {
    type: "HOME SERVICES & RESTORATION",
    businesses: [
      {
        name: "A-Z HANDYMAN AND FLOOD RESTORATION SERVICE - VANCOUVER",
        status: "Suspended",
        email: "ivanrogacheov@gmail.com",
        ranking: "Top 1",
        website: "https://az-handyman.ca/general-handyman",
        gmb: "https://g.co/kgs/isvR1x6"
      },
      {
        name: "AZ DRYWALL REPAIR",
        status: "Suspended",
        email: "ivanrogacheov@gmail.com",
        ranking: "Top 1",
        website: "https://azhandyman.ca/drywall/",
        gmb: "https://www.google.com/search?client=safari&sca_esv=179675aa0a61f150&hl=en-us&kgmid=/g/11kjnw3x1k&q=AZ+Drywall+Repair+Vancouver&shndl=30&shem=sbpo3&source=sh/x/loc/act/m1/3&kgs=42f040b2c4cd1cbe"
      },
      {
        name: "AZ FLOOD RESTORATION AND HANDYMAN SERVICE - WEST VAN",
        status: "Suspended",
        email: "ivanrogacheov@gmail.com",
        ranking: "Top 1",
        website: "https://vancouverflood.com/flood-repair-services-in-vancouver/",
        gmb: "https://www.google.com/search?client=safari&sca_esv=179675aa0a61f150&hl=en-us&kgmid=/g/11sc6h_hld&q=AZ+Flood+Restoration+and+Handyman+Service+-+Vancouver&shndl=30&shem=sbpo3&source=sh/x/loc/act/m1/3&kgs=cf237683a99cc236"
      },
      {
        name: "AZ AIR CONDITIONING AND HEATING",
        status: "Active",
        email: "info@azhandyman.ca",
        ranking: "Not ranking well",
        website: "https://azhandyman.ca/services/air-conditioning-service/",
        gmb: "https://g.page/r/CZhLQFnJD-aZEAE/"
      },
      {
        name: "VANCOUVER FLOOD RESTORATION AND EMERGENCY REPAIRS BY FELICITA",
        status: "Active",
        email: "info@azhandyman.ca",
        ranking: "Top 1",
        website: "https://vancouverflood.com/flood-repair-services-in-vancouver/",
        gmb: "https://g.page/r/Ccs-rCttB9RrEAE"
      },
      {
        name: "THE ROOFING COMPANY OF VANCOUVER BY F GROUP LTD",
        status: "Active",
        email: "ddd.luntik.11@gmail.com",
        ranking: "Top 1",
        website: "roofsvancouver.com",
        gmb: "https://maps.app.goo.gl/NzyoyuCurHb9wT4L8?g_st=com.google.maps.preview.copy"
      }
    ]
  },
  Burnaby: {
    type: "RESTORATION",
    businesses: [
      {
        name: "BURNABY FLOOD RESTORATION",
        status: "N/A",
        email: "N/A",
        ranking: "N/A",
        website: "N/A",
        gmb: "YOUR_GMB_LINK"
      },
      {
        name: "BURNABY AZ HANDYMAN",
        status: "Active",
        email: "kalxetianetwork@gmail.com",
        ranking: "Not ranking well",
        website: "https://az-handyman.ca/general-handyman",
        gmb: "https://g.page/r/CcK1-z7csqb3EAE"
      }
    ]
  },
  
  Toronto: {
    type: "HOMER SERVICES & RESTORATION",
    businesses: [
      {
        name: "TORONTO FLOOD RESTORATION AND EMERGENCY REPAIRS BY FELICITA",
        status: "needs to be made",
        email: "needs to be made",
        ranking: "Not ranking well",
        website: "flood.ltd",
        gmb: ""
      },
      {
        name: "TORONTO DRYWALL REPAIR AND HANDYMAN",
        status: "Active",
        email: "azhandymaninternal@gmail.com",
        ranking: "Not ranking well",
        website: "toronto-drywall.com",
        gmb: ""
      },
      {
        name: "TORONTO DEMOLTION COMPANY",
        status: "Active",
        email: "azhandymaninternal@gmail.com",
        ranking: "Not ranking well",
        website: "toronto-demolition.com",
        gmb: ""
      }
    ]
  },
  Seattle: {
    type: "RESTORATION",
    businesses: [
      {
        name: "SEATTLE FLOOD",
        status: "N/A",
        email: "N/A",
        ranking: "N/A",
        website: "https://seattleflood.com/",
        gmb: "YOUR_GMB_LINK"
      }
    ]
  },
  "New York": {
    type: "RESTORATION",
    businesses: [
      {
        name: "PRO WATER DAMAGE RESTORATION UPPER MANHATTAN",
        status: "Active",
        email: "socratesrogarius@gmail.com",
        ranking: "Not ranking well",
        website: "https://www.floodbrooklyn.com/flood-repair",
        gmb: "https://g.page/r/CTVqxhIX2JEiEAE"
      },
      {
        name: "WATER DAMAGE DOWNTOWN BROOKLYN",
        status: "Active",
        email: "azhandymaninternal@gmail.com",
        ranking: "Not ranking well",
        website: "floodbrooklyn.com",
        gmb: "https://g.page/r/CY3ryRBkenZpEAE"
      }
    ]
  },
  Miami: {
    type: "RESTORATION",
    businesses: [
      {
        name: "ON TIME WATER DAMAGE RESTORATION MIAMI",
        status: "Active",
        email: "office@vancouverflood.com",
        ranking: "Not ranking well",
        website: "https://miamiflood.com/drying-and-dehumidification-services-in-miami/",
        gmb: "https://g.page/r/CcegzDuf9YzHEAE"
      }
    ]
  },
  Monaco: {
    type: "LUXURY SERVICES",
    businesses: [
      {
        name: "RIVIERA YACHTS",
        status: "Suspended",
        email: "ivanrogacheov@gmail.com",
        ranking: "Top 4",
        website: "https://rivierasyachts.com/welcome/",
        gmb: "YOUR_GMB_LINK"
      },
      {
        name: "MONACO SHORT TERM APARTMENT RENTALS BY RIVIERA STAYS",
        status: "Suspended",
        email: "office@riviera-stays.com",
        ranking: "Top 1",
        website: "https://riviera-stays.com/",
        gmb: "https://www.google.com/search?q=Monaco+Short+Term+Apartment+Rentals+by+Riviera+Stays&rlz=1C5CHFA_enIT1070FR1070&oq=Monaco+Short+Term+Apartment+Rentals+by+Riviera+Stays&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGEAyCggCEAAYgAQYogTSAQgxMDU5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8"
      }
    ]
  }
};

export default LocationsPage;