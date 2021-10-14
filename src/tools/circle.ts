import * as Editor from "../editor";
import { Tool } from "./tool";
import { TwoPointsTool } from "./helpers/two-points";

export const circle: Tool = ({ getState, dispatch, renderer }) => {
  let tool = new TwoPointsTool(renderer, preview, create);

  function createCircle() {
    let [start, end] = tool.getPoints();
    let [x, y] = start;
    let r = Math.hypot(end[0] - start[0], end[1] - start[1]);
    return Editor.createCircle(getState(), x, y, r);
  }

  function preview() {
    let update = createCircle();
    renderer.preview(update);
  }

  function create() {
    let update = createCircle();
    dispatch(Editor.commit(update));
  }

  return () => tool.stop();
}

