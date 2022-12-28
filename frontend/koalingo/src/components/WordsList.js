import React from "react";
import styles from './list_styles.css';
export default function WordsList({ allWords, handleDelete }) {
  return (
    <ul>
      {allWords.map(({ title, id }) => (
        <li key={id}>
          <div>
            <h2>{title}</h2>
            <button onClick={() => handleDelete(id)}>X</button>
          </div>
          {/* {!description ? null : <p>{description}</p>} */}
        </li>
      ))}
    </ul>
  );
}
