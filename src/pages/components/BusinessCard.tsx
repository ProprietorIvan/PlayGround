import { Business } from "../../utils/types";
import { Globe, MapPin, ExternalLink, Loader } from "lucide-react";

export default function BusinessCard({ business }: { business: Business }) {
  return (
    business&&<div
      key={business.name}
      className="bg-zinc-50 rounded-lg p-6 hover:bg-zinc-100 transition-colors"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-black">{business.name}</div>
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              business.status.toLowerCase() === "active"
                ? "bg-green-100 text-green-800"
                : business.status.toLowerCase() === "suspended"
                ? "bg-red-100 text-red-800"
                : "bg-zinc-200 text-zinc-800"
            }`}
          >
            {business.status}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          
          <div>
            <div className="font-medium text-zinc-500">Keyword</div>
            <div className="text-zinc-900">{business.keyword}</div>
          </div>
          <div>
            <div className="font-medium text-zinc-500">Ranking</div>
            <div className="text-zinc-900">{business.ranking} <span
                className={`${
                  (business.rankingDifference || 0) > 0
                  ? "bg-red-100 text-red-800"
                  : (business.rankingDifference || 0) < 0
                  ? "bg-green-100 text-green-800"
                    : "bg-zinc-200 text-zinc-800"
                }`}
              >
                ({business.rankingDifference || 0})
              </span></div>
          </div>
          <div>
            <div className="font-medium text-zinc-500">Rating</div>
            <div className="text-zinc-900">
              {business.rating || <Loader />}
              <span
                className={`${
                  (business.ratingDifference || 0) > 0
                    ? "bg-green-100 text-green-800"
                    : (business.ratingDifference || 0) < 0
                    ? "bg-red-100 text-red-800"
                    : "bg-zinc-200 text-zinc-800"
                }`}
              >
                ({business.ratingDifference || 0})
              </span>
            </div>
          </div>
          <div>
            <div className="font-medium text-zinc-500">Reviews amount</div>
            <div className="text-zinc-900">
              {business.reviewsAmount || <Loader />}
              <span
                className={`${
                  (business.userRatingCountDifference || 0) > 0
                    ? "bg-green-100 text-green-800"
                    : (business.userRatingCountDifference || 0) < 0
                    ? "bg-red-100 text-red-800"
                    : "bg-zinc-200 text-zinc-800"
                }`}
              >
                ({business.userRatingCountDifference || 0})
              </span>
             
            </div>
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
          {business.googleSearch && (
            <a
              href={business.googleSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-black bg-white px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Google Search
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
