// Encapsulates all logic relating to hosting game
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { ref, onValue, set, update, get} from "firebase/database";
import { realtimedb } from "../../firebase";;
import { AuthContext } from "../../App";
import { useContext } from "react";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";


 // Generate the game pin, update the context provider with the gamePin
export const createGamePin = async (user) => {
 const cookies = new Cookies();
 // Look for a cookie that contains the game pin. Do it only when component is mounted
 const gamePin = cookies.get("gamePin") ? cookies.get("gamePin")  : Math.floor(Math.random() * 1000000).toString(); 
 cookies.set("gamePin", gamePin, { path: "/" });
 await createGame(gamePin, user);

 return gamePin;
};

export const updateGameState = async (gamePin, state) => {
  const reference = ref(realtimedb, "games/" + gamePin);
  await update(reference, {
    gameState: state
  });
};

/*
  * Check if the word is available in the database to validate the input from the user.
  * @param {string} gamePin - The game pin
  * @param {string} word - The word to check
  * @return {boolean} - True if the word is available, false otherwise
  */

export const checkIfWordIsAvailable = async (word) => {
  const db = getFirestore();
  const q = query(collection(db, "words"));
  const querySnapshot = await getDocs(q);
  let isAvailable = false;
  querySnapshot.forEach((doc) => {
    if (Object.keys(doc.data()).includes(word)){
      isAvailable = true;
    }
  }
  );
  return isAvailable;
};

export const getAllWords = async () => {
  const db = getFirestore();
  const q = query(collection(db, "words"));
  const querySnapshot = await getDocs(q);
  let words = [];
  querySnapshot.forEach((doc) => {
    words = words.concat(Object.keys(doc.data()));
  }
  );
  return words;
  
};


export const  createGame = async (gamePin, user) => {
    const reference = ref(realtimedb, "games");
    // Create a new game
    await set(reference, {
      [gamePin]: {
        gameState: "lobby",
        words: {"yes" : 0, "better" :0},
        curranswer: 0,
        currquestion: 0,
        timer: 0,
        players: {
            [user.uid]: { name: "host",
                          reported: 0,      
          }

    }}
}

    );
  };









