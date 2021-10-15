import { Point, setColor, setOpacity } from "../editor";
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

  window.addEventListener("pointerdown", onPointerDown);

  return () => {
    window.removeEventListener("pointerdown", onPointerDown);
  };
}

