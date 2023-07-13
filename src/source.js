//class for storing pokemon data
export class Pokemon {
  constructor(
    pokemonName,
    pokemonBaseSpeed,
    pokemonIv,
    pokemonEv,
    pokemonLevel,
    pokemonNature,
    pokemonCalculatedSpeed,
    pokemonSpeedStage
  ) {
    this.name = pokemonName; //species of Pokemon
    this.dexNo = 0; //dex number (for getting minisprite)

    //variables for calculating speed
    this.baseSpeed = parseInt(pokemonBaseSpeed); //the pokemon's base speed stat
    this.iv = parseInt(pokemonIv); //the ivs to use in pokemon speed calculation
    this.ev = parseInt(pokemonEv); //the evs to use in pokemon speed calculation
    this.level = parseInt(pokemonLevel); //the level of the pokemon
    this.nature = pokemonNature; //the pokemon's nature: 0.9 = lowering nature, 1 = neutral nature, 1.1 = raising nature
    this.speedStage = parseInt(pokemonSpeedStage); //the stat boost (if any) applied to the speed stat: 1 = no boost, 1.5 = +1, 2 = +2

    this.calculatedSpeed = parseInt(pokemonCalculatedSpeed); //the calculated speed of the pokemon
  }

  getBaseSpeed = async function () {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.name.toLowerCase()}`
    );
    this.baseSpeed = parseInt((await response.json()).stats[5].base_stat);
  };

  getNo = async function () {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.name.toLowerCase()}`
    );
    this.dexNo = parseInt((await response.json()).id);
  };

  //calculate the base speed stat
  calculateSpeed = function () {
    //formula taken from bulbapedia
    //((((2 * baseSpeed + iv + (ev / 4) * level) / 100) + 5)) * nature;
    var result;
    result = 2 * this.baseSpeed;
    result += this.iv;
    result += this.ev / 4;
    result *= this.level;
    result /= 100;
    result += 5;
    result = Math.floor(result);
    result *= this.nature;
    result = Math.floor(result);
    result *= this.speedStage;
    result = Math.floor(result);
    this.calculatedSpeed = result;
  };

  calculateOldGenSpeed = function () {
    var result;
    result = this.baseSpeed + this.iv;
    result *= 2;
    result += Math.sqrt(this.ev) / 4;
    result *= this.level;
    result /= 100;
    result += 5;
    this.calculatedSpeed = result;
  };
}

/* export async function createPokemonList(pokemon) {
  let pokemonList = [];
  //sets pokemon up to have max speed investment
  var tempPokemon = pokemon;
  tempPokemon.calculatedSpeed = calculateSpeed(tempPokemon);
  pokemonList.Add(tempPokemon);

  generateOutput(pokemonList);
} */

//formats the speed tier post and writes it to output.txt
export function generateOutput(pokemonList) {
  var output = "";
  //sort the list by speed value
  console.log(pokemonList);
  pokemonList = pokemonList.sort(
    (a, b) => b.calculatedSpeed - a.calculatedSpeed
  );
  console.log(pokemonList);
  var currentSpeed = 0;
  //write the start of the table
  output +=
    "[TABLE][TR][TH]Speed[/TH][TH]Sprite[/TH][TH]Pokemon[/TH][TH]Base[/TH][TH]Nature[/TH][TH]IVs[/TH][TH]EVs[/TH][TH]±[/TH][/TR]\n";

  for (let i = 0; i < pokemonList.length; i++) {
    var pokemon = pokemonList[i];
    //get current speed
    //check if its the same as last speed
    if (currentSpeed != pokemon.calculatedSpeed) {
      output += "\n";

      var nature =
        pokemon.nature == 1.1
          ? "Positive"
          : pokemon.nature == 1
          ? "Neutral"
          : "Negative";
      var speedStage =
        pokemon.speedStage == 1 ? 0 : pokemon.speedStage == 1.5 ? 1 : 2;

      //basic line for now, can be improved to add multiple pokemon on one line.
      output += `[TR][TD]${pokemon.calculatedSpeed}[/TD][TD]:${pokemon.name}:[/TD][TD]${pokemon.name}[/TD][TD]${pokemon.baseSpeed}[/TD][TD]${nature}[/TD][TD]${pokemon.iv}[/TD][TD]${pokemon.ev}[/TD][TD]${speedStage}[/TD][/TR]\n`;
    }
    currentSpeed = pokemon.calculatedSpeed;
  }
  output += "[/TABLE]";
  return output;
}

