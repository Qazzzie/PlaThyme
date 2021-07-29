import React from "react";

import Slapjacktable from "./Slapjacktable";

/**
 * @param {socket Object} socket - The socket object used to connect to server. 
 * @returns Drawing board, colour pallet, Timer and Current Word.
 */

export default function Slapjack({ socket }) {
  return (
    <>
      <Slapjacktable socket={socket} />
    </>
  );
}
