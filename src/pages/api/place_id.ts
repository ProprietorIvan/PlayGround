import run from "../../utils/airtop";
import { NextApiRequest, NextApiResponse } from "next";
import { locationsData } from "../../utils/businessesData";
import { Business } from "@/utils/types";
import clientPromise from "@/utils/mongodb";
// Data

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.id as string;
    const client = await clientPromise;
    const db = client.db("company");
    const collection = db.collection("businesses_analytics");
    const businesses_ranking_collection = db.collection("businesses_ranking");

    if (id) {
      fetch(
        `https://places.googleapis.com/v1/places/${id}?fields=rating,userRatingCount,displayName&key=${process.env.GOOGLE_PLACES_API_KEY}`
      )
        .then((response) => response.json())
        .then(async (data) => {
          collection.insertOne({
            rating: data.rating,
            userRatingCount: data.userRatingCount,
            name: data.displayName.text,
            place_id: id,
            date: new Date().toISOString(),
          });
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          const historyData = await collection.find({
            place_id: id,
            date: {
              $gte: weekAgo.toISOString(), // 7 days ago
              $lte: new Date().toISOString(), // current date
            },
            //https://stackoverflow.com/questions/56600608/how-to-use-mongodbs-gte-and-lte-for-date-and-time-saved-as-strings-on-separat
          });
          const result = await historyData.toArray();
          const rankingHistoryData = await businesses_ranking_collection.find({
            place_id: id,
            date: {
              $gte: weekAgo.toISOString(), // 7 days ago
              $lte: new Date().toISOString(), // current date
            },
            //https://stackoverflow.com/questions/56600608/how-to-use-mongodbs-gte-and-lte-for-date-and-time-saved-as-strings-on-separat
          });
          const resultRanking = await rankingHistoryData.toArray();
          
          res
            .status(200)
            .json({
              ...data,
              ranking: resultRanking?.[resultRanking.length - 1]?.ranking || 0,
              ratingDifference: (
                data.rating - (result?.[0]?.rating || data.rating)
              ).toFixed(2),
              userRatingCountDifference:
                data.userRatingCount -
                (result?.[0]?.userRatingCount || data.userRatingCount),
            });
        })
        .catch((error) => res.status(500).json({ error: error.message }));
    } else {
      res.status(200).json({ rating: 0, userRatingCount: 0 });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
