import { getPokemonFromList } from "..\\..\\src\\source.js";
import { getPokemonFromImportable } from "..\\..\\src\\source.js";

//Set import tests
describe("import test: ", async () => {
  it("pokemon with no item, gender or nickname", async () => {
    var text = `Smoochum
    Ability: Oblivious  
    Level: 5  
    EVs: 236 SpA / 236 Spe  
    Timid Nature  
    IVs: 2 Atk / 30 SpA  
    - Ice Beam  
    - Psychic  
    - Hidden Power [Grass]  
    - Substitute`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Smoochum");
  });
});

describe("import test: ", async () => {
  it("pokemon with gender only", async () => {
    var text = `Smoochum (F)
    Ability: Oblivious  
    Level: 5  
    EVs: 236 SpA / 236 Spe  
    Timid Nature  
    IVs: 2 Atk / 30 SpA  
    - Ice Beam  
    - Psychic  
    - Hidden Power [Grass]  
    - Substitute`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Smoochum");
  });
});

describe("import test: ", async () => {
  it("pokemon with item only", async () => {
    var text = `Smoochum @ Salac Berry
    Ability: Oblivious  
    Level: 5  
    EVs: 236 SpA / 236 Spe  
    Timid Nature  
    IVs: 2 Atk / 30 SpA  
    - Ice Beam  
    - Psychic  
    - Hidden Power [Grass]  
    - Substitute`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Smoochum");
  });
});

describe("import test: ", async () => {
  it("pokemon with item and gender", async () => {
    var text = `Smoochum (F) @ Salac Berry
    Ability: Oblivious  
    Level: 5  
    EVs: 236 SpA / 236 Spe  
    Timid Nature  
    IVs: 2 Atk / 30 SpA  
    - Ice Beam  
    - Psychic  
    - Hidden Power [Grass]  
    - Substitute`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Smoochum");
  });
});

describe("import test: ", async () => {
  it("pokemon with item and nickname", async () => {
    var text = `Abra (Smoochum) @ Salac Berry
    Ability: Oblivious  
    Level: 5  
    EVs: 236 SpA / 236 Spe  
    Timid Nature  
    IVs: 2 Atk / 30 SpA  
    - Ice Beam  
    - Psychic  
    - Hidden Power [Grass]  
    - Substitute`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Smoochum");
  });
});

describe("import set: ", async () => {
  it("pokemon with no item or nickname (with gender)", async () => {
    var text = `Smoochum (F)
    Ability: Oblivious  
    Level: 5  
    EVs: 236 SpA / 236 Spe  
    Timid Nature  
    IVs: 2 Atk / 30 SpA  
    - Ice Beam  
    - Psychic  
    - Hidden Power [Grass]  
    - Substitute`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Smoochum");
  });
});

describe("import set: ", async () => {
  it("pokemon with no item (with gender and nickname)", async () => {
    var text = `Steelix (Smoochum) (F)  
    Ability: Oblivious  
    Level: 5  
    EVs: 236 SpA / 236 Spe  
    Timid Nature  
    IVs: 2 Atk / 30 SpA  
    - Ice Beam  
    - Psychic  
    - Hidden Power [Grass]  
    - Substitute`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Smoochum");
  });
});

describe("import test: ", async () => {
  it("pokemon with nickname", async () => {
    var text = `Abra (Smoochum)
    Ability: Oblivious  
    Level: 5  
    EVs: 236 SpA / 236 Spe  
    Timid Nature  
    IVs: 2 Atk / 30 SpA  
    - Ice Beam  
    - Psychic  
    - Hidden Power [Grass]  
    - Substitute`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Smoochum");
  });
});

describe("import set: ", async () => {
  it("pokemon with item, gender, and nickname", async () => {
    var text = `Steelix (Smoochum) (F)  
    Ability: Oblivious  
    Level: 5  
    EVs: 236 SpA / 236 Spe  
    Timid Nature  
    IVs: 2 Atk / 30 SpA  
    - Ice Beam  
    - Psychic  
    - Hidden Power [Grass]  
    - Substitute`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Smoochum");
  });
});

