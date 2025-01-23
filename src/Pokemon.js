import Dialog from "@mui/material/Dialog";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { duplicateFilter } from "./source.js";
import { useId, useState } from 'react';

export default function PokemonDisplay({
  pokemon,
  speedStageConversionTable,
  list,
  setList,
  useState,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Badge
      badgeContent={speedStageConversionTable[pokemon.speedStage]}
      color={parseInt(pokemon.speedStage) > 0 ? "success" : "error"}
    >
      <img
        onClick={handleClickOpen}
        src={`https://www.smogon.com/forums//media/minisprites/${pokemon.encodeName()}.png`}
        alt={pokemon.name}
      />
      <div>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          pokemon={pokemon}
          list={list}
          setList={setList}
        />
      </div>
    </Badge>
  );
}

function SimpleDialog(props) {
  const { onClose, open, pokemon, list, setList} = props;
  const [level, setLevel] = useState(props?.value ?? pokemon.level);
  const [ev, setEVs] = useState(props?.value ?? pokemon.ev);
  const [iv, setIV] = useState(props?.value ?? pokemon.iv);
  const [nature, setNature] = useState(props?.value ?? pokemon.nature);
  const [speedStage, setSpeedStage] = useState(props?.value ?? pokemon.speedStage);

  const handleClose = () => {
    setLevel(pokemon.level);
    setEVs(pokemon.ev);
    setIV(pokemon.iv);
    setNature(pokemon.nature);
    setSpeedStage(pokemon.speedStage);
    onClose();
  };

  const handleSave = () => {
    pokemon.level = level;
    pokemon.ev = ev;
    pokemon.iv = iv;
    pokemon.nature = nature;
    pokemon.speedStage = speedStage;
    pokemon.calculateSpeed();
    onClose();
  };

  const handleDeletion = (value) => {
    if (
      window.confirm(
        "Are you sure you want to remove this Pokemon from the list?"
      )
    ) {
      //this is so ugly
      var result = list.filter((listPokemon) =>
        duplicateFilter(listPokemon, pokemon)
      );
      setList(result);
    }
    onClose(value);
  };

  //PaperProps removes the ugly drop shadow from the Pokemon dialog
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        elevation: 0,
        sx: {
          border: "solid 1px gray",
        },
      }}
    >
      <div className="pokemonPopUp">
        <div
          style={{
            textAlign: "right",
            color: "#ababab",
            fontWeight: "bold",
            cursor: "default",
            width: "100%",
          }}
          onClick={handleClose}
        >
          🞪
        </div>
        <br />
        <Stack spacing={1}>
          <span>
            <img
              width="40"
              height="30"
              src={`https://www.smogon.com/forums//media/minisprites/${pokemon.encodeName()}.png`}
              alt={pokemon.name}
              style={{ float: "left" }}
            />{" "}
            {pokemon.name}
          </span>
          <span>
            Level:{" "}
            <input
              type="text"
              id="level"
              size="3"
              onInput={e => setLevel(e.target.value)}
              value={level}
              placeholder={pokemon.level}
            ></input>
          </span>
          <span>
            EVs:{" "}
            <input
              type="text"
              id="ev"
              size="3"
              onInput={e => setEVs(e.target.value)}
              value={ev}
            ></input>
          </span>
          <span>
            IV:{" "}
            <input
              type="text"
              id="iv"
              size="3"
              onInput={e => setIV(e.target.value)}
              value={iv}
            ></input>
          </span>
          <span>
            Nature:{" "}
            <select
              id="nature"
              onInput={e => setNature(e.target.value)}
              value={nature}
            >              
              <option value="1.1">Positive</option>
              <option value="1">Neutral</option>
              <option value="0.9">Negative</option>
            </select>
          </span>
          <span>
            Speed stage:{" "}
            <select
              id="speedStage"
              onInput={e => setSpeedStage(e.target.value)}
              value={speedStage}
            >              
              <option value="2">+2</option>
              <option value="1.5">+1</option>
              <option value="1">0</option>
              <option value="0.67">-1</option>
              <option value="0.5">-2</option>
            </select>
          </span>
          <span>Base Speed: {pokemon.baseSpeed}</span>
          <span>Calculated Speed: {pokemon.calculatedSpeed}</span>
          <span>
            <center>
              <button onClick={handleSave}>Save</button>
              <div className="divider" />
              <button
                style={{
                  color: "white",
                  backgroundColor: "#f44336",
                  borderStyle: "solid",
                  borderColor: "#f44336",
                }}
                onClick={handleDeletion}
              >
                Delete
              </button>
            </center>
          </span>
        </Stack>
      </div>
    </Dialog>
  );
}


