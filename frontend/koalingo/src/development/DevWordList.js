import React, {useContext} from "react";
import { AuthContext } from "../App";
import styles from '../components/list_styles.css';
import { WordContext } from "./WordContext";

export default function WordsList() {
  const {allWords, handleDelete} = useContext(AuthContext);
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
