import Dialog from "@mui/material/Dialog";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

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

function duplicateFilter(x, y) {
  if (x.name === y.name) {
    if (x.calculatedSpeed === y.calculatedSpeed) {
      if (x.ev === y.ev) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
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
      console.log(list);
      //this is so ugly
      var result = list.filter((listPokemon) =>
        duplicateFilter(listPokemon, pokemon)
      );
      console.log(result);
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
      <div class="pokemonPopUp">
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
          X
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
          <span>Level: {pokemon.level === 0 ? 1 : pokemon.level}</span>
          <span>EVs: {pokemon.ev}</span>
          <span>IV: {pokemon.iv}</span>
          <span>
            Nature:{" "}
            {pokemon.nature === 1.1
              ? "Positive"
              : pokemon.nature === 1
              ? "Neutral"
              : "Negative"}
          </span>
          <span>Base Speed: {pokemon.baseSpeed}</span>
          <span>Calculated Speed: {pokemon.calculatedSpeed}</span>
          <span>
            <center>
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
