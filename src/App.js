import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import { useState } from "react";
import TextEntryBox from "./TextEntryBox.js";
import PokemonDisplay from "./Pokemon.js";
//import { Pokemon } from "./source.js";
import SetImportOptionsToolbar from "./SetImportOptionsToolbar.js";
import BulkImportOptionsToolbar from "./BulkImportOptionsToolbar.js";
//import { Grid , Box } from '@mui/material';

function App() {
  //var testPokemon = new Pokemon("Mew", 100, 31, 252, 100, 1.1, 328, 1);

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
    <div classame="App">
          <h1>Options</h1>
          <form>
            <input
            type="radio"
            onChange={(e) => setOptions({ ...options, mode: e.target.value })}
            id="importType"
            name="importType"
            value="bulk"
            />
            <label htmlFor="importType">Bulk Import</label>
            <input
              type="radio"
              onChange={(e) => setOptions({ ...options, mode: e.target.value })}
              id="importType"
              name="importType"
              value="set"
              defaultChecked
            />
            <label htmlFor="importType">Set Import</label>
          </form>
          {options.mode === "set" ? <SetImportOptionsToolbar options={options} setOptions={setOptions} /> : null}
          {options.mode === "bulk" ? <BulkImportOptionsToolbar options={options} setOptions={setOptions} /> : null}
        <h1>Enter Pokemon here...</h1>
        <TextEntryBox list={list} setList={setList} options={options} />
        <h1>Added Pokemon:</h1>
        {list.map((pokemon, idx) => {
          return (
            <PokemonDisplay
              pokemon={pokemon}
              speedStageConversionTable={speedStageConversionTable}
              useState={useState}
              list={list}
              setList={setList}
            />
          );
        })}
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
