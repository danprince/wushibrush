import "./palette.css";

const DEFAULT_COLORS = [
  "black",
  "#bbb",
  "white",
  "#ffd90f", // yellow
  "#f1160a", // red
  "#ff851b", // orange
  "#48cb15", // green
  "#519cfd", // blue
  "#f9ddb9", // skin
  "#f52eb5", // pink
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

