import * as Editor from "../editor";
import { Renderer } from "../renderer";

/**
 * Tools are implemented as functions that get references to the editor
 * and the renderer. The function is called when the tool becomes active,
 * then the returned callback function is called to cleanup, when the tool
 * becomes inactive.
 */
export type Tool = (props: {
  getState: () => Editor.State,
  dispatch: Editor.Dispatch,
  renderer: Renderer,
}) => () => void;
