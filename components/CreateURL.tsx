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
        if (urls[i].short == short.toLowerCase()) {
            return ("URL Already Exists");
        }
    }

    try{
        const x = new URL(original);
    }catch(err){
        console.log(err);
    }

    if (original.toLowerCase().indexOf("http") != 0){
        return("Invalid URL");
    }

    short = short.toLowerCase();
    const res = await postsCollection.insertOne({original,short});
    if (!res.acknowledged) {
        return("DB insert failed");
    }

    return "Success! New Link at /r/" + short;
}