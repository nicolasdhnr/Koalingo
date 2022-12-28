import React, {useContext} from "react";
import styles from './styles.css';
import { WordContext } from "../WordContext";

export default function WordsList() {
  const {allWords, handleDelete} = useContext(WordContext);
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
