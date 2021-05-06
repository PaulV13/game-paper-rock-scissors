import { useState } from "react";
import Score from "./components/score/Score";
import Currency from "./components/currency/Currency";

import "./App.css";
import Button from "./components/button/Button";

function App() {
  const [rules, setRules] = useState("none");
  const [play, setPlay] = useState(false);
  const [pickUser, setPickUser] = useState({});
  const [pickIA, setPickIA] = useState({});
  const [win, setWin] = useState("");
  const [showWin, setShowWin] = useState(false);
  const [score, setScore] = useState(0);

  const elementos = [
    { name: "rock", color: "#e0405c", shadow: "#9d1636" },
    { name: "paper", color: "#516bf4", shadow: "#2944c5" },
    { name: "scissors", color: "#efa329", shadow: "#cd6818" },
  ];

  const pick = async ({ name, shadow, color }) => {
    setPlay(true);

    const picker = {
      name,
      color,
      shadow,
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
          setScore(score + 1);
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
    setRules("flex");
  };

  const handleCloseRules = () => {
    setRules("none");
  };

  const handlePlayAgain = () => {
    setPlay(false);
    setShowWin(false);
  };

  return (
    <div className="App">
      <div
        className="rules"
        style={{
          display: `${rules}`,
        }}
      >
        <h2>RULES</h2>
        <img className="img-rules" src="./images/image-rules.svg" alt="" />
        <img
          className="img-close"
          src="./images/icon-close.svg"
          alt=""
          onClick={handleCloseRules}
          style={{ cursor: "pointer" }}
        />
      </div>
      <>
        <Score score={score} />
        {play ? (
          <div className="options">
            <div className="options-currency">
              <div>
                <Currency
                  color={pickUser.color}
                  shadow={pickUser.shadow}
                  name={pickUser.name}
                  pick={pick}
                  style={{
                    border: `15px solid ${pickUser.color}`,
                    boxShadow: `0 5px 0 ${pickUser.shadow}`,
                  }}
                />
                <h5>YOU PICKED</h5>
              </div>
              <div>
                <Currency
                  color={pickIA.color}
                  shadow={pickIA.shadow}
                  name={pickIA.name}
                  pick={pick}
                  style={{
                    border: `15px solid ${pickIA.color}`,
                    boxShadow: `0 5px 0 ${pickIA.shadow}`,
                  }}
                />
                <h5>THE HOUSE PICKED</h5>
              </div>
            </div>
            {showWin ? (
              <div>
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
          </div>
        ) : (
          <div className="options">
            <div
              className="options-currency"
              style={{
                backgroundImage: "url(./images/bg-triangle.svg)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center 60%",
              }}
            >
              <Currency
                color="#516bf4"
                shadow="#2944c5"
                name="paper"
                pick={pick}
                style={{
                  border: `15px solid #516bf4`,
                  boxShadow: `0 5px 0 #2944c5`,
                }}
              />
              <Currency
                color="#efa329"
                shadow="#cd6818"
                name="scissors"
                pick={pick}
                style={{
                  border: `15px solid #efa329`,
                  boxShadow: `0 5px 0 #cd6818`,
                }}
              />
              <Currency
                color="#e0405c"
                shadow="#9d1636"
                name="rock"
                pick={pick}
                style={{
                  border: `15px solid #e0405c`,
                  boxShadow: `0 5px 0 #9d1636`,
                }}
              />
            </div>
          </div>
        )}
        <div className="btn-rules">
          <Button className="rules-btn" text="RULES" onClick={handleRules} />
        </div>
      </>
    </div>
  );
}

export default App;
