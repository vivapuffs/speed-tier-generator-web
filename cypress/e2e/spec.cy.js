import { getPokemonFromList } from "..\\..\\src\\source.js";
import { getPokemonFromImportable } from "..\\..\\src\\source.js";

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
    expect(pokemon.dexNo).to.equal(1009);
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

describe("import bulk: ", async () => {
  it("bulk with valid input", async () => {
    var text = `Scream Tail,Arcanine-Hisui,Dragapult`;

    var pokemon = await getPokemonFromImportable(text, { speedStage: 1 });
    expect(pokemon.level).to.equal(5);
  });
});

//TODO

//Test Bulk import functionality - valid and invalid input

//Test Import existing list functionality - valid and invalid list

//Test Duplicate filter
