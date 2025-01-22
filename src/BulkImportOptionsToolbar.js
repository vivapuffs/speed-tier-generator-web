export default function ImportOptionsToolbar({ options, setOptions }) {
  return (
    <form>
      <br />
      <label for="level">Level: </label>
      <input
        type="text"
        size="3"
        onChange={(e) => setOptions({ ...options, level: e.target.value })}
        id="level"
        name="level"
        placeholder="100"
      />
      <br />
      <label for="speedEVs">Speed EVs: </label>
      <input
        type="text"
        size="3"
        onChange={(e) => setOptions({ ...options, ev: e.target.value })}
        id="speedEVs"
        name="speedEVs"
        placeholder="252"
      />
      <br />
      <label for="speedIV">Speed IV: </label>
      <input
        type="text"
        size="3"
        onChange={(e) => setOptions({ ...options, iv: e.target.value })}
        id="speedIV"
        name="speedIV"
        placeholder="31"
      />
      <p>Nature:
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, nature: e.target.value })}
        id="nature"
        name="nature"
        value="0.9"
      />
      <label for="nature">Negative</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, nature: e.target.value })}
        id="nature"
        name="nature"
        value="1"
      />
      <label for="Nature">Neutral</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, nature: e.target.value })}
        id="nature"
        name="nature"
        value="1.1"
        defaultChecked
      />
      <label for="speedStage">Positive</label>
      </p>
      <p>Speed stage:
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
        id="speedStage"
        name="speedStage"
        value="0.5"
      />
      <label for="speedStage">-2</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
        id="speedStage"
        name="speedStage"
        value="0.67"
      />
      <label for="speedStage">-1</label>

      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
        id="speedStage"
        name="speedStage"
        value="1"
        defaultChecked
      />
      <label for="speedStage">0</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
        id="speedStage"
        name="speedStage"
        value="1.5"
      />
      <label for="speedStage">+1</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
        id="speedStage"
        name="speedStage"
        value="2"
      />
      <label for="speedStage">+2</label>
      </p>
    </form>
  );
}
