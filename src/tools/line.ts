import * as Editor from "../editor";
import { Tool } from "./tool";
import { TwoPointsTool } from "./helpers/two-points";

export const line: Tool = ({ getState, dispatch, renderer }) => {
  let tool = new TwoPointsTool(renderer, preview, create);

  function preview() {
    let [start, end] = tool.getPoints();
    if (start == null || end == null) return;
    renderer.preview(
      Editor.createLine(getState(), start, end)
    );
  }

  function create() {
    let [start, end] = tool.getPoints();
    if (start == null || end == null) return;
    dispatch(
      Editor.commit(
        Editor.createLine(getState(), start, end),
      )
    );
  }

  return () => tool.stop();
}

