import { Point, commit, createRect } from "../editor";
import { Tool } from "./tool";
import { TwoPointsTool } from "./helpers/two-points";

export const rect: Tool = ({ getState, dispatch, renderer }) => {
  let tool = new TwoPointsTool(renderer, preview, create);

  function draw() {
    let [[x1, y1], [x2, y2]] = tool.getPoints();
    let w = x2 - x1;
    let h = y2 - y1;
    return createRect(getState(), x1, y1, w, h);
  }

  function preview() {
    renderer.preview(draw());
  }

  function create() {
    dispatch(commit(draw()));
  }

  return () => tool.stop();
}

