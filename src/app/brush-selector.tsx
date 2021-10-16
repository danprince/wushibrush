import "./brush-selector.css";
import { useEffect } from "preact/hooks";

export function BrushSelector({
  sizes,
  activeSize,
  setSize
}: {
  sizes: number[],
  activeSize: number,
  setSize(size: number): void,
}) {
  let maxSize = Math.max(...sizes);

  return (
    <div class="brush-selector">
      {sizes.map(size => {
        let relativeSize = size / maxSize;
        let percent = `${relativeSize * 100}%`;
        let active = size === activeSize;
        let activeClass = active ? "brush-selector-active" : "";
        let style = {
          transform: `scale(${relativeSize})`,
        };

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
