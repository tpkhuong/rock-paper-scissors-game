import React, { useState, useEffect } from "react";
import PlayerSelections from "../Selections/index";
import { cachedData } from "../../utils/dataStorage";
import Battle from "../Battle/index";
import Results from "../Results/index";
import Signs from "../SignChoices/index";
import PickedSign from "../PickedSign/index";
import "../../styles.css";

function SelectBattleWrapper(props) {
  const [stateObj, playerHousePickState] = useState({
    playerPick: "",
    housePick: "",
  });

  const renderPlayerPicked = playerPickedBind.bind({
    stateObj,
    playerHousePickState,
  });

  return (
    <React.Fragment>
      <PlayerSelections funcBind={renderPlayerPicked}>
        <div className="selections-top-wrapper">
          <Signs stepAttr="selections" picSrc="paper" />
          <Signs stepAttr="selections" picSrc="scissor" />
        </div>
        <div className="selections-bottom-wrapper">
          <Signs stepAttr="selections" picSrc="rock" />
        </div>
      </PlayerSelections>

      <Battle>
        <PickedSign
          signSelector="player"
          passedSrc={stateObj.playerPick}
        ></PickedSign>
        <PickedSign
          fadeBoolead="false"
          signSelector="house"
          passedSrc={stateObj.housePick}
        ></PickedSign>
        <Results />
      </Battle>
    </React.Fragment>
  );
}

function playerPickedBind(event) {
  // this func runs/called/execute when use select a sign in selection wrapper
  const resultWrapperElement = document.querySelector(".results-wrapper");
  const selectionsContainer = document.querySelector(".selections-wrapper");
  const housePickedSign = document.querySelector(".house-picked");
  const battleWrapper = document.querySelector(".battle-wrapper");
  const dynamicTextElement = document.querySelector(".result-dynamic-text");
  const scoreDigitElement = document.querySelector(".score-digit");
  const assistiveTextContainer = document.querySelector(".assistive-text");
  const playAgainBtn = document.querySelector(".reset-game");
  const instructionsElement = document.querySelector(".keyboard-instructions");
  instructionsElement.setAttribute("data-hide-instructions", "true");

  selectionsContainer.setAttribute("data-hide", "true");

  battleWrapper.setAttribute("data-start-battle", "true");
  console.log(event.target.closest("BUTTON"));
  const signProp = event.target.closest("BUTTON")
    ? event.target.closest("BUTTON").getAttribute("data-selector")
    : "paper";

  const houseSelection = housePickedSignHelper(cachedData);
  this.playerHousePickState({
    ...this.stateObj,
    playerPick: signProp,
    housePick: houseSelection,
  });

  assistiveTextContainer.innerText = `Player selected ${signProp}. House selected ${houseSelection}`;
  setTimeout(() => {
    housePickedSign.setAttribute("data-fade", "true");
  }, 2800);

  selectionsContainer.removeEventListener("keyup", cachedData.removeEvent);

  setTimeout(() => {
    resultsAlgorithm(
      resultWrapperElement,
      dynamicTextElement,
      signProp,
      houseSelection,
      scoreDigitElement,
      { assistiveTextContainer, signProp, houseSelection, playAgainBtn }
    );
  }, 3000);
}

function resultsAlgorithm(
  resultWrapper,
  textContentElement,
  playerSelection,
  houseSelection,
  scoreElement,
  assistiveInfoObj
) {
  const scoreStorage = JSON.parse(localStorage.getItem("scoreObj"));

  const winner = battleAlgorithm(playerSelection, houseSelection, cachedData);

  console.log(battleAlgorithm(playerSelection, houseSelection, cachedData));
  // add attr to show box shadow to winning selection

  winner != "TIE"
    ? document
        .querySelector(`.${winner}-picked`)
        .setAttribute("data-winner", "true")
    : null;

  // scoreStorage.score is type number
  // if tie leave score alone,
  // winner == "player" add one
  // winner == "house" subtract one
  winner == "player"
    ? (scoreStorage.score += 1)
    : winner == "house" && scoreStorage.score > 0
    ? (scoreStorage.score -= 1)
    : null;
  // update score value in localStorage
  localStorage.setItem("scoreObj", JSON.stringify(scoreStorage));
  // update UI scoreElement
  scoreElement.innerText = String(scoreStorage.score);
  /**
   * assistive text for screen readers
   * **/

  // winner == "player" => signProp beats houseSelect, YOU WON
  // winner == "house" => houseSelect beats signProp, YOU LOSE
  // winner == "tie" => Both players picked same sign, TIE GAME

  assistiveInfoObj.assistiveTextContainer.innerText =
    winner == "player"
      ? `${assistiveInfoObj.signProp} beats ${assistiveInfoObj.houseSelection}, YOU WON. Score ${scoreStorage.score}`
      : winner == "house"
      ? `${assistiveInfoObj.houseSelection} beats ${assistiveInfoObj.signProp}, YOU LOSE. Score ${scoreStorage.score}`
      : `Both players picked same sign, TIE GAME`;
  // play again text of lose, won or tie
  textContentElement.innerText =
    winner == "player"
      ? "YOU WON"
      : winner == "house"
      ? "YOU LOSE"
      : "TIE GAME";

  resultWrapper.getAttribute("data-battle-results") == "false"
    ? resultWrapper.setAttribute("data-battle-results", "true")
    : null;
  // focus play again btn
  assistiveInfoObj.playAgainBtn.focus();
}

function housePickedSignHelper(data) {
  console.log(data);
  // random number from 0 - 100
  const housePickedIndex = Math.floor(Math.random() * 100);
  const randonHousePickedSign = data.arrayOfRandomSigns[housePickedIndex];
  return randonHousePickedSign;
}

function battleAlgorithm(player, house, dataObj) {
  // paper beats rock
  // rock beats scissor
  // scissor beat paper
  if (player == house) return "TIE";

  return dataObj.battleSelectorObj[player][house];
}

export default SelectBattleWrapper;
