import React from "react";

export default function NewWord({ newWord, handleChange, handleSubmit }) {
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
          {/* <textarea
            name="description"
            placeholder="Details..."
            value={newWord.description || ""}
            onChange={handleChange}
          /> */}
          <button type="submit">Add Word</button>
        </>
      )}
    </form>
  );
}