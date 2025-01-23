export default function ImportOptionsToolbar({ options, setOptions }) {
  return (
        <p>
          <form>
            <table>
              <tr>
                <td><label for="level"><b>Level: </b></label></td>
                <td><input
                  type="text"
                  size="3"
                  onChange={(e) => setOptions({ ...options, level: e.target.value })}
                  id="level"
                  name="level"
                  placeholder="100"
                /></td>
              </tr>
              <tr>
                <td><label for="speedEVs"><b>Speed EVs: </b></label></td>
                <td><input
                    type="text"
                    size="3"
                    onChange={(e) => setOptions({ ...options, ev: e.target.value })}
                    id="speedEVs"
                    name="speedEVs"
                    placeholder="252"
                  /></td>
              </tr>
              <tr>
                <td><label for="speedIV"><b>Speed IV: </b></label></td>
                <td><input
                  type="text"
                  size="3"
                  onChange={(e) => setOptions({ ...options, iv: e.target.value })}
                  id="speedIV"
                  name="speedIV"
                  placeholder="31"
                /></td>
              </tr>
            </table>

            <table>
            <tr>
              <td><b>Nature:</b></td>
              <td><input
                type="radio"
                onChange={(e) => setOptions({ ...options, nature: e.target.value })}
                id="nature"
                name="nature"
                value="0.9"
              /></td>
              <td><label for="nature">Negative</label></td>
              <td><input
                type="radio"
                onChange={(e) => setOptions({ ...options, nature: e.target.value })}
                id="nature"
                name="nature"
                value="1"
              /></td>
              <td><label for="Nature">Neutral</label></td>
              <td><input
                type="radio"
                onChange={(e) => setOptions({ ...options, nature: e.target.value })}
                id="nature"
                name="nature"
                value="1.1"
                defaultChecked
              /></td>
              <td><label for="speedStage">Positive</label></td>
            </tr>
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
