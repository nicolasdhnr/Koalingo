import stylesEnd from "./end.module.css";
import stylesLogin from "../home/login.module.css";
import stylesSelect from "./hostSetSelect.module.css";
import stylesLobby from "./hostLobby.module.css";
import {useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import Button from "../../components/button/Button";

const End = () => {
  const navigate = useNavigate();
  const {gamePin} = useContext(AuthContext);
  // TODO: Add navigate to home page or replay
  const onEndGameClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onLogoClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <div className={stylesLogin.loginPage}>
      <img className={stylesSelect.koalingoLogo} alt="" src="../../koalingo_logo.svg" onClick={onLogoClick} />
      <h1 className={stylesLobby.gamePin}>Game #{gamePin}</h1> 

      <div className={stylesEnd.mainWrapper}>
        <img className={stylesEnd.trophyIcon} alt="" src="../../trophy@2x.png" />
        <div className={stylesEnd.textWrapper}>
          This Team got x XP! Congratulations!
        </div>
        <Button btnText="End Game" onClick={onEndGameClick} btnStyle="red" />
      </div>

    </div>
  );
};

export default End;
