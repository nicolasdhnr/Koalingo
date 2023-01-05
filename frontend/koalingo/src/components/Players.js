import React, { useContext } from "react";
import { AuthContext } from "../App";
import styles from '../components/list_styles.css';


export function PlayerTracking(props) {
  
  return (
  <ul>
  {props?.names.map((title) => (
    <li key={title}>
        <h2> {props.reported} </h2>
        <h2>{title}</h2>
      {/* {!description ? null : <p>{description}</p>} */}
    </li>
  ))}
</ul>
  );

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
