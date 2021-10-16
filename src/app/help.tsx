import "./help.css";
import iconUrl from "../favicon.svg";
import { Shortcut } from "./config";

export function Help() {
  return (
    <div class="help">
      <header class="help-header">
        <img height={120} src={iconUrl} />
        <h1>Wushibrush</h1>
      </header>

      <div class="help-shortcuts">
        <div class="help-shorcuts-group">
          <header>
            <h2>Tools</h2>
          </header>
          <ul>
            <li>
              <kbd>{Shortcut.BrushTool}</kbd> Brush
            </li>
            <li>
              <kbd>{Shortcut.EraserTool}</kbd> Eraser
            </li>
            <li>
              <kbd>{Shortcut.RectangleTool}</kbd> Rectangle
            </li>
            <li>
              <kbd>{Shortcut.CircleTool}</kbd> Circle
            </li>
            <li>
              <kbd>{Shortcut.LineTool}</kbd> Line
            </li>
            <li>
              <kbd>{Shortcut.EyedropperTool}</kbd> Eyedropper
            </li>
          </ul>
        </div>

        <div class="help-shortcuts-group">
          <header>
            <h2>General</h2>
          </header>
          <ul>
            <li>
              <kbd>{Shortcut.Undo}</kbd> Undo
            </li>
            <li>
              <kbd>{Shortcut.Redo}</kbd> Redo
            </li>
            <li>
              <kbd>{Shortcut.ToggleQuietMode}</kbd> Quiet Mode
            </li>
            <li>
              <kbd>{Shortcut.ShowHelp}</kbd> Help
            </li>
            <li>
              <kbd>{Shortcut.BrushSize1}</kbd> Use Brush 1
            </li>
            <li>
              <kbd>{Shortcut.BrushSize2}</kbd> Use Brush 2
            </li>
            <li>
              <kbd>{Shortcut.BrushSize3}</kbd> Use Brush 3
            </li>
            <li>
              <kbd>{Shortcut.BrushSize4}</kbd> Use Brush 4
            </li>
            <li>
              <kbd>{Shortcut.BrushSize5}</kbd> Use Brush 5
            </li>
          </ul>
        </div>

        <div class="help-shortcuts-group">
          <header>
            <h2>Brush</h2>
          </header>
          <ul>
            <li>
              <kbd>{Shortcut.ToggleSimpleStroke}</kbd> to disable pressure.
            </li>
            <li>
              <kbd>{Shortcut.ToggleFill}</kbd> to fill current path
            </li>
          </ul>
          <header>
            <h2>Shapes</h2>
          </header>
          <ul>
            <li>
              <kbd>{Shortcut.ToggleFill}</kbd> to fill current path
            </li>
            <li>
              <kbd>{Shortcut.ToggleCentered}</kbd> to center current shape
            </li>
            <li>
              <kbd>{Shortcut.ToggleLockedAspectRatio}</kbd> to lock aspect ratio
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

