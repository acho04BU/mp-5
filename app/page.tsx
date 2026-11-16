"use client";

import styled from "styled-components";
import createURL from "@/components/CreateURL";
import {useState} from "react";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function Home(){
    const [page, setPage] = useState("");
    const [short, setShort] = useState("");
    const [created,setCreated] = useState("");
    return(
        <form className="w-96 rounded-xl p-4 bg-sky-400"
              onSubmit={ async (event) => {
                  event.preventDefault();
                  createURL(page, short)
                      .then((e)=> setCreated(e))
                      .catch(error => console.log(error));
              }

              }>
            <input
                placeholder="full link"
                value={page}
                onChange={(e) => setPage(e.target.value)} //create a textbox that updates title
            />
            <input
                placeholder="shortened link"
                value={short}
                onChange={(e) => setShort(e.target.value)}
            />
            <h1>Create a shortened URL for any page!</h1>
            <div className="w-full flex justify-center">
                <button
                    type="submit"
                >
                    Create
                </button>
            </div>
            <h3> Page Created:
                {created}
            </h3>

        </form>
    )
}