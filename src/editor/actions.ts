import { Action, State, Commit, Settings, Update, Point } from "./state";
import { pointsToPerfectPath, pointsToSimplePath } from "../utils";

function uid() {
  let buffer = new Uint32Array(1);
  buffer = window.crypto.getRandomValues(buffer);
  return buffer[0].toString(16);
}

export function commit(update: Update): Action {
  let commit: Commit = {
    id: uid(),
    time: Date.now(),
    update,
  };

  return { type: "commit", commit };
}

export function load(commits: Commit[]): Action {
  return { type: "load", commits };
}

export function undo(): Action {
  return { type: "undo" };
}

export function redo(): Action {
  return { type: "redo" };
}

export function reset(): Action {
  return { type: "reset" };
}

export function updateSettings(settings: Partial<Settings>): Action {
  return { type: "settings", settings };
}

export function setPenSize(size: number): Action {
  return { type: "settings", settings: { size } };
}

export function setColor(color: string): Action {
  return { type: "settings", settings: { color } };
}

export function setOpacity(opacity: number): Action {
  return { type: "settings", settings: { opacity } };
}

export function createPath(state: State, points: Point[], perfect = true): Update {
  if (perfect) {
    return {
      type: "path",
      path: pointsToPerfectPath(points, state.settings.size),
      fillColor: state.settings.color,
      opacity: state.settings.opacity,
    };
  } else {
    return {
      type: "path",
      path: pointsToSimplePath(points),
      strokeWidth: state.settings.size,
      strokeColor: state.settings.color,
      opacity: state.settings.opacity,
    };
  }
}

export function createErase(state: State, points: Point[]): Update {
  return {
    type: "erase",
    path: pointsToPerfectPath(points, state.settings.size),
    strokeWidth: state.settings.size,
  };
}

export function createRect(state: State, x: number, y: number, w: number, h: number): Update {
  return {
    type: "path",
    path: `M ${x} ${y} h ${w} v ${h} h ${-w} Z`,
    strokeColor: state.settings.color,
    strokeWidth: state.settings.size,
    opacity: state.settings.opacity,
  };
}

export function createCircle(state: State, x: number, y: number, r: number): Update {
  return {
    type: "circle",
    x, y, r,
    strokeColor: state.settings.color,
    strokeWidth: state.settings.size,
    opacity: state.settings.opacity,
  };
}

export function createLine(state: State, start: Point, end: Point): Update {
  return {
    type: "path",
    path: `M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}`,
    strokeColor: state.settings.color,
    strokeWidth: state.settings.size,
    opacity: state.settings.opacity,
  };
}

