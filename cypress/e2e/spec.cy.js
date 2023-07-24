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
    console.log(pokemon);
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

describe("import set: ", async () => {
  it("pokemon with item, gender, and nickname)", async () => {
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
  it("pokemon with EV (speed) and IV (not speed)", async () => {
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
