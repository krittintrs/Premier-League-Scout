import React from "react";
// import SoccerLineUp from "react-soccer-lineup";

const LineUp = () => ({
  squad: {
    gk: {
      number: 1
    },
    df: [{ number: 49 }, { number: 5 }, { number: 19 }, { number: 23 }],
    cdm: [{ number: 39 }, { number: 17 }],
    cam: [
      {
        number: 18
      }
    ],
    fw: [{ number: "ank" }, { number: 7 }, { number: 25 }]
  }
});

const LineUP = () => {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* <SoccerLineUp
        size={"small"}
        color={"lightseagreen"}
        pattern={"lines"}
        homeTeam={LineUp()} // Corrected function call
        awayTeam={LineUp()} // Corrected function call
      /> */}
    </div>
  );
}

export default LineUP;
