import "./App.css";
import { useState } from "react";
//import { Pokemon } from "./source.js";
import { generateOutput } from "./source.js";
//import { getSpeciesName } from "./source.js";
import { getPokemonFromList } from "./source.js";
import { getPokemonFromImportable } from "./source.js";

function App() {
  const [list, setList] = useState([]);
  const [options, setOptions] = useState({
    mode: "set",
    iv: 31,
    ev: 252,
    nature: 1.1,
    speedStage: 1,
    level: 100,
  });
  return (
    <div className="App">
      <header className="App-header">
        <h1>Options</h1>
        <ImportOptionsToolbar options={options} setOptions={setOptions} />
        <h1>Enter sets here...</h1>
        <TextEntryBox list={list} setList={setList} options={options} />
        <h1>Added Pokemon:</h1>
        {list.map((pokemon, idx) => {
          return (
            <img
              src={`https://www.smogon.com/forums//media/minisprites/${pokemon.encodeName()}.png`}
              alt={pokemon.name}
            />
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

function ImportOptionsToolbar({ options, setOptions }) {
  return (
    <form>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, mode: e.target.value })}
        id="importType"
        name="importType"
        value="bulk"
      />
      <label for="importType">Bulk Import</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, mode: e.target.value })}
        id="importType"
        name="importType"
        value="set"
      />
      <label for="importType">Set Import</label>
      <br />
      {/*       <input
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
        onChange={setOptions({ ...options, iv: 31, ev: 252, nature: 1.0 })}
        id="speedSettings"
        name="speedSettings"
        value="Neutral Nature"
      />
      <label for="speedSettings">Neutral Nature</label>
      <br /> */}
      <br />
      <label for="level">Level: </label>
      <input
        type="text"
        size="3"
        onChange={(e) => setOptions({ ...options, level: e.target.value })}
        id="level"
        name="level"
      />
      <br />
      <p>Speed stage:</p>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
        id="speedStage"
        name="speedStage"
        value="1"
      />
      <label for="speedStage">0</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
        id="speedStage"
        name="speedStage"
        value="1.5"
      />
      <label for="speedStage">+1</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
        id="speedStage"
        name="speedStage"
        value="2"
      />
      <label for="speedStage">+2</label>
    </form>
  );
}

function TextEntryBox({ list, setList, options }) {
  const [text, setText] = useState("Enter your set(s) here...");
  const [output, setOutput] = useState("BBCode will appear here...");

  async function addClick() {
    //add if/else to check if the mode is Bulk or Set
    //if bulk, get the list from the input textbox, generate a pokemon list, then add that list to the list.
    //
    //if set, get set from input textbox and add it to the list.
    var pokemon;
    if (options.mode === "set") {
      pokemon = await getPokemonFromImportable(text, options);
      if (pokemon != null) {
        setList((list) => [...list, pokemon]);
      } else {
        alert(
          "Invalid input. Input should be a single importable Pokemon Showdown set."
        );
      }
    } else {
      pokemon = await getPokemonFromList(text, options);
      if (pokemon != null) {
        setList(list.concat(pokemon));
      } else {
        alert(
          "Invalid input. Input should be a list of Pokemon seperated by commas (ex. Abra,Porygon,Cacnea)"
        );
      }
    }
  }
  function generateClick() {
    //get list of pokemon from useState
    //generate BBCode and set as output text
    setOutput(generateOutput(list));
    //console.log(list);
  }

  function clearList() {
    setList([]);
  }

  return (
    <>
      <textarea
        id="textInput"
        name="textInput"
        rows="10"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <textarea
        id="textOutput"
        name="textOutput"
        rows="10"
        cols="50"
        value={output}
      ></textarea>
      <br />
      <button onClick={addClick}>Add to list</button>
      <button onClick={clearList}>Clear list</button>
      <button onClick={generateClick}>Generate speed tier list</button>
    </>
  );
}

export default App;
