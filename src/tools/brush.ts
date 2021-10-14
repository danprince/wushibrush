import * as Editor from "../editor";
import { Tool } from "./tool";
import { PathDrawingTool } from "./helpers/path-drawing";

export const brush: Tool = ({ getState, dispatch, renderer }) => {
  let perfect = true;
  let tool = new PathDrawingTool(renderer, preview, create);

  function preview() {
    renderer.preview(
      Editor.createPath(getState(), tool.points, perfect)
    );
  }

  function create() {
    dispatch(
      Editor.commit(
        Editor.createPath(getState(), tool.points, perfect),
      )
    );
  }

  function onKeyDown(event: KeyboardEvent) {
    perfect = !event.shiftKey;
    preview();
  }

  function onKeyUp(event: KeyboardEvent) {
    perfect = !event.shiftKey;
    preview();
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  return () => {
    tool.stop();
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };
}

