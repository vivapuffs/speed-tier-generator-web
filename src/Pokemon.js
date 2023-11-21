import Dialog from "@mui/material/Dialog";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { duplicateFilter } from "./source.js";

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
  const { onClose, open, pokemon, list, setList } = props;

  const handleClose = () => {
    onClose();
  };

  const handleDeletion = (value) => {
    if (
      window.confirm(
        "Are you sure you want to remove this Pokemon from the list?"
      )
    ) {
      //console.log(list);
      //this is so ugly
      var result = list.filter((listPokemon) =>
        duplicateFilter(listPokemon, pokemon)
      );
      //console.log(result);
      setList(result);
    }
    onClose(value);
  };

  const handleSave = (values) => {
    //get values
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
              defaultValue={pokemon.level === 0 ? "unknown" : pokemon.level}
            ></input>
          </span>
          <span>
            EVs:{" "}
            <input
              type="text"
              id="ev"
              size="3"
              defaultValue={pokemon.ev}
            ></input>
          </span>
          <span>
            IV:{" "}
            <input
              type="text"
              id="iv"
              size="3"
              defaultValue={pokemon.iv}
            ></input>
          </span>
          <span>
            Nature:{" "}
            <select
              id="nature"
              defaultValue={
                pokemon.nature === 1.1
                  ? "Positive"
                  : pokemon.nature === 1
                  ? "Neutral"
                  : "Negative"
              }
            >
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
          </span>
          <span>Base Speed: {pokemon.baseSpeed}</span>
          <span>Calculated Speed: {pokemon.calculatedSpeed}</span>
          <span>
            <center>
              <button onClick={handleSave}>Save</button>
              <div class="divider" />
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
