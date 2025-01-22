export default function SetImportOptionsToolbar({ options, setOptions }) {
  return (
    <form>
      <p>Speed stage:</p>
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
      <br />
      {/* language selector - temporarily removed */}
      {/*<p>Output Language:</p>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, language: e.target.value })}
        id="language"
        name="language"
        value="en"
        defaultChecked
      />
      <label for="language">en</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, language: e.target.value })}
        id="language"
        name="language"
        value="ja-Hrkt"
      />
      <label for="language">ja</label>
      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, language: e.target.value })}
        id="language"
        name="language"
        value="ko"
      />
      <label for="language">ko</label>

      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, language: e.target.value })}
        id="language"
        name="language"
        value="zh-Hant"
      />
      <label for="language">cn</label>

      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, language: e.target.value })}
        id="language"
        name="language"
        value="fr"
      />
      <label for="language">fr</label>

      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, language: e.target.value })}
        id="language"
        name="language"
        value="de"
      />
      <label for="language">de</label>

      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, language: e.target.value })}
        id="language"
        name="language"
        value="es"
      />
      <label for="language">es</label>

      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, language: e.target.value })}
        id="language"
        name="language"
        value="it"
      />
      <label for="language">it</label>

      <input
        type="radio"
        onChange={(e) => setOptions({ ...options, language: e.target.value })}
        id="language"
        name="language"
        value="zh-Hans"
      />
      <label for="language">cn (simplified)</label>*/}
    </form>
  );
}
