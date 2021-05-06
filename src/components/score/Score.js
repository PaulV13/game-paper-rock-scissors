import "./Score.css";

function Score({ score }) {
  return (
    <div className="header">
      <img src="./images/logo.svg" alt="" />
      <div className="score">
        <span>SCORE</span>
        <h4>{score}</h4>
      </div>
    </div>
  );
}

export default Score;
