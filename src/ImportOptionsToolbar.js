export default function ImportOptionsToolbar({ options, setOptions }) {
  return (
    <form>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, mode: e.target.value })}
        id="importType"
        name="importType"
        value="bulk"
      />
      <label for="importType">Bulk Import</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, mode: e.target.value })}
        id="importType"
        name="importType"
        value="set"
      />
      <label for="importType">Set Import</label>
      <br />
      <br />
      <label for="level">Level: </label>
      <input
        type="text"
        size="3"
        onChange={(e) => setOptions({ ...options, level: e.target.value })}
        id="level"
        name="level"
      />
      <br />
      <p>Speed stage:</p>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
        id="speedStage"
        name="speedStage"
        value="1"
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
    </form>
  );
}
