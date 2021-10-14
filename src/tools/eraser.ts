import * as Editor from "../editor";
import { Tool } from "./tool";
import { PathDrawingTool } from "./helpers/path-drawing";

export const eraser: Tool = ({ getState, dispatch, renderer }) => {
  let tool = new PathDrawingTool(renderer, preview, create);

  function preview() {
    renderer.preview(
      Editor.createErase(getState(), tool.points)
    );
  }

  function create() {
    dispatch(
      Editor.commit(
        Editor.createErase(getState(), tool.points),
      )
    );
  }

  return () => tool.stop();
}

