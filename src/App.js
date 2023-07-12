import logo from "./logo.svg";
//import "./App.css";
import { useState } from "react";
import { Pokemon } from "./source.js";
import { getSpeciesName } from "./source.js";
import { calculateSpeed } from "./source.js";
import { getPokemonBaseSpeed } from "./source.js";
import { getPokemonFromImportable } from "./source.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Options</h1>
        <ImportOptionsToolbar />
        <h1>Enter sets here...</h1>
        <TextEntryBox />
      </header>
    </div>
  );
}

function testFunction() {
  var pokemon = Pokemon();
}

function ImportOptionsToolbar() {
  const [mode, setMode] = useState("Set Import");
  const [speedSettings, setspeedSettings] = useState([31, 252, 1.1]); //iv, ev, boosting nature
  const [speedStage, setspeedStage] = useState("1");
  const [level, setLevel] = useState("100");

  return (
    <form>
      <input
        type="radio"
        id="importType"
        name="importType"
        value="Bulk Import"
      />
      <label for="importType">Bulk Import</label>
      <input
        type="radio"
        id="importType"
        name="importType"
        value="Set Import"
      />
      <label for="importType">Set Import</label>
      <br />
      <input
        type="radio"
        id="speedSettings"
        name="speedSettings"
        value="Max Speed + Nature"
      />
      <label for="speedSettings">Max Speed + Nature</label>
      <input
        type="radio"
        id="speedSettings"
        name="speedSettings"
        value="Max Speed"
      />
      <label for="speedSettings">Max Speed</label>
      <input
        type="radio"
        id="speedSettings"
        name="speedSettings"
        value="Neutral Nature"
      />
      <label for="speedSettings">Neutral Nature</label>
      <br />
      <input type="radio" id="speedStage" name="speedStage" value="1" />
      <label for="speedStage">0</label>
      <input type="radio" id="speedStage" name="speedStage" value="1.5" />
      <label for="speedStage">+1</label>
      <input type="radio" id="speedStage" name="speedStage" value="2" />
      <label for="speedStage">+2</label>
      <br />
      <label for="level">Level:</label>
      <input type="text" id="level" name="level" />
    </form>
  );
}

function TextEntryBox() {
  const [text, setText] = useState("Enter your set(s) here...");
  const [output, setOutput] = useState("BBCode will appear here...");
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <textarea id="textOutput" name="textOutput" rows="10" cols="50">
        {output}
      </textarea>
      <br />
      <button onClick={() => setOutput(getPokemonFromImportable({ text }))}>
        Process input
      </button>
    </>
  );
}

function PokemonList() {}

export default App;
