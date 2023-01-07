import { SAMLAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../App";
import stylesList from '../components/list_styles.css';

// The component for the Progress Tracker page.
export function PlayerTracking(props) {
  
  return (
  <ul class="player">
  {props?.names.map((title) => (
    <li class="playerTrack"
        key={title}>
      {title}:
      {' '}
      {props.reported}
      {/* {!description ? null : <p>{description}</p>} */}
    </li>
  ))}
  </ul>
  );

}

export default function PlayerList(props) {

  return (
    <ul ul class="player">
      {props?.players.map((title) => (
        <li class="player"
            key={title}>
          {title}
          {/* {!description ? null : <p>{description}</p>} */}
        </li>
      ))}
    </ul>
  );
}
