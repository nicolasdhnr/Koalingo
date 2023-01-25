import stylesEnd from "./end.module.css";
import stylesLogin from "../home/login.module.css";
import stylesSelect from "./hostSetSelect.module.css";
import stylesLobby from "./hostLobby.module.css";
import {useContext, useCallback,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Button from "../../components/button/Button";
import { ref, update, remove, onDisconnect, onValue } from "firebase/database";

import { realtimedb } from "../../firebase";

const End = () => {
  const [xp,setXp] = useState(0);
  const navigate = useNavigate();
  const {gamePin} = useContext(AuthContext);
  update(ref(realtimedb, `games/${gamePin}`), { //update the database to go to nextround
    ["quizzState"]: "end"
        });

  const onEndClick = useCallback(() => {
    navigate("/home");
    update(ref(realtimedb, `games/`), { //update the database to go to nextround
      [gamePin]: {}
          });
          
  }, [navigate]);
 

  function countXP(data){
    var nb_players = Object.keys(data.players).length

    var count = 0;
    for (let i =0; i<nb_players;i++){
      for (let j=0;j< 4;j++){
        var player_set =Object.values(data.players)[i];
        count += player_set.Quizz[(j+1).toString()].xp;
      }
      
    }
    return count
  }
  useEffect(() => {
    return onValue(ref(realtimedb, `games/${gamePin}`), (snapshot) => { //listen to change of the database only one time (get its data)
      var data = snapshot.val();
      setXp(countXP(data));
  }, {
      onlyOnce: true,
    });
  }, []);

  return (
    <div className={stylesLogin.loginPage}>
      <img className={stylesSelect.koalingoLogo} alt="" src="../../koalingo_logo.svg" onClick={onEndClick} />
      <h1 className={stylesLobby.gamePin}>Game #{gamePin}</h1> 

      <div className={stylesEnd.mainWrapper}>
        <img className={stylesEnd.trophyIcon} alt="" src="../../trophy@2x.png" />
        <div className={stylesEnd.textWrapper}>
          This Team got {xp} XP! Congratulations!
        </div>
        <Button btnText="End Game" onClick={onEndClick} btnStyle="red" />
      </div>

    </div>
  );
};

export default End;