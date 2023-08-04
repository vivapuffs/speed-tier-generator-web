//TODOs:
//write function for verifying pokemon name exists instead of copypasting

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
    this.speedStage = parseFloat(pokemonSpeedStage); //the stat boost (if any) applied to the speed stat: 1 = no boost, 1.5 = +1, 2 = +2

    this.calculatedSpeed = parseInt(pokemonCalculatedSpeed); //the calculated speed of the pokemon
  }

  getBaseSpeed = async function () {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.encodeName(this.name)}`
    );
    this.baseSpeed = parseInt((await response.json()).stats[5].base_stat);
  };

  getNo = async function () {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.encodeName(this.name)}`
    );
    this.dexNo = parseInt((await response.json()).id);
  };

  //encode name for use with pokeAPI
  encodeName = function () {
    var encodedName = this.name;
    encodedName = encodedName.toLowerCase();
    //replace " " with -
    encodedName = encodedName.replace(" ", "-");
    //replace "'" with ""
    encodedName = encodedName.replace("’", "");
    //replace ":" with ""
    encodedName = encodedName.replace(":", "");
    //replace "." with ""
    encodedName = encodedName.replace(".", "");
    return encodedName;
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

//formats the speed tier post and writes it to output.txt
export async function generateOutput(
  pokemonList,
  speedStageConversionTable,
  language
) {
  var output = "";
  //sort the list by speed value
  pokemonList = pokemonList.sort(
    (a, b) => b.calculatedSpeed - a.calculatedSpeed
  );
  //write the start of the table
  output +=
    "[TABLE][TR][TH]Speed[/TH][TH]Sprite[/TH][TH]Pokemon[/TH][TH]Base[/TH][TH]Nature[/TH][TH]IVs[/TH][TH]EVs[/TH][TH]±[/TH][/TR]\n";

  for (let i = 0; i < pokemonList.length; i++) {
    var pokemon = pokemonList[i];
    //get current speed
    //check if its the same as last speed
    output += "\n";

    var nature =
      pokemon.nature === 1.1
        ? "Positive"
        : pokemon.nature === 1
        ? "Neutral"
        : "Negative";

    //basic line for now, can be improved to add multiple pokemon on one line.
    output += `[TR][TD]${pokemon.calculatedSpeed}[/TD][TD]:${
      pokemon.name
    }:[/TD][TD]${
      language === "en" ? pokemon.name : await getForeignName(pokemon, language)
    }[/TD][TD]${pokemon.baseSpeed}[/TD][TD]${nature}[/TD][TD]${
      pokemon.iv
    }[/TD][TD]${pokemon.ev}[/TD][TD]${
      speedStageConversionTable[pokemon.speedStage]
    }[/TD][/TR]\n`;
  }
  output += "[/TABLE]";
  return output;
}

//create pokemon data objects based on the provided options
export async function getPokemonFromList(input, options) {
  var pokemonNames = input.split(",");
  var pokemonList = [];
  for (let i = 0; i < pokemonNames.length; i++) {
    var name = pokemonNames[i];

    //check if input is a valid pokemon
    var response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${encodeName(name)}`
    );

    //pokemon/ will return 200, so we also need to check for a blank name
    if (response.status === 200 && name !== "") {
      var pokemon = new Pokemon(
        name,
        0,
        options.iv,
        options.ev,
        options.level,
        options.nature,
        0,
        options.speedStage
      );
      await pokemon.getBaseSpeed();
      await pokemon.getNo();
      await pokemon.calculateSpeed();
      pokemonList.push(pokemon);
    } else {
      console.log("invalid pokemon found in input. skipping");
    }
  }
  return pokemonList;
}

//create a pokemon data object from a smogon importable (note: speed still needs to be calculated)
export async function getPokemonFromImportable(importable, options) {
  //regex statements for capturing pokemon data from importable

  var set = importable;

  const ivRegex = /\d+(?=\s+Spe)/g;
  const levelRegex = /(?<=Level: )[0-9]+/g;
  const natureRegex = /\w+(?= Nature)/g;

  var iv = 31;
  var ev = 0;
  var level = 100;

  try {
    //need to parse name from first line
    var speciesString = set.split("\n")[0];
    var name = getSpeciesName(speciesString);
    //could be optimized to reduce regex calls

    //check if speed IV is not 31, and for speed EVs
    if (ivRegex.test(set)) {
      //if there are specified IVs and EVs, set both
      if (set.match(ivRegex).length >= 2) {
        ev = set.match(ivRegex)[0];
        iv = set.match(ivRegex)[1];
      }
      //if there is only one match, figure out if it's IV or EV
      else if (set.match(ivRegex).length === 1) {
        var splitSet = set.split("\n");
        splitSet.splice(0, 1); //chop off the name to prevent any weird nicknames from interferring with IV/EV detection
        //check if splitSet contains a line with "IVs"
        var IVline = splitSet.find((element) => element.includes("IVs: "));
        if (IVline) {
          //check if the IVs line contains "Spe"
          if (IVline.includes("Spe")) {
            iv = set.match(ivRegex)[0];
          }
          //if it doesn't, the Spe is EVs
          else {
            ev = set.match(ivRegex)[0];
          }
        }
        //if splitSet doesn't have any lines with IVs, the Spe must be EVs
        else {
          ev = set.match(ivRegex)[0];
        }
      }
    }

    if (set.match(levelRegex) != null) {
      level = set.match(levelRegex)[0];
    }

    if (set.match(natureRegex) != null) {
      var nature = set.match(natureRegex)[0];
    }
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
      default:
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
      options.speedStage
    );
    await pokemon.getBaseSpeed();
    await pokemon.getNo();
    await pokemon.calculateSpeed();
    return pokemon;
    //return `[TR][TD]${pokemon.calculatedSpeed}[/TD][TD]:${pokemon.name}:[/TD][TD]${pokemon.name}[/TD][TD]${pokemon.baseSpeed}[/TD][TD]${nature}[/TD][TD]${pokemon.iv}[/TD][TD]${pokemon.ev}[/TD][TD]${pokemon.speedStage}[/TD][/TR]\n`;
  } catch (error) {
    console.log("error parsing set");
    return null;
  }
}

//function that parses the species from the first line of the importable
export function getSpeciesName(speciesString) {
  var species = speciesString;
  var bracketRegex = /\(([^()]*)\)/g;
  //remove gender markers
  species = species.replace("(M)", "");
  species = species.replace("(F)", "");
  //if there are no brackets in the string, great! the species is the first word in the line
  if (!bracketRegex.test(species)) {
    //we split at the "@" sign and not a space because some pokemon have spaces in their names
    //like scream tail
    species = species.split("@")[0];
    species = species.trim();
  } //ok... now things are a bit more annoying
  else {
    //store matches in a variable so we can access them later
    var matches = species.match(bracketRegex);
    //now check if there is more than 1 match for brackets
    if (species.match(bracketRegex).length > 1) {
      var index = matches.length - 1;
      species = matches[index];
    } //if there's only 1 match for the brackets, then that is the species name
    else {
      species = matches[0];
    }
  }
  //check if var has a ( or ) and remove them
  species = species.replace("(", "");
  species = species.replace(")", "");
  return species;
}

export async function getForeignName(pokemon, language) {
  await pokemon.getNo();
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon.dexNo}`
  );
  var rawNames = (await response.json()).names;
  var name;
  for (let i = 0; i < rawNames.length; i++) {
    if (rawNames[i].language.name === language) {
      name = rawNames[i].name;
    }
  }
  return name;
}

//take in existing BBCode speed tier list and parse it
export async function convertBBCodeToList(data, speedStageConversionTable) {
  //data order: calculatedSpeed, sprite, name, base speed, nature, IVs, EVs, boosts

  try {
    let parsedList = data; //needs to be list of Pokemon objects
    parsedList = parsedList.replaceAll("[/TD]", "");
    parsedList = parsedList.split("[TD]");
    //remove first line from list (table header)
    parsedList.splice(0, 1);
    var pokemonList = [];
    //each pokemon in the list has 8 array elements related to it
    for (let i = 0; i < parsedList.length; i += 8) {
      var name = parsedList[i + 2];

      //see comment re: validation below
      var response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeName(name)}`
      );

      //determine nature
      var nature =
        parsedList[i + 4] === "Positive"
          ? 1.1
          : parsedList[i + 4] === "Neutral"
          ? 1
          : 0.9;

      //determine speed stage
      var speedStage = parsedList[i + 7];
      var index = speedStage.indexOf("[");
      speedStage = speedStage.slice(0, index);
      speedStage = speedStageConversionTable[speedStage];

      //pokemon taken from a speed tier list SHOULD have a valid name, but just in case validate it anyways
      if (response.status === 200 && name !== "") {
        var pokemon = new Pokemon(
          name,
          parsedList[i + 3],
          parsedList[i + 5],
          parsedList[i + 6],
          0, //we can't determine level without another calculation since level is not included in the tier list.
          nature,
          parsedList[i],
          speedStage
        );
        await pokemon.getNo();
        pokemonList.push(pokemon);
      } else {
        console.log("invalid pokemon found in input. skipping");
      }
    }
    return pokemonList;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function encodeName(name) {
  var encodedName = name;
  encodedName = encodedName.toLowerCase();
  //replace " " with -
  encodedName = encodedName.replace(" ", "-");
  //replace "'" with ""
  encodedName = encodedName.replace("’", "");
  //replace ":" with ""
  encodedName = encodedName.replace(":", "");
  //replace "." with ""
  encodedName = encodedName.replace(".", "");
  return encodedName;
}
