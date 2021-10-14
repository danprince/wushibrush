import { RefObject } from "preact";
import { useEffect } from "preact/hooks";
import { State, getActiveCommits } from "../editor";
import { Renderer } from "./renderer";

export function useRendererSync(state: State, renderer: Renderer) {
  useEffect(() => {
    // TODO: This is wasteful (rebuilding the whole image after each commit)
    // Think about a better way to restore from checkpoints instead of from
    // scratch.

    let commits = getActiveCommits(state);

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

export function useMountRenderer(ref: RefObject<HTMLElement>, renderer: Renderer) {
  useEffect(() => {
    let element = ref.current;

    if (element) {
      renderer.mount(element);
    }

    function onPointerMove(event: PointerEvent) {
      let point = renderer.clientToCanvas(event.clientX, event.clientY);
      renderer.setCursorPosition(point[0], point[1]);
    }

    window.addEventListener("pointermove", onPointerMove);

    return () => {
      renderer.unmount();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [ref.current]);
}

