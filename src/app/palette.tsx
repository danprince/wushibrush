import "./palette.css";

const DEFAULT_COLORS = [
  "#0074D9",
  "#F012BE",
  "#FF4136",
  "#FF851B",
  "#FFDC00",
  "#2ECC40",
  "#AAAAAA",
  "#DDDDDD",
  "#FFFFFF",
  "#000000",
];

export function Palette({
  colors = DEFAULT_COLORS,
  activeColor,
  setColor,
}: {
  colors?: string[],
  activeColor: string,
  setColor(color: string): void,
}) {
  return (
    <div class="palette">
      <div class="palette-swatches">
        {colors.map(color => (
          <button
            class="palette-swatch"
            style={`background: ${color}`}
            onClick={() => setColor(color)}
          />
        ))}
      </div>
      <div
        class="palette-active-swatch"
        style={`background: ${activeColor}`}
      />
    </div>
  );
}

