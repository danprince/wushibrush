import { Point, commit, createRect } from "../editor";
import { Tool } from "./tool";
import { TwoPointsTool } from "./helpers/two-points";
import { on } from "../shortcuts";

export const rect: Tool = ({ getState, dispatch, renderer }) => {
  let tool = new TwoPointsTool(renderer, preview, create);
  let centered = false;
  let squared = false;

  function draw() {
    let [[x, y], [x2, y2]] = tool.getPoints();
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

    return createRect(getState(), x, y, w, h);
  }

  function preview() {
    renderer.preview(draw());
  }

  function create() {
    dispatch(commit(draw()));
  }

  let off = on({
    "alt": () => (centered = true, preview()),
    "shift": () => (squared = true, preview()),
  }, {
    "alt": () => (centered = false, preview()),
    "shift": () => (squared = false, preview()),
  });

  return () => {
    tool.stop();
    off();
  };
}

