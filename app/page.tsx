"use client";

import createURL from "@/components/CreateURL";
import {useState} from "react";
import {StyledForm, StyledInput, StyledDiv} from "@/components/styles";



export default function Home(){
    const [page, setPage] = useState("");
    const [short, setShort] = useState("");
    const [created,setCreated] = useState("");
    return(
        <StyledForm
              onSubmit={ async (event) => {
                  event.preventDefault();
                  createURL(page, short)
                      .then((e)=> setCreated(e))
                      .catch(error => console.log(error));
              }

              }>
            <StyledDiv>
                <StyledInput
                    placeholder="full link"
                    value={page}
                    onChange={(e) => setPage(e.target.value)} //create a textbox that updates title
                />
                <StyledInput
                    placeholder="shortened link"
                    value={short}
                    onChange={(e) => setShort(e.target.value)}
                />
            </StyledDiv>

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

        </StyledForm>
    )
}