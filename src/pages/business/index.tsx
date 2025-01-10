import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import BusinessCard from "../components/BusinessCard";
import { Business, LocationsData, PlaceIdData } from "@/utils/types";
import { locationsData as mockData } from "@/utils/businessesData";
import { set } from "zod";

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
  const [locationsData, setLocationsData] = useState<LocationsData>(mockData);
  const [get, setGet] = useState(false);
  const [list,setList] = useState<Business[]>([])

  useEffect(() => {
    const fetchLocationsData = async (list: Business[]) => {
      const response = await fetch("/api/airtop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(list),
      });
      const data = await response.json();
      list.forEach((business, index) => {
        business.ranking = data[index].ranking;
        business.rankingDifference = data[index].rankingDifference;
      });
      setLocationsData({ ...locationsData });
    };

    if (get) {
      (async () => {
        //for (const group in locationsData) {
          await fetchLocationsData(list);
          setGet(false);
        //}
      })();
    }
  }, [get,list]);

  useEffect(()=>{
    Promise.allSettled(Object.values(locationsData).map((list, index) => {
      return list.businesses.map(async (business, index) => {
        const response = await fetch(`/api/place_id?id=${business.place_id||""}`)
        const data:PlaceIdData = await response.json();
        business.rating = data.rating;
        business.reviewsAmount = data.userRatingCount;
        business.ratingDifference = data.ratingDifference;
        business.userRatingCountDifference = data.userRatingCountDifference;
        business.ranking = data.ranking;

      });
    }).flat())
    .then(()=>{
     
      setLocationsData(structuredClone(locationsData))
    })
    
  },[])

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      <Navigation showActions={false} />

      <div className="p-4 md:p-8">
        
        {locationsData ? (
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
                {!get && <button onClick={() => {
                  setList(data.businesses)
                  setGet(true)
                  }} className='className="inline-flex items-center gap-2 text-black hover:bg-zinc-200 px-4 py-2 rounded-md bg-zinc-100 transition-colors"'>start</button>}
                <div className="grid grid-cols-1 gap-6">
                  {data.businesses.map((business, index) => (
                    <BusinessCard key={index} business={business} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="text-xs text-zinc-500 mt-16 mb-8 font-medium">
          © FELICITA GROUP {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
