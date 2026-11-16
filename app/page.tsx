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
    return(
        <StyledDiv>
            <h1>Create a shortened URL for any page!</h1>
            <input type="text" value={page} placeholder="original link" onChange={(e) => setPage(e.target.value)}/>
            <input type="text" value={short} placeholder="shortened link" onChange={(e) => setShort(e.target.value)}/>

            <button onClick={createURL(page, short)}>Create link!</button>
        </StyledDiv>
    )
}