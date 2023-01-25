import React, { useState, useEffect } from "react";
import "../../styles.css";

function Results(props) {
  return (
    <div data-battle-results="false" className="results-wrapper">
      <span className="result-dynamic-text">PLEHDR</span>
      <button onClick={setValuesToInitial} className="reset-game">
        PLAY AGAIN
      </button>
    </div>
  );
}

function setValuesToInitial() {
  // selecting elements
  const resultWrapperElement = document.querySelector(".results-wrapper");
  const selectionsContainer = document.querySelector(".selections-wrapper");
  const housePickedSign = document.querySelector(".house-picked");
  const battleWrapper = document.querySelector(".battle-wrapper");
  const dynamicTextElement = document.querySelector(".result-dynamic-text");
  const winningPickedElement = document.querySelector("[data-winner='true']");
  const assistiveTextElement = document.querySelector(".assistive-text");
  const paperSelectorBtn = document.querySelector("[data-selector='paper']");
  const instructionsElement = document.querySelector(".keyboard-instructions");
  // assign values
  resultWrapperElement.setAttribute("data-battle-results", "false");
  selectionsContainer.setAttribute("data-hide", "false");
  housePickedSign.setAttribute("data-fade", "false");
  battleWrapper.setAttribute("data-start-battle", "false");
  instructionsElement.setAttribute("data-hide-instructions", "false");
  dynamicTextElement.innerText = "PLEHDR";
  assistiveTextElement.innerText = "";

  winningPickedElement
    ? winningPickedElement.removeAttribute("data-winner")
    : null;
  paperSelectorBtn.focus();
}

export default Results;
