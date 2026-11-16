"use server"
import {URLProps} from "@/types";
import getCollection from "@/db";

export default async function createURL(original:string,short:string){
    const postsCollection = await getCollection("url-collection");


    const data = await postsCollection.find().toArray();

    const urls: URLProps[] = data.map ((p) => ({
        original:p.original,
        short:p.short
    }))

    let i = 0;
    for (i = 0; i < urls.length; i++) {
        if (urls[i].short == short) {
            throw new Error ("URL Already Exists");
        }
    }

    try{
        let x = new URL(original);
        const res = await postsCollection.insertOne({original,short});
        if (!res.acknowledged) {
            throw new Error("DB insert failed");
        }
    }
    catch(err){
        throw new Error ("Invalid URL");
    }



    //what do the 3 dots mean?
}