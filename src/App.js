import { useState } from "react";
import Score from "./components/score/Score";
import Currency from "./components/currency/Currency";

import "./App.css";
import Button from "./components/button/Button";
import Rules from "./components/gameRules/Rules";

function App() {
  const [rules, setRules] = useState("rules-none");
  const [play, setPlay] = useState(false);
  const [pickUser, setPickUser] = useState({});
  const [pickIA, setPickIA] = useState({});
  const [win, setWin] = useState("");
  const [showWin, setShowWin] = useState(false);
  const [score, setScore] = useState(0);

  const elementos = [
    { name: "rock", className: "currency-red" },
    { name: "paper", className: "currency-blue" },
    { name: "scissors", className: "currency-orange" },
  ];

  const pick = async ({ name, className }) => {
    setPlay(true);

    const picker = {
      name,
      className,
    };

    setPickUser(picker);
    const housePick = await iaPick();
    const result = gameLogic(housePick, picker);
    setShowWin(true);
    setWin(result);
  };

  const iaPick = () => {
    return new Promise((resolve, reject) => {
      let housePick;
      const interval = setInterval(() => {
        housePick = elementos[getRandomInt(0, 3)];
        setPickIA(housePick);
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        resolve(housePick);
      }, 2000);
    });
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const gameLogic = (housePick, picker) => {
    if (housePick.name === picker.name) {
      return "DRAW";
    }
    if (picker.name === "paper") {
      if (housePick.name === "rock") {
        setScore(score + 1);
        return "WIN";
      }
      if (housePick.name === "scissors") {
        if (score > 0) {
          setScore(score - 1);
        }
        return "LOSE";
      }
    }
    if (picker.name === "rock") {
      if (housePick.name === "paper") {
        if (score > 0) {
          setScore(score - 1);
        }
        return "LOSE";
      }
      if (housePick.name === "scissors") {
        setScore(score + 1);
        return "WIN";
      }
    }
    if (picker.name === "scissors") {
      if (housePick.name === "rock") {
        if (score > 0) {
          setScore(score - 1);
        }
        return "LOSE";
      }
      if (housePick.name === "paper") {
        setScore(score + 1);
        return "WIN";
      }
    }
  };

  const handleRules = () => {
    setRules("rules-flex");
  };

  const handleCloseRules = () => {
    setRules("rules-none");
  };

  const handlePlayAgain = () => {
    setPlay(false);
    setShowWin(false);
  };

  return (
    <div className="App">
      <Rules className={rules} onClick={handleCloseRules} />
      <>
        <Score score={score} />
        {play ? (
          <section>
            <div className="options-currency">
              <section>
                <Currency
                  className={pickUser.className}
                  name={pickUser.name}
                  pick={pick}
                />
                <h5>YOU PICKED</h5>
              </section>
              <section>
                <Currency
                  className={pickIA.className}
                  name={pickIA.name}
                  pick={pick}
                />
                <h5>THE HOUSE PICKED</h5>
              </section>
            </div>
            {showWin ? (
              <div className="box-result">
                <h1>YOU {win}</h1>
                <Button
                  className="play-again"
                  text="PLAY AGAIN"
                  onClick={handlePlayAgain}
                />
              </div>
            ) : (
              ""
            )}
          </section>
        ) : (
          <section>
            <div id="option-currency-triangle" className="options-currency">
              <Currency className="currency-blue" name="paper" pick={pick} />
              <Currency
                className="currency-orange"
                name="scissors"
                pick={pick}
              />
              <Currency className="currency-red" name="rock" pick={pick} />
            </div>
          </section>
        )}
        <div className="rules-btn">
          <Button className="btn-rules" text="RULES" onClick={handleRules} />
        </div>
      </>
    </div>
  );
}

export default App;
