import { Point, commit, strokeRect, fillRect } from "../editor";
import { Tool } from "./tool";
import { TwoPointsTool } from "./helpers/two-points";
import { on, toggles } from "../shortcuts";
import { Shortcut } from "../app/config";

export const rect: Tool = ({ getState, dispatch, renderer }) => {
  let tool = new TwoPointsTool(renderer, preview, create);
  let centered = false;
  let squared = false;
  let filled = false;

  function draw() {
    let [start, end] = tool.getPoints();
    if (start == null || end == null) return;
    let [[x, y], [x2, y2]] = [start, end];
    let w = x2 - x;
    let h = y2 - y;

    if (squared) {
      w = h = Math.max(w, h);
    }

    if (centered) {
      x -= w / 2;
      y -= h / 2;
      w *= 2;
      h *= 2;
    }

    return filled
      ? fillRect(getState(), x, y, w, h)
      : strokeRect(getState(), x, y, w, h);
  }

  function preview() {
    let update = draw();

    if (update) {
      renderer.preview(update);
    }
  }

  function create() {
    let update = draw();

    if (update) {
      dispatch(commit(update));
    }
  }

  function setCentered(on: boolean) {
    centered = on;
    preview();
  }

  function setSquared(on: boolean) {
    squared = on;
    preview();
  }

  function setFilled(on: boolean) {
    filled = on;
    preview();
  }

  let off = toggles({
    [Shortcut.ToggleCentered]: setCentered,
    [Shortcut.ToggleLockedAspectRatio]: setSquared,
    [Shortcut.ToggleFill]: setFilled,
  });

  return () => {
    tool.stop();
    off();
  };
}

