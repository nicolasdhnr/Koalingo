import React, { useContext } from "react";
import { AuthContext } from '../App';
import { checkIfWordIsAvailable } from "../pages/host/host_logic";
import stylesNewWord from "./newWord.module.css";

/**
 * New Word Component to allow hosts to add new words to the word list
 * @param {object} props - contains className object to provide styling 
 * @returns {JSX.Element}
 */
export default function NewWord({ className }) {
  const { newWord, allWords, setAllWords, setNewWord } = useContext(AuthContext);

  // Extract the value from the input field and update the state
  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setNewWord((prev) => ({ id: Date.now(), [name]: value }));  // removed ...prev, add back if breaks, only matters for desc
    console.log(newWord);
    console.log(allWords);
  };

  // Check if word is on firebase, if it is, add to and update word list state
  const onClickAddWord = async (event) => {
    event.preventDefault();  // prevent page refresh
    if (await checkIfWordIsAvailable(newWord.title)) {
      if (!newWord.title) return;
      setAllWords((prev) => [newWord, ...prev]);
      setNewWord({});
      return;
    }
    // Handle missing word case
    alert("This word had not yet been animated! Please consult our list of words.")
    return;
  };

  return (
    <div className={stylesNewWord.wrapper}>
      <input
        className={stylesNewWord.input}
        name="title"
        placeholder="Enter Word Here: "
        value={newWord.title || ""}
        onChange={handleChange}
      />
      <button className={stylesNewWord.button} onClick={onClickAddWord}>Add</button>
    </div>
  );
}