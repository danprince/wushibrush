import "./palette.css";

export function Palette({
  colors,
  activeColor,
  setColor,
}: {
  colors: string[],
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

