import * as Editor from "./editor";
import * as Tools from "./tools";
import { RefObject, VNode } from "preact";
import { useReducer, useMemo, useEffect, useCallback, useRef, useState } from "preact/hooks";
import { Point } from "./editor";
import { useGetter } from "./utils";
import { Renderer } from "./renderer/renderer";
import { SvgRenderer } from "./renderer/svg-renderer";
//import { CanvasRenderer as SvgRenderer } from "./renderer/canvas-renderer";
import { useRendererSync, useMountRenderer } from "./renderer/hooks";
import { Tool } from "./tools/tool";

function useEditor({
  initialState = Editor.initialState,
  reducer = Editor.reducer,
  renderer,
  container,
}: {
  initialState?: Editor.State,
  reducer?: typeof Editor.reducer,
  renderer: Renderer,
  container: RefObject<HTMLElement>,
}) {
  let [state, dispatch] = useReducer(reducer, initialState);
  useRendererSync(state, renderer);
  useMountRenderer(container, renderer);
  return [state, dispatch];
}

function useToolEffects({
  tool,
  state,
  dispatch,
  renderer,
}: {
  tool: EffectCallback,
  state: Editor.State,
  dispatch: Editor.Dispatch,
  renderer: Renderer,
}) {
  let getState = useGetter(state);

  useEffect(() => {
    return tool({ getState, dispatch, renderer });
  }, [tool]);
}

function useTool(defaultTool: Tool) {
  return useReducer(
    (prevTool: Tool, newTool: Tool) => newTool,
    () => defaultTool
  );
}

export function App() {
  let container = useRef<HTMLDivElement>();
  let renderer = useMemo(() => new SvgRenderer(200, 200), []);
  let [state, dispatch] = useEditor({ renderer, container });
  let [tool, setTool] = useTool(Tools.brush);

  useToolEffects({ tool, state, dispatch, renderer });

  const undo = () => dispatch(Editor.undo());
  const redo = () => dispatch(Editor.redo());

  const drawSomething = () => dispatch(
    Editor.commit(
      Editor.createCircle(state, 100, 100, 10)
    )
  );

  const setColor = (color: string) => dispatch(
    Editor.setColor(color)
  );

  useEffect(() => {
    let handleKeyDown = (event: KeyboardEvent) => {
      let ctrl = event.metaKey || event.ctrlKey;
      let shift = event.shiftKey;

      switch (true) {
        case ctrl && shift && event.key === "z":
          return redo();
        case ctrl && event.key === "z":
          return undo();
      }

      switch (event.key) {
        case "_":
        case "-":
          return dispatch(
            Editor.setPenSize(state.settings.size - 1)
          );
        case "+":
        case "=":
          return dispatch(
            Editor.setPenSize(state.settings.size + 1)
          );
        case "b":
        case "p":
          return setTool(Tools.brush);
        case "e":
          return setTool(Tools.eraser);
        case "i":
          return setTool(Tools.eyedropper);
        case "r":
          return setTool(Tools.rect);
        case "c":
          return setTool(Tools.circle);
        case "l":
          return setTool(Tools.line);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.settings]);

  return (
    <>
      <div ref={container} />
      <button onClick={() => drawSomething()}>Line</button>
      <button onClick={() => setColor("red")}>Red</button>
      <button onClick={() => setColor("black")}>Black</button>
      <button onClick={() => setColor("white")}>White</button>
      <button onClick={undo} disabled={!Editor.canUndo(state)}>Undo</button>
      <button onClick={redo} disabled={!Editor.canRedo(state)}>Redo</button>
    </>
  );
}

