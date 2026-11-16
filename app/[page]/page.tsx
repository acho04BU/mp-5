import {URLProps} from "@/types";
import getCollection, {URL_COLLECTION} from "@/db";
import {useParams} from "next/navigation";

export default async function goToURL(){
    const params = useParams();
    let page = params.page;
    const postsCollection = await getCollection(URL_COLLECTION);
    const data = await postsCollection.find().toArray();

    const urls: URLProps[] = data.map ((p) => ({
        original:p.original,
        short:p.short
    }))

    let i = 0;
    for (i = 0; i < urls.length; i++) {
        if (urls[i].short === page) {
            return urls[i].original;
        }
    }

    throw new Error ("Page Not Found");

}
