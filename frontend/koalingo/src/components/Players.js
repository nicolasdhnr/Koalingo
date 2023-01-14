import { SAMLAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../App";
import stylesList from '../components/list_styles.css';

// The component for the Progress Tracker page.
export function PlayerTracking(props) {
  console.log(props);
  return (
  <ul class="player">
  {props?.names.map((title, index) => (
    <li class="playerTrack"
        key={title}>
      {title}:
      {' '}
      {props.reported[index]}
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

        </li>
      ))}
    </ul>
  );
}
