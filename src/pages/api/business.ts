import clientPromise from "@/utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {ObjectId} from 'mongodb'
import { locationsData } from "@/utils/businessesData";

export default async function handler(
    request: NextApiRequest,
    respond: NextApiResponse<{ message: string } | { error: string }>
) {
    if (request.method === "POST") {
        //code for updating location data
        // try {
        //     const client = await clientPromise
        //     const db = client.db('company');
        //     const collection = db.collection('businesses')
        //     //change to insertMany {name:"", rating: number, reviewsAmount: number}
        //     Object.values(locationsData).forEach(async (location) => {
        //         collection.insertMany(location.businesses)
        //     })
        //     //const data = await collection.insertMany()
            
        //     return respond.status(200).json({message: 'ok'})
        // } catch (error) {
        //     console.error("Error saving invoice:", error);
        //     return respond.status(500).json({ error: "Failed to save invoice" });
        // }
    }else if(request.method === 'GET'){
        try{
            const id = request.query.id;
            const client = await clientPromise
            const db = client.db('company');
            const collection = db.collection('businesses')
            if(typeof id === 'string'){
                const invoice = await collection.findOne({_id: new ObjectId(id)});
                return respond.status(200).json(invoice)
            }
        }catch(error){
            console.error("Error getting invoice:", error);
            return respond.status(500).json({ error: "Failed to get invoice" });
        }
    }
}