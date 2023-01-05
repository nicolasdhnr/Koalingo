// Encapsulates all logic relating to hosting game
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { ref, onValue, set, update} from "firebase/database";
import { realtimedb } from "../../firebase";;
import { AuthContext } from "../../App";
import { useContext } from "react";

/**
 * [bar description]
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */



 // Generate the game pin, update the context provider with the gamePin
export function createGamePin () {
 const cookies = new Cookies();
 // Look for a cookie that contains the game pin. Do it only when component is mounted
 const gamePin = cookies.get("gamePin") ? cookies.get("gamePin")  : Math.floor(Math.random() * 1000000).toString(); 
 cookies.set("gamePin", gamePin, { path: "/" });
 createGame(gamePin);

 return gamePin;

 
}

export function updateGameState(gamePin, gameState) {
  const reference = ref(realtimedb, "games/" + gamePin);
  update(reference, {
    gameState: gameState,
  });
}

export function createGame(gamePin) {
    const reference = ref(realtimedb, "games");

    // TODO: Add the host as the first user in the game once the Context takes in the host name
    // Check if game already exists, if it does, do not create a new game
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        if (data[gamePin]) {
            return;
        }
    });


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
          "player1": {
            "name": "player1",
            "score": 0,},
          "player2": {
            "name": "player2",
            "score": 0},
          "player3": {
            "name": "player4",
            "score": 0},
      },
    }}
    );
  }






