import * as Editor from "./editor";
import { RefObject } from "preact";
import { EffectCallback, useEffect, useReducer, useRef, useCallback } from "preact/hooks";
import { Renderer } from "./renderer";
import { Tool } from "./tools";

export function useGetter<T>(value: T) {
  let ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return useCallback(() => {
    return ref.current;
  }, []);
}

export function useRenderer(
  state: Editor.State,
  renderer: Renderer,
) {
  useEffect(() => {
    function onPointerMove(event: PointerEvent) {
      let point = renderer.clientToCanvas(event.clientX, event.clientY);
      renderer.setCursorPosition(point[0], point[1]);
    }

    window.addEventListener("pointermove", onPointerMove);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  useEffect(() => {
    // TODO: This is wasteful (rebuilding the whole image after each commit)
    // Think about a better way to restore from checkpoints instead of from
    // scratch.

    let commits = Editor.getActiveCommits(state);

    renderer.clear();

    for (let commit of commits) {
      renderer.update(commit.update);
    }

    renderer.clearPreview();
  }, [renderer, state.commits, state.head]);

  useEffect(() => {
    renderer.setCursorSize(state.settings.size);
  }, [renderer, state.settings]);

  useEffect(() => {
    let { width, height } = state.canvas;
    renderer.resize(width, height);
  }, [renderer, state.canvas]);
}

export function useEditor({
  initialState = Editor.initialState,
  reducer = Editor.reducer,
  renderer,
}: {
  initialState?: Editor.State,
  reducer?: typeof Editor.reducer,
  renderer: Renderer,
}) {
  let [state, dispatch] = useReducer(reducer, initialState);
  useRenderer(state, renderer);
  usePersistence(state, dispatch);
  return [state, dispatch] as const;
}

export function usePersistence(
  state: Editor.State,
  dispatch: Editor.Dispatch
) {
  const key = "editor/state";

  function save() {
    let save = Editor.save(state);
    let json = JSON.stringify(state);
    localStorage.setItem(key, json);
  }

  useEffect(() => {
    let json = localStorage.getItem(key);

    if (json) {
      let state = JSON.parse(json);
      dispatch(Editor.load(state));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", save);

    return () => {
      window.removeEventListener("beforeunload", save);
    };
  }, [state]);

  useEffect(() => {
    // Save if this component unmounts (e.g. hot reload)
    return () => save();
  }, []);
}

export function useTool({
  defaultTool,
  state,
  dispatch,
  renderer,
}: {
  defaultTool: Tool,
  state: Editor.State,
  dispatch: Editor.Dispatch,
  renderer: Renderer,
}) {
  let [tool, setTool] = useReducer(
    ((prevTool: Tool, newTool: Tool) => newTool),
    defaultTool,
  );

  let getState = useGetter(state);

  useEffect(() => {
    return tool({ getState, dispatch, renderer });
  }, [tool]);

  return [tool, setTool] as const;
}

