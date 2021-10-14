import * as Editor from "../editor";
import { Renderer } from "../renderer/renderer";

export type Tool = (props: {
  getState: () => Editor.State,
  dispatch: Editor.Dispatch,
  renderer: Renderer,
}) => () => void;
