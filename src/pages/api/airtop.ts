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
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db("company");
    const collection = db.collection("businesses_ranking");
    const list: Business[] = req.body;
    const foo = await run();
    let result: {
      data: any;
      terminate: () => void;
    } = { data: null, terminate: () => {} };

    await Promise.allSettled(
      list.map(async (business) => {
        result = await foo(
          business.googleSearch,
          `In which position under SERP features is ${business.name} please return in a json format {ranking:number}`
          // `please populate information of how many reviews ${business.name} has and what is rating please return in next json format: {rating: number, reviewsAmount:number}`
        ).catch((err) => {
          res.status(500).json({ error: err.message });
          return { terminate: () => {},data: {ranking: 0} };
          //process.exit(1);
        });
        console.log({ result: result?.data });
        if (result?.data) {
          business.ranking = result?.data.ranking;
          collection.insertOne({
            ranking: result?.data.ranking,
            name: business.name,
            place_id: business.place_id,
            date: new Date().toISOString(),
          });
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          const historyData = await collection.find({
            place_id: business.place_id,
            date: {
              $gte: weekAgo.toISOString(), // 7 days ago
              $lte: new Date().toISOString(), // current date
            },
            //https://stackoverflow.com/questions/56600608/how-to-use-mongodbs-gte-and-lte-for-date-and-time-saved-as-strings-on-separat
          });
          const results = await historyData.toArray();
          business.rankingDifference = Number(result?.data.ranking) - (results?.[0]?.ranking || result?.data.ranking)
          
        }
        return result;
      })
    );
   
  if(result?.terminate){
      await result?.terminate();
  }
    return res.status(200).json(list);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
