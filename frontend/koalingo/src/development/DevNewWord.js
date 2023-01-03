import React, {useContext} from "react";
import { WordContext } from "./WordContext";
import {AuthContext} from '../App';

export default function NewWord() {
  const {newWord, handleChange,handleSubmit} = useContext(AuthContext);
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