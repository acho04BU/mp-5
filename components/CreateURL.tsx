"use server"
import {URLProps} from "@/types";
import getCollection, {URL_COLLECTION} from "@/db";

export default async function createURL(
    original:string,
    short:string
):Promise<URLProps> {
    console.log("Creating new post...");
    const p = {
        original:original,
        short:short
    }

    const postsCollection = await getCollection(URL_COLLECTION);
    const res = await postsCollection.insertOne({...p});

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }


    return {...p,original:original,short:short}; //what do the 3 dots mean?
}