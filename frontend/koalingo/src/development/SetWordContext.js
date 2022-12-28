import React, { useState } from "react";
import Memorise from "./Memorise";
import NewWord from "./NewWord";
import WordsList from "./WordsList";

export default function SetWordContext({newWord, handleChange, allWords, handleSubmit, handleDelete}) {
  // const [newWord, setNewWord] = useState({});
  // const handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   console.log(name, value);
  //   setNewWord((prev) => ({id: Date.now(), [name]: value }));  // removed ...prev, add back if breaks, only matters for desc
  //   console.log(newWord);
  // };

  // const [allWords, setAllWords] = useState([]);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (!newWord.title) return;
  //   setAllWords((prev) => [newWord, ...prev]);
  //   setNewWord({});
  //   console.log(allWords)
  // };
  // const handleDelete = (WordIdToRemove) => {
  //   setAllWords((prev) => prev.filter(
  //     (Word) => Word.id !== WordIdToRemove
  //   ));
  // };

  return (
    <main>
      <h1>Set your Word List</h1>
      <NewWord
        newWord={newWord}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <WordsList allWords={allWords} handleDelete={handleDelete} />
    </main>
  );
}
