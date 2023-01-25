import React, { useEffect } from "react";
import "../../styles.css";
import LogoScore from "../LogoScore/index";
import SelectBattleWrapper from "../SelectBattleWrapper/index";
import RulesButton from "../RulesButton/index";

useLocalStorage();

function App(props) {
  useEffect(() => {
    document.querySelector(".score-digit").innerText = JSON.parse(
      localStorage.getItem("scoreObj")
    ).score;
  });

  return (
    <React.Fragment>
      <div
        aria-live="assertive"
        className="assistive-text visually-hidden"
      ></div>
      <section className="bg-img">
        <div
          tabIndex="0"
          data-hide-instructions="false"
          className="keyboard-instructions"
        >
          <p className="previous-text-instructions">
            <span className="arrow-keys-text">Arrow Up or Right: </span>
            <span className="arrow-keys-instructions">
              Will select next sign button.
            </span>
          </p>
          <p className="next-text-instructions">
            <span className="arrow-keys-text">Arrow Down or Left: </span>
            <span className="arrow-keys-instructions">
              Will select previous sign button.
            </span>
          </p>
        </div>
        <LogoScore />
        {/* selections */}
        <SelectBattleWrapper></SelectBattleWrapper>
        <RulesButton>RULES</RulesButton>
      </section>
    </React.Fragment>
  );
}

function useLocalStorage() {
  if (!localStorage.getItem("scoreObj")) {
    localStorage.setItem("scoreObj", JSON.stringify({ score: 0 }));
  }
}

export default App;
