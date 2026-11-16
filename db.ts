"use server"

import {MongoClient,Db,Collection} from 'mongodb';
import {URLProps} from "@/types";
import {redirect} from "next/navigation";
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error('MongoDB URI missing');
}

const DB_NAME = "cs303-mp-5";
let client:MongoClient | null = null;

let db: Db | null = null;

async function connect(): Promise<Db>{
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

export default async function getCollection(
    collectionName: string,
) : Promise<Collection>{
    if (!db){
        db = await connect();
    }
    return db.collection(collectionName);
}



export async function goToPage(page:string){
    const URLCollection = await getCollection("url-collection");
    const data = await URLCollection.find().toArray();

    const urls: URLProps[] = data.map ((p) => ({
        original:p.original,
        short:p.short
    }))

    let i = 0;
    for (i = 0; i < urls.length; i++) {
        if (urls[i].short === page) {
            redirect(urls[i].original);
        }
    }

    throw new Error ("Page Not Found");
}