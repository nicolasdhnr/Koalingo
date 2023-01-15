import React, { useContext } from "react";
import { AuthContext } from "../App";

export default function WordsList() {
  const { allWords, setAllWords } = useContext(AuthContext);

  const handleDelete = (WordIdToRemove) => {
    setAllWords((prev) => prev.filter(
      (Word) => Word.id !== WordIdToRemove
    ));
  };
  return (
    <ul ul class="wordList">
      {allWords.map(({ title, id }) => (
        <li li class="wordList"
            key={id}>
            <h2>{title}</h2>
            <button class = "btn" onClick={() => handleDelete(id)}>
              <div>X</div>
            </button>
          {/* {!description ? null : <p>{description}</p>} */}
        </li>
      ))}
    </ul>
  );
}
