// Encapsulates all logic relating to hosting game
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { ref, onValue, set } from "firebase/database";
import { realtimedb } from "../../firebase";;
import { AuthContext } from "../../App";
import { useContext } from "react";

/**
 * [bar description]
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */



 // Generate the game pin, update the context provider with the gamePin
export function createGamePin (user) {
 const cookies = new Cookies();
 // Look for a cookie that contains the game pin. Do it only when component is mounted
 const gamePin = cookies.get("gamePin") ? cookies.get("gamePin")  : Math.floor(Math.random() * 1000000); 
 cookies.set("gamePin", gamePin, { path: "/" });
 createGame(gamePin, user);

 return gamePin;

 
}

export function createGame(gamePin, user) {
    const reference = ref(realtimedb, "games");
    // Create a new game
    set(reference, {
      [gamePin]: {
        gameState: "lobby",
        test: "test",
        host: "host",
        words: {0: "Hello", 1: "Wagwan", 2: "Bonjour"},
        curranswer: 0,
        currquestion: 0,
        timer: 0,
        players: {
            [user.uid]: { name: "host"}

    }}
}

    );
  }






