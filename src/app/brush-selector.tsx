import "./brush-selector.css";
import * as Shortcuts from "../shortcuts";
import { useEffect } from "preact/hooks";

const DEFAULT_BRUSH_SIZES = [3, 6, 9, 16, 32];

export function BrushSelector({
  sizes = DEFAULT_BRUSH_SIZES,
  activeSize,
  setSize
}: {
  sizes: number[],
  activeSize: number,
  setSize(size: number): void,
}) {
  let maxSize = Math.max(...sizes);

  useEffect(() => {
    let bindings: Shortcuts.Bindings = {};

    for (let i = 0; i < sizes.length; i++) {
      bindings[i + 1] = () => setSize(sizes[i]);
    }

    return Shortcuts.on(bindings);
  }, []);

  return (
    <div class="brush-selector">
      {sizes.map(size => {
        let relativeSize = size / maxSize;
        let percent = `${relativeSize * 100}%`;
        let active = size === activeSize;
        let activeClass = active ? "brush-selector-active" : "";
        let style = { width: percent, height: percent };

        return (
          <button
            class={`brush-selector-option ${activeClass}`}
            onClick={() => setSize(size)}
          >
            <div
              class="brush-selector-preview"
              style={style}
            />
          </button>
        );
      })}
    </div>
  );
}
