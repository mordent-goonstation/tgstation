import { useBackend } from '../backend';
import { AsciiChart } from '../components';
import { Window } from '../layouts';

export const MordentGizmo = (props, context) => {
  const data = [
    [0, 0],
    [1, 1],
    [2, 0],
    [3, 0.5],
    [4, 0],
  ];
  const maxValue = 1;
  return (
    <Window resizable>
      <Window.Content scrollable>
        <AsciiChart
          fillPositionedParent
          data={data}
          rangeX={[0, data.length - 1]}
          rangeY={[0, maxValue]}
          strokeColor="rgba(0, 181, 173, 1)"
        />
      </Window.Content>
    </Window>
  );
};
