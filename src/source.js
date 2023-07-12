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

    //variables for calculating speed
    this.baseSpeed = pokemonBaseSpeed; //the pokemon's base speed stat
    this.iv = pokemonIv; //the ivs to use in pokemon speed calculation
    this.ev = pokemonEv; //the evs to use in pokemon speed calculation
    this.level = pokemonLevel; //the level of the pokemon
    this.nature = pokemonNature; //the pokemon's nature: 0.9 = lowering nature, 1 = neutral nature, 1.1 = raising nature
    this.speedStage = pokemonSpeedStage; //the stat boost (if any) applied to the speed stat: 1 = no boost, 1.5 = +1, 2 = +2

    this.calculatedSpeed = pokemonCalculatedSpeed; //the calculated speed of the pokemon
  }
}

/*export async function createPokemonList(splitPokemon) {
  let pokemonList = [];
  for (let i = 0; i < splitPokemon.length; i++) {
    pokemon = splitPokemon[i];
    var baseSpeed = await getPokemonBaseSpeed(pokemon.toLowerCase()); //TODO
    //sets pokemon up to have max speed investment
    var tempPokemon = new Pokemon(pokemon, baseSpeed, 31, 252, 5, 1.1, 0, 1);
    tempPokemon.calculatedSpeed = calculateSpeed(tempPokemon);
    pokemonList.Add(tempPokemon);
  }
  generateOutput(pokemonList);
  Console.WriteLine("Finished, press any key to exit");
}*/

export async function createPokemonList(pokemon) {
  let pokemonList = [];
  var baseSpeed = await getPokemonBaseSpeed(pokemon.name.toLowerCase());
  //sets pokemon up to have max speed investment
  var tempPokemon = pokemon;
  tempPokemon.calculatedSpeed = calculateSpeed(tempPokemon);
  pokemonList.Add(tempPokemon);

  generateOutput(pokemonList);
  console.log("Finished");
}

//formats the speed tier post and writes it to output.txt
export function generateOutput(pokemonList) {
  var output = "";
  //sort the list by speed value
  pokemonList = pokemonList
    .OrderByDescending((x) => x.calculatedSpeed)
    .ToList();
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

//create a pokemon data object from a smogon importable (note: speed still needs to be calculated)
export function getPokemonFromImportable(importable) {
  //regex statements for capturing pokemon data from importable

  var set = importable.text;
  //set =
  //  "Cacnea @ Sitrus Berry\n Ability: Sand Veil\n  Level: 5\n  EVs: 240 SpA / 236 Spe\n  Timid Nature\n  IVs: 2 Atk / 30 Def / 30 SpA\n  - Bullet Seed\n  - Thunder Punch\n  - Hidden Power [Water]\n  - Spikes";

  const ivRegex = /\w+(?=\s+Spe)/;
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

  if (!ivRegex.test(set)) {
    alert("Invalid input.");
    return null;
  }

  //could be optimized to reduce regex calls
  //check if speed IV is not 31
  if (set.match(ivRegex).length >= 1 && set.match(evRegex) != null) {
    ev = set.match(ivRegex)[0];
  } else if (set.match(ivRegex).length == 1) {
    iv = set.match(ivRegex)[0];
  }
  if (set.match(ivRegex).length >= 2) {
    ev = set.match(ivRegex)[0];
    iv = set.match(ivRegex)[1];
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

  var pokemon = new Pokemon(name, 0, iv, ev, level, convertedNature, 0, 1);
  console.log(pokemon);
  return `[TR][TD]${pokemon.calculatedSpeed}[/TD][TD]:${pokemon.name}:[/TD][TD]${pokemon.name}[/TD][TD]${pokemon.baseSpeed}[/TD][TD]${nature}[/TD][TD]${pokemon.iv}[/TD][TD]${pokemon.ev}[/TD][TD]${pokemon.speedStage}[/TD][/TR]\n`;
  //return pokemon;
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
  //console.log(species);
  species = species.replace("(", "");
  species = species.replace(")", "");
  return species;
}

//calculate a pokemon's speed stat
export function calculateSpeed(pokemon) {
  //formula taken from bulbapedia
  //((((2 * baseSpeed + iv + (ev / 4) * level) / 100) + 5)) * nature;
  var result;
  result = 2 * pokemon.baseSpeed;
  result += pokemon.iv;
  result += pokemon.ev / 4;
  result *= pokemon.level;
  result /= 100;
  result += 5;
  result = Math.Truncate(result);
  result *= pokemon.nature;
  result = Math.Truncate(result);
  return result;
}

//gets a pokemon's base speed by calling pokeAPI
export async function getPokemonBaseSpeed(pokemonName) {
  var speed = 0;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  speed = await response.json.stats[5].base_stat;
  return speed;
}