describe("import set: ", async () => {
  it("general import test", async () => {
    var text = `Walking Wake @ Choice Specs  
    Ability: Protosynthesis  
    Tera Type: Water  
    EVs: 244 SpA / 12 SpD / 252 Spe  
    Timid Nature  
    IVs: 0 Atk  
    - Hydro Steam  
    - Flamethrower  
    - Draco Meteor  
    - Dragon Pulse`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Walking Wake");
    expect(pokemon.baseSpeed).to.equal(109);
    expect(pokemon.iv).to.equal(31);
    expect(pokemon.ev).to.equal(252);
    expect(pokemon.level).to.equal(100);
    expect(pokemon.nature).to.equal(1.1);
    expect(pokemon.speedStage).to.equal(1);
    expect(pokemon.calculatedSpeed).to.equal(348);
  });
});

describe("import set: ", async () => {
  it("set with speed EVs and speed IVs", async () => {
    var text = `Walking Wake @ Choice Specs  
    Ability: Protosynthesis  
    Tera Type: Water  
    EVs: 244 SpA / 12 SpD / 252 Spe  
    Timid Nature  
    IVs: 0 Spe  
    - Hydro Steam  
    - Flamethrower  
    - Draco Meteor  
    - Dragon Pulse`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.iv).to.equal(0);
    expect(pokemon.ev).to.equal(252);
  });
});

describe("import set: ", async () => {
  it("set with speed EVs", async () => {
    var text = `Walking Wake @ Choice Specs  
    Ability: Protosynthesis  
    Tera Type: Water  
    EVs: 244 SpA / 12 SpD / 252 Spe  
    Timid Nature  
    - Hydro Steam  
    - Flamethrower  
    - Draco Meteor  
    - Dragon Pulse`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.ev).to.equal(252);
  });
});

describe("import set: ", async () => {
  it("set with speed IVs", async () => {
    var text = `Walking Wake @ Choice Specs  
    Ability: Protosynthesis  
    Tera Type: Water  
    EVs: 244 SpA / 12 SpD
    IVs: 0 Spe
    Timid Nature  
    - Hydro Steam  
    - Flamethrower  
    - Draco Meteor  
    - Dragon Pulse`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.iv).to.equal(0);
  });
});

describe("import set: ", async () => {
  it("set with no speed investment", async () => {
    var text = `Walking Wake @ Choice Specs  
    Ability: Protosynthesis  
    Tera Type: Water  
    EVs: 244 SpA / 12 SpD
    Timid Nature  
    - Hydro Steam  
    - Flamethrower  
    - Draco Meteor  
    - Dragon Pulse`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.ev).to.equal(0);
    expect(pokemon.iv).to.equal(31);
  });
});

describe("import set: ", async () => {
  it("set with abnormal level", async () => {
    var text = `Tandemaus @ Damp Rock  
    Ability: Own Tempo  
    Level: 5  
    Tera Type: Ghost  
    EVs: 196 Atk / 76 SpD / 236 Spe  
    Jolly Nature  
    - Facade  
    - U-turn  
    - Taunt  
    - Rain Dance`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.level).to.equal(5);
  });
});

//Bulk import tests
describe("import bulk: ", async () => {
  it("bulk with valid input", async () => {
    var text = `Scream Tail,Arcanine-Hisui,Dragapult`;

    var pokemon = await getPokemonFromList(text, {
      iv: 31,
      ev: 252,
      level: 100,
      nature: 1.1,
      speedStage: 1,
    });
    expect(pokemon[0].name).to.equal("Scream Tail");
    expect(pokemon[0].baseSpeed).to.equal(111);
    expect(pokemon[0].iv).to.equal(31);
    expect(pokemon[0].ev).to.equal(252);
    expect(pokemon[0].level).to.equal(100);
    expect(pokemon[0].nature).to.equal(1.1);
    expect(pokemon[0].speedStage).to.equal(1);
    expect(pokemon[0].calculatedSpeed).to.equal(353);

    expect(pokemon[1].name).to.equal("Arcanine-Hisui");
    expect(pokemon[1].baseSpeed).to.equal(90);
    expect(pokemon[1].iv).to.equal(31);
    expect(pokemon[1].ev).to.equal(252);
    expect(pokemon[1].level).to.equal(100);
    expect(pokemon[1].nature).to.equal(1.1);
    expect(pokemon[1].speedStage).to.equal(1);
    expect(pokemon[1].calculatedSpeed).to.equal(306);

    expect(pokemon[2].name).to.equal("Dragapult");
    expect(pokemon[2].baseSpeed).to.equal(142);
    expect(pokemon[2].iv).to.equal(31);
    expect(pokemon[2].ev).to.equal(252);
    expect(pokemon[2].level).to.equal(100);
    expect(pokemon[2].nature).to.equal(1.1);
    expect(pokemon[2].speedStage).to.equal(1);
    expect(pokemon[2].calculatedSpeed).to.equal(421);
  });
});

