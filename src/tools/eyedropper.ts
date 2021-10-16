import { Point, setColor, setOpacity, setPenSize } from "../editor";
import { Tool } from "./tool";
import { Renderer } from "../renderer";

export const eyedropper: Tool = ({ renderer, getState, dispatch }) => {
  const onPointerDown = (event: PointerEvent) => {
    let [x, y] = renderer.clientToCanvas(event.clientX, event.clientY);
    let [color, alpha] = renderer.sampleAt(x, y) || [];

    if (color) {
      dispatch(
        setColor(color)
      );
    }

    if (alpha) {
      dispatch(
        setOpacity(alpha)
      );
    }
  };

  let prevPenSize = getState().settings.size;
  dispatch(setPenSize(3));

  window.addEventListener("pointerdown", onPointerDown);

  return () => {
    dispatch(setPenSize(prevPenSize));
    window.removeEventListener("pointerdown", onPointerDown);
  };
}

