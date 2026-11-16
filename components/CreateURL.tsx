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
            return ("URL Already Exists");
        }
    }

    try{
        let x = new URL(original);
    }catch(err){
        console.log(err);
    }

    if (original.indexOf("http") != 0){
        return("Invalid URL");
    }

    const res = await postsCollection.insertOne({original,short});
    if (!res.acknowledged) {
        return("DB insert failed");
    }

    return "Success!";
}