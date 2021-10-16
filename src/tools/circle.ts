import * as Editor from "../editor";
import { toggles } from "../shortcuts";
import { Tool } from "./tool";
import { TwoPointsTool } from "./helpers/two-points";
import { Shortcut } from "../app/config";

export const circle: Tool = ({ getState, dispatch, renderer }) => {
  let tool = new TwoPointsTool(renderer, preview, create);
  let centered = false;
  let filled = false;

  function createCircle() {
    let [start, end] = tool.getPoints();

    if (start == null || end == null) {
      return;
    }

    let [x1, y1] = start;
    let [x2, y2] = end;
    let x, y, r;

    if (centered) {
      x = x1;
      y = y1;
      r = Math.hypot(x2 - x1, y2 - y1);
    } else {
      x = x1 + (x2 - x1) / 2;
      y = y1 + (y2 - y1) / 2;
      r = Math.hypot(x2 - x1, y2 - y1) / 2;
    }

    if (filled) {
      return Editor.fillCircle(getState(), x, y, r);
    } else {
      return Editor.strokeCircle(getState(), x, y, r);
    }
  }

  function preview() {
    let update = createCircle();

    if (update) {
      renderer.preview(update);
    }
  }

  function create() {
    let update = createCircle();

    if (update) {
      dispatch(Editor.commit(update));
    }
  }

  function setCentered(on: boolean) {
    centered = on;
    preview();
  }

  function setFilled(on: boolean) {
    filled = on;
    preview();
  }

  let off = toggles({
    [Shortcut.ToggleCentered]: setCentered,
    [Shortcut.ToggleFill]: setFilled,
  });

  return () => {
    off();
    tool.stop();
  };
}

