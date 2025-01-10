import { date } from "zod";

export type Business = {
    name: string;
    status: string;
    email: string;
    ranking: string|number;
    website: string;
    gmb: string;
    rating?: number;
    reviewsAmount?: number;
    place_id?:string;
    keyword?: string;
    googleSearch?: string;
    ratingDifference?: number;
    userRatingCountDifference?: number;
    rankingDifference?: number;
  }

  export type LocationsData = Record<string, {
    type: string;
    businesses: Business[];
  }>

export type PlaceIdData = {
  rating: number;
  userRatingCount: number;
  ratingDifference: number;
  userRatingCountDifference: number;
  ranking: number;
}

export type Analytics = {
  [date: string]: PlaceIdData
}
// const Analytics: Analytics = {
//   "2021-01-01": {
//     rating: 4.5,
//     userRatingCount: 100
//   },
//   "2021-01-02": {
//     rating: 4.7,
//     userRatingCount: 121
//   },
//   "2021-01-10": {
//     rating: 4.8,
//     userRatingCount: 130
//   },
// }