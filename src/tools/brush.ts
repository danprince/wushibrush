import * as Editor from "../editor";
import { toggles } from "../shortcuts";
import { Tool } from "./tool";
import { PathDrawingTool } from "./helpers/path-drawing";
import { Shortcut } from "../app/config";

export const brush: Tool = ({ getState, dispatch, renderer }) => {
  let tool = new PathDrawingTool(renderer, preview, create);
  let freehand = true;
  let filled = false;

  function draw() {
    if (filled) return Editor.fillPath(getState(), tool.points);
    if (freehand) return Editor.createFreehandPath(getState(), tool.points);
    return Editor.createSimplePath(getState(), tool.points);
  }

  function preview() {
    renderer.preview(draw());
  }

  function create() {
    dispatch(Editor.commit(draw()));
  }

  function setFreehand(on: boolean) {
    freehand = on;
    preview();
  }

  function setFilled(on: boolean) {
    filled = on;
    preview();
  }

  let off = toggles({
    [Shortcut.ToggleSimpleStroke]: on => setFreehand(!on),
    [Shortcut.ToggleFill]: setFilled,
  })

  return () => {
    tool.stop();
    off();
  };
}

