import * as Brush from "../tools/brush";

export type Point = [number, number];

export interface State {
  head: number;
  commits: Commit[];
  settings: Settings;
  canvas: { width: number, height: number },
}

export interface Commit {
  id: string;
  time: number;
  update: Update;
}

export interface Settings {
  color: string;
  opacity: number;
  size: number;
}

interface Stroke {
  strokeColor: string;
  strokeWidth: number;
  opacity: number;
}

interface Fill {
  fillColor: string;
  opacity: number;
}

interface StrokeWidth {
  strokeWidth: number;
}

type FillAndStroke<T> = T & Stroke | T & Fill | T & Stroke & Fill;

export type Update =
  | { type: "clear" }
  | { type: "erase", path: string } & StrokeWidth
  | FillAndStroke<{ type: "path", path: string }>
  | FillAndStroke<{ type: "circle", x: number, y: number, r: number }>

export type Action =
  | { type: "reset" }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "commit", commit: Commit }
  | { type: "load", state: State }
  | { type: "settings", settings: Partial<Settings> }
  | { type: "resize", width: number, height: number }
  | { type: "event", event: Event }

export type Dispatch = (action: Action) => void;

export const initialState: State = {
  head: -1,
  commits: [],
  canvas: {
    width: 500,
    height: 500,
  },
  settings: {
    color: "black",
    size: 9,
    opacity: 1,
  },
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "reset": {
      return initialState;
    }

    case "commit": {
      let commits = [...getActiveCommits(state), action.commit];
      return { ...state, commits, head: 0 };
    }

    case "undo": {
      if (canUndo(state)) {
        return { ...state, head: state.head + 1 };
      } else {
        return state;
      }
    }

    case "redo": {
      if (canRedo(state)) {
        return { ...state, head: state.head - 1 };
      } else {
        return state;
      }
    }

    case "load": {
      return { ...state, ...action.state };
    }

    case "resize": {
      let { width, height } = action;
      let canvas = {...state.canvas, width, height };
      return { ...state, canvas };
    }

    case "settings": {
      let settings = { ...state.settings, ...action.settings };
      settings.size = Math.max(settings.size, 0);
      return { ...state, settings };
    }

    default:
      return state;
  }
}

export function canUndo(state: State): boolean {
  // It's only possible to undo if HEAD is pointing at a commit which
  // is not the initial commit.
  //
  // commits: A B C
  //    head: 2 1 0
  // canUndo: N Y Y

  return (
    state.head >= 0 &&
    state.head <= state.commits.length - 1
  );
}

export function canRedo(state: State): boolean {
  // It's only possible to redo if HEAD is pointing at a commit in the past.
  //
  // commits: A B C
  //    head: 2 1 0
  // canRedo: Y Y N

  return (
    state.head > 0
  );
}

/**
 * Returns all the commits that have not been undone.
 */
export function getActiveCommits(state: State): Commit[] {
  if (state.head > 0) {
    return state.commits.slice(0, -state.head);
  } else {
    return state.commits;
  }
}

export function canSave(state: State) {
  return getActiveCommits(state).length > 0;
}

export function save(state: State) {
  return state;
}

