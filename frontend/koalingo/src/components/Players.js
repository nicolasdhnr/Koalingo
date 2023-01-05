import React, { useContext } from "react";
import { AuthContext } from "../App";
import styles from '../components/list_styles.css';


export function PlayerTracking(props) {
  <ul>
  {props?.players.map((title, score) => (
    <li key={title}>
        <h2>{score} {title}</h2>
      {/* {!description ? null : <p>{description}</p>} */}
    </li>
  ))}
</ul>

}



export default function PlayerList(props) {

  return (
    <ul>
      {props?.players.map((title) => (
        <li key={title}>
            <h2>{title}</h2>
          {/* {!description ? null : <p>{description}</p>} */}
        </li>
      ))}
    </ul>
  );
}