describe("import bulk: ", async () => {
  it("bulk with some valid input", async () => {
    var text = `Scream Tail,Agumon,Arcanine-Hisui,`;

    var pokemon = await getPokemonFromList(text, {
      iv: 31,
      ev: 252,
      level: 100,
      nature: 1.1,
      speedStage: 1,
    });
    expect(pokemon[0].name).to.equal("Scream Tail");
    expect(pokemon[0].baseSpeed).to.equal(111);
    expect(pokemon[0].iv).to.equal(31);
    expect(pokemon[0].ev).to.equal(252);
    expect(pokemon[0].level).to.equal(100);
    expect(pokemon[0].nature).to.equal(1.1);
    expect(pokemon[0].speedStage).to.equal(1);
    expect(pokemon[0].calculatedSpeed).to.equal(353);

    expect(pokemon[1].name).to.equal("Arcanine-Hisui");
    expect(pokemon[1].baseSpeed).to.equal(90);
    expect(pokemon[1].iv).to.equal(31);
    expect(pokemon[1].ev).to.equal(252);
    expect(pokemon[1].level).to.equal(100);
    expect(pokemon[1].nature).to.equal(1.1);
    expect(pokemon[1].speedStage).to.equal(1);
    expect(pokemon[1].calculatedSpeed).to.equal(306);
  });
});

describe("import bulk: ", async () => {
  it("bulk with no valid input", async () => {
    var text = `asdjsakda,das,dajsda,`;
    var pokemon = await getPokemonFromList(text, {
      iv: 31,
      ev: 252,
      level: 100,
      nature: 1.1,
      speedStage: 1,
    });
    expect(pokemon.length).to.equal(0);
  });
});

//TODO

//Test Import existing list functionality - valid and invalid list

//Test Duplicate filter

//Edge cases
describe("import meowstic-m: ", async () => {
  it("male", async () => {
    var text = `Meowstic (M) @ Eject Button
    Ability: Prankster
    EVs: 252 HP / 4 SpA / 252 SpD
    Timid Nature
    - Reflect
    - Light Screen
    - Yawn
    - Psychic`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Meowstic");
  });
});

describe("import meowstic-f: ", async () => {
  it("female", async () => {
    var text = `Meowstic-F (F) @ Eject Button
    Ability: Prankster
    EVs: 252 HP / 4 SpA / 252 SpD
    Timid Nature
    - Reflect
    - Light Screen
    - Yawn
    - Psychic`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Meowstic-F");
  });
});

describe("import basculin: ", async () => {
  it("default", async () => {
    var text = `Basculin @ Choice Scarf
      Ability: Adaptability
      EVs: 252 Atk / 4 SpD / 252 Spe
      Jolly Nature
      - Liquidation
      - Flip Turn
      - Crunch
      - Superpower`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Basculin-Red-Striped");
  });
});

describe("import basculin: ", async () => {
  it("white striped", async () => {
    var text = `Basculin-White-Striped @ Choice Scarf
      Ability: Adaptability
      EVs: 252 Atk / 4 SpD / 252 Spe
      Jolly Nature
      - Liquidation
      - Flip Turn
      - Crunch
      - Superpower`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Basculin-White-Striped");
  });
});

describe("import kommo-o: ", async () => {
  it("", async () => {
    var text = `Kommo-o @ Leftovers
    Ability: Bulletproof
    EVs: 252 HP / 148 Def / 40 SpD / 68 Spe
    Impish Nature
    - Body Press
    - Earthquake
    - Stealth Rock
    - Toxic`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.name).to.equal("Kommo-o");
  });
});