export async function getPokemonFromList(input) {
  //for bulk import option
  //read level, iv, ev, nature, and speedstage from user selected options
  //generate a list of pokemon accordingly
}

//create a pokemon data object from a smogon importable (note: speed still needs to be calculated)
export async function getPokemonFromImportable(importable, options) {
  //regex statements for capturing pokemon data from importable

  var set = importable;

  const ivRegex = /\w+(?=\s+Spe)/g;
  //lazy solution
  const evRegex = /(EVs:)/;
  const levelRegex = /(?<=Level: )[0-9]+/g;
  const natureRegex = /\w+(?= Nature)/g;

  var iv = 31;
  var ev = 0;
  var level = 100;

  //need to parse name from first line
  var speciesString = set.split("\n")[0];
  var name = getSpeciesName(speciesString);

  if (!natureRegex.test(set)) {
    alert("Invalid input.");
    return null;
  }

  //could be optimized to reduce regex calls

  //check if speed IV is not 31, and for speed EVs
  if (ivRegex.test(set)) {
    if (set.match(ivRegex).length >= 1 && set.match(evRegex) != null) {
      var matches = set.match(ivRegex);
      ev = set.match(ivRegex)[0];
    } else if (set.match(ivRegex).length == 1) {
      iv = set.match(ivRegex)[0];
    }
    if (set.match(ivRegex).length >= 2) {
      ev = set.match(ivRegex)[0];
      iv = set.match(ivRegex)[1];
    }
  }

  if (set.match(levelRegex) != null) {
    level = set.match(levelRegex)[0];
  }

  var nature = set.match(natureRegex)[0];
  var convertedNature = 1;
  switch (nature) {
    case "Timid":
    case "Hasty":
    case "Jolly":
    case "Naive":
      convertedNature = 1.1;
      break;
    case "Brave":
    case "Relaxed":
    case "Quiet":
    case "Sassy":
      convertedNature = 0.9;
      break;
  }

  var pokemon = new Pokemon(
    name,
    0,
    iv,
    ev,
    level,
    convertedNature,
    0,
    parseInt(options.speedStage)
  );
  await pokemon.getBaseSpeed();
  await pokemon.getNo();
  await pokemon.calculateSpeed();
  //return `[TR][TD]${pokemon.calculatedSpeed}[/TD][TD]:${pokemon.name}:[/TD][TD]${pokemon.name}[/TD][TD]${pokemon.baseSpeed}[/TD][TD]${nature}[/TD][TD]${pokemon.iv}[/TD][TD]${pokemon.ev}[/TD][TD]${pokemon.speedStage}[/TD][/TR]\n`;
  return pokemon;
}

//function that parses the species from the first line of the importable
//works as expected after port
export function getSpeciesName(speciesString) {
  var species = speciesString;
  var bracketRegex = /\(([^()]*)\)/g;
  //if there are no brackets in the string, great! the species is the first word in the line
  if (!bracketRegex.test(species)) {
    species = species.split(" ")[0];
  } //ok... now things are a bit more annoying
  else {
    species = species.replace("(M)", "");
    species = species.replace("(F)", "");
    //now check if there is more than 1 match for brackets
    if (species.match(bracketRegex).length > 1) {
      var index = species.match(bracketRegex).length - 1;
      species = species.match(bracketRegex)[index];
    } //if there's only 1 match for the brackets, then that is the species name
    else {
      species = species.match(bracketRegex)[0];
    }
  }
  //check if var has a ( or ) and remove them
  species = species.replace("(", "");
  species = species.replace(")", "");
  return species;
}
