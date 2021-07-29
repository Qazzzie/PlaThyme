/**
 * @Resources 
 * Vectorized Playing Cards 3.2
 * https://totalnonsense.com/open-source-vector-playing-cards/
 * Copyright 2011,2021 – Chris Aguilar – conjurenation @gmail.com
 * Licensed under: LGPL 3.0 - https://www.gnu.org/licenses/lgpl-3.0.html
 */
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import ToolTip from "../../components/ToolTip";
// import "./Wartable.css";
/**
 * @param {any} socket -- this is the socket object 
 * @returns This function will return ___ 
 */
//Slapjack

//Card images source:
//https://pixabay.com/vectors/atlasnye-deck-playing-cards-game-884206/?download



export default function Slapjacktable({ socket }) {
    const [Jack, setJack] = useState(false);


    // const cardsRef=useRef(null);

    // //card entering from side of screen animation 
    // useEffect(()=> {
        
    //     return () => clearInterval(interval);
    // }, [] )


    const handleSlap = () => {
        socket.emit("game-data", {
            event: "Slap",
        });
    };

    return(
        <div className="grid-container mt-10">
            Slapjack
        </div>
    )
}