import clientPromise from "@/utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {ObjectId} from 'mongodb'
import { locationsData } from "@/utils/businessesData";

export default async function handler(
    request: NextApiRequest,
    respond: NextApiResponse<{ message: string } | { error: string }>
) {
    if(request.method === 'GET'){
        try{
            const name = request.query.name;
            const client = await clientPromise
            const db = client.db('company');
            const collection = db.collection('businesses_analytics')
            if(typeof name === 'string'){
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                const data = await collection.find({
                    place_id:name,
                    date: {
                      $gte: weekAgo.toISOString(), // 7 days ago
                      $lte: new Date().toISOString()  // current date
                    }
                    //https://stackoverflow.com/questions/56600608/how-to-use-mongodbs-gte-and-lte-for-date-and-time-saved-as-strings-on-separat
                  })
                  const result = await data.toArray()
                  console.log(result)
                return respond.status(200).json(result)
            }
        }catch(error){
            console.error("Error getting invoice:", error);
            return respond.status(500).json({ error: "Failed to get invoice" });
        }
    }
}