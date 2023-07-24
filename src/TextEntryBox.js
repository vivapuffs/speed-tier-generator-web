import { useState } from "react";
import { generateOutput } from "./source.js";
import { getPokemonFromList } from "./source.js";
import { getPokemonFromImportable } from "./source.js";

export default function TextEntryBox({ list, setList, options }) {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const speedStageConversionTable = {
    0.5: "-2",
    0.67: "-1",
    1: 0,
    1.5: "+1",
    2: "+2",
  };

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
  async function generateClick() {
    //get list of pokemon from useState
    //generate BBCode and set as output text
    setOutput(
      await generateOutput(list, speedStageConversionTable, options.language)
    );
  }

  function clearList() {
    if (window.confirm("Are you sure you want to clear the list?")) {
      setList([]);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(output);
  }

  return (
    <>
      <div>
        <textarea
          id="textInput"
          name="textInput"
          rows="10"
          cols="50"
          placeholder="Enter your set or list of Pokemon here..."
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <br />
        <button onClick={addClick}>Add to list</button>
        <div class="divider" />
        <button onClick={clearList}>Clear list</button>
      </div>

      <div>
        <textarea
          id="textOutput"
          name="textOutput"
          rows="10"
          cols="50"
          placeholder="BBCode will appear here..."
          value={output}
        ></textarea>
        <br />
        <button onClick={generateClick}>
          Generate speed tier list from added Pokemon
        </button>
        <div class="divider" />
        <button onClick={copyToClipboard}>Copy output to clipboard</button>
      </div>
    </>
  );
}
