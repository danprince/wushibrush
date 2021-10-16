export interface Bindings {
  [keys: string]: (event: KeyboardEvent) => any;
}

interface Frame {
  up: Bindings;
  down: Bindings;
}

let stack: Frame[] = [];

export function start() {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}

export function stop() {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
}

export function push(down: Bindings, up: Bindings = {}) {
  stack.push({ up, down });
  return () => pop();
}

export function pop() {
  stack.pop();
}

function merge(frame: Frame) {
  let currentFrame = stack[stack.length - 1];

  if (currentFrame != null) {
    frame = {
      up: { ...currentFrame.up, ...frame.up },
      down: { ...currentFrame.down, ...frame.down },
    };
  }

  stack.push(frame);
}

export function on(down: Bindings, up: Bindings = {}) {
  merge({ up, down });
  return () => off();
}

export function off() {
  pop();
}


interface ToggleBindings {
  [keys: string]: (down: boolean) => any;
}

function getCurrentFrame() {
  return stack[stack.length - 1];
}

function matches(keys: string, event: KeyboardEvent) {
  let combo = keys.toLowerCase().split("+");
  let name = event.key.toLowerCase();

  return combo.every(key => {
    if (key === "ctrl" && (event.ctrlKey || event.metaKey)) return true;
    if (key === "shift" && event.shiftKey) return true;
    if (key === "alt" && event.altKey) return true;
    if (key === name) return true;
    return false;
  });
}

const IGNORE_ELEMENTS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

function ignore(event: KeyboardEvent) {
  return (
    event.target instanceof HTMLElement &&
    IGNORE_ELEMENTS.has(event.target.tagName)
  );
}

function handleKeyDown(event: KeyboardEvent) {
  if (ignore(event)) return;

  let frame = getCurrentFrame();
  if (frame == null) return;

  for (let keys in frame.down) {
    if (matches(keys, event)) {
      let callback = frame.down[keys];
      return callback(event);
    }
  }
}

function handleKeyUp(event: KeyboardEvent) {
  if (ignore(event)) return;

  let frame = stack[stack.length - 1];
  if (frame == null) return;

  for (let keys in frame.up) {
    if (matches(keys, event)) {
      let callback = frame.up[keys];
      return callback(event);
    }
  }
}

export function toggles(bindings: ToggleBindings) {
  let up: Bindings = {};
  let down: Bindings = {};

  for (let key in bindings) {
    down[key] = () => bindings[key](true);
    up[key] = () => bindings[key](false);
  }

  return on(down, up);
}

export function preventDefault<Func extends Bindings[string]>(
  func: Func,
) {
  return (event: KeyboardEvent) => {
    event.preventDefault();
    return func(event);
  };
}

