import React, { useContext } from "react";
import { AuthContext } from "../App";
import stylesList from '../components/list_styles.css';

// The component for the Progress Tracker page.
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
        <li
        key={title}>
            {title}
          {/* {!description ? null : <p>{description}</p>} */}
        </li>
      ))}
    </ul>
  );
}
