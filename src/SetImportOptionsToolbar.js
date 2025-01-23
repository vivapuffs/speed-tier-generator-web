export default function SetImportOptionsToolbar({ options, setOptions }) {
  return (
    <p>
      <form>
        <table>
          <tr>
              <td><b>Speed stage:</b></td>
              <td><input
                type="radio"
                onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
                id="speedStage"
                name="speedStage"
                value="0.5"
              /></td>
              <td><label for="speedStage">-2</label></td>
              <td><input
                type="radio"
                onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
                id="speedStage"
                name="speedStage"
                value="0.67"
              /></td>
              <td><label for="speedStage">-1</label></td>
              <td><input
                type="radio"
                onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
                id="speedStage"
                name="speedStage"
                value="1"
                defaultChecked
              /></td>
              <td><label for="speedStage">0</label></td>
              <td><input
                type="radio"
                onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
                id="speedStage"
                name="speedStage"
                value="1.5"
              /></td>
              <td><label for="speedStage">+1</label></td>
              <td><input
                type="radio"
                onChange={(e) => setOptions({ ...options, speedStage: e.target.value })}
                id="speedStage"
                name="speedStage"
                value="2"
              /></td>
              <td><label for="speedStage">+2</label></td>
            </tr>
          </table>
      </form>
    </p>
  );
}
