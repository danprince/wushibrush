import "./opacity-slider.css";

export function OpacitySlider({
  opacity,
  setOpacity,
}: {
  opacity: number,
  setOpacity(opacity: number): void,
}) {
  return (
    <div class="opacity-slider">
      <div class="opacity-slider-low"></div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={opacity}
        onChange={event => setOpacity(event.target.value)}
      />
      <div class="opacity-slider-high"></div>
    </div>
  );
}
