import React, {useContext} from "react";
import {AuthContext} from '../App';

export default function NewWord() {
  const {newWord, setAllWords, setNewWord} = useContext(AuthContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setNewWord((prev) => ({id: Date.now(), [name]: value }));  // removed ...prev, add back if breaks, only matters for desc
    console.log(newWord);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newWord.title) return;
    setAllWords((prev) => [newWord, ...prev]);
    setNewWord({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="New Word"
        value={newWord.title || ""}
        onChange={handleChange}
      />
      {!newWord.title ? null : (
        <>
          <button type="submit">Add Word</button>
        </>
      )}
    </form>
  );
}