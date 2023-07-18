import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import { useState } from "react";
import TextEntryBox from "./TextEntryBox.js";
import ImportOptionsToolbar from "./ImportOptionsToolbar.js";
import Badge from "@mui/material/Badge";

function App() {
  //so badges show properly
  const speedStageConversionTable = {
    0.5: "-2",
    0.67: "-1",
    1: 0,
    1.5: "+1",
    2: "+2",
  };
  const [list, setList] = useState([]);
  const [options, setOptions] = useState({
    mode: "set",
    iv: 31,
    ev: 252,
    nature: 1.1,
    speedStage: 1,
    level: 100,
    language: "en",
  });
  return (
    <div className="App">
      <header className="App-header">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <h1>Options</h1>
        <ImportOptionsToolbar options={options} setOptions={setOptions} />
        <h1>Enter Pokemon here...</h1>
        <TextEntryBox list={list} setList={setList} options={options} />
        <h1>Added Pokemon:</h1>
        {list.map((pokemon, idx) => {
          return (
            <Badge
              badgeContent={speedStageConversionTable[pokemon.speedStage]}
              color={parseInt(pokemon.speedStage) > 0 ? "success" : "error"}
            >
              <img
                src={`https://www.smogon.com/forums//media/minisprites/${pokemon.encodeName()}.png`}
                alt={pokemon.name}
              />
            </Badge>
          );
        })}
      </header>
      <p>
        by{" "}
        <a href="https://www.smogon.com/forums/members/grape-tylenol.593128/">
          grape tylenol
        </a>
      </p>
    </div>
  );
}

export default App;
