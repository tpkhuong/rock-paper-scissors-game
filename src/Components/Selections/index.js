import React, { useEffect } from "react";
import "../../styles.css";
import { cachedData } from "../../utils/dataStorage";

function PlayerSelections(props) {
  const { hideProp, funcBind, children } = props;
  // funcBind is a func we declared in SelectBattleWrapper Component
  useEffect(() => {
    const selectionsWrapper = document.querySelector(".selections-wrapper");
    const paperBtn = document.querySelector("[data-selector='paper']");
    const scissorBtn = document.querySelector("[data-selector='scissor']");
    const rockBtn = document.querySelector("[data-selector='rock']");
    const selectPreviousBtnObj = {
      paper: rockBtn,
      scissor: paperBtn,
      rock: scissorBtn,
    };
    const selectNextBtnObj = {
      paper: scissorBtn,
      scissor: rockBtn,
      rock: paperBtn,
    };

    const arrowKeysMovement = arrowKeysBind.bind({
      selectPreviousBtnObj,
      selectNextBtnObj,
    });
    cachedData.removeEvent = arrowKeysMovement;

    selectionsWrapper.addEventListener("keyup", arrowKeysMovement);
  });
  return (
    <div onClick={funcBind} data-hide="false" className="selections-wrapper">
      {children}
    </div>
  );
}

function arrowKeysBind(event) {
  const signSelectorElement =
    document.activeElement.getAttribute("data-selector");
  if (event.code == "ArrowLeft" || event.code == "ArrowDown") {
    this.selectPreviousBtnObj[signSelectorElement].focus();
  }
  if (event.code == "ArrowRight" || event.code == "ArrowUp") {
    this.selectNextBtnObj[signSelectorElement].focus();
  }
}

export default PlayerSelections;
