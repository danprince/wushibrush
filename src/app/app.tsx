import "./app.css";
import * as Editor from "../editor";
import * as Tools from "../tools";
import * as Shortcuts from "../shortcuts";
import * as Icons from "./icons";
import * as Regions from "./regions";
import { VNode } from "preact";
import { useReducer, useMemo, useEffect, useLayoutEffect, useState } from "preact/hooks";
import { CanvasRenderer as Renderer } from "../renderer/canvas-renderer";
import { useEditor, useTool } from "../hooks";
import { Palette } from "./palette";
import { Panel } from "./panel";
import { Toolbar, ToolbarButton } from "./toolbar";
import { BrushSelector } from "./brush-selector";
import { OpacitySlider } from "./opacity-slider";
import { Tool } from "../tools";
import { Shortcut, BRUSH_SIZES, COLORS } from "./config";
import { Modal } from "./modal";
import { Help } from "./help";

interface ToolOption {
  label: string;
  shortcut: Shortcut;
  icon: VNode;
  handler: Tool;
}

const tools: ToolOption[] = [
  {
    label: "Brush",
    shortcut: Shortcut.BrushTool,
    icon: <Icons.Brush />,
    handler: Tools.brush,
  },
  {
    label: "Eraser",
    shortcut: Shortcut.EraserTool,
    icon: <Icons.Eraser />,
    handler: Tools.eraser,
  },
  {
    label: "Rectangle",
    shortcut: Shortcut.RectangleTool,
    icon: <Icons.Rect />,
    handler: Tools.rect,
  },
  {
    label: "Circle",
    shortcut: Shortcut.CircleTool,
    icon: <Icons.Circle />,
    handler: Tools.circle,
  },
  {
    label: "Line",
    shortcut: Shortcut.LineTool,
    icon: <Icons.Line />,
    handler: Tools.line,
  },
  {
    label: "Eyedropper",
    shortcut: Shortcut.EyedropperTool,
    icon: <Icons.Eyedropper />,
    handler: Tools.eyedropper,
  },
];

export function App() {
  let renderer = useMemo(() => new Renderer(500, 500), []);

  let [state, dispatch] = useEditor({ renderer });

  let [tool, setTool] = useTool({
    state,
    dispatch,
    renderer,
    defaultTool: Tools.brush,
  });

  let [helpVisible, setShowHelp] = useState(false);

  let undo = () => dispatch(Editor.undo());
  let redo = () => dispatch(Editor.redo());
  let setColor = (color: string) => dispatch(Editor.setColor(color));
  let setSize = (size: number) => dispatch(Editor.setPenSize(size));
  let setOpacity = (opacity: number) => dispatch(Editor.setOpacity(opacity));
  let save = () => renderer.toFile("image").then(download);
  let toggleQuietMode = () => document.body.classList.toggle("quiet");
  let showHelp = () => setShowHelp(true);

  useEffect(() => {
    Shortcuts.start();
    return () => Shortcuts.stop();
  }, []);

  // Important that these shortcuts are registered before any tool shortcuts
  // so we use layout effect here.
  useLayoutEffect(() => {
    let bindings: Shortcuts.Bindings = {};

    for (let tool of tools) {
      bindings[tool.shortcut] = () => setTool(tool.handler);
    }

    for (let i = 0; i < BRUSH_SIZES.length; i++) {
      bindings[i + 1] = () => setSize(BRUSH_SIZES[i]);
    }

    return Shortcuts.on({
      ...bindings,
      [Shortcut.Redo]: redo,
      [Shortcut.Undo]: undo,
      [Shortcut.Download]: Shortcuts.preventDefault(save),
      [Shortcut.ShowHelp]: showHelp,
      [Shortcut.ToggleQuietMode]: toggleQuietMode,
    });
  }, []);

  let activeTool = tool;

  return (
    <div class="app">
      {helpVisible && (
        <Modal onClose={() => setShowHelp(false)} closeKeys={Shortcut.ShowHelp}>
          <Help />
        </Modal>
      )}

      <main class="layout-row">
        <div class="layout-left">
          <Panel>
            <Palette
              colors={COLORS}
              activeColor={state.settings.color}
              setColor={setColor}
            />
          </Panel>
        </div>
        <div class="layout-center">
          <div class="renderer" ref={renderer.mount} />
        </div>
        <div class="layout-right">
          <Panel>
            <Toolbar>
              {tools.map(tool => {
                return (
                  <ToolbarButton
                    active={activeTool === tool.handler}
                    onClick={() => setTool(tool.handler)}
                    title={tool.label}
                  >
                    {tool.icon}
                  </ToolbarButton>
                );
              })}
              <ToolbarButton
                onClick={undo}
                disabled={!Editor.canUndo(state)}
                title="Undo"
              >
                <Icons.Undo/>
              </ToolbarButton>
              <ToolbarButton
                onClick={redo}
                disabled={!Editor.canRedo(state)}
                title="Redo"
              >
                <Icons.Redo/>
              </ToolbarButton>
              <ToolbarButton title="Help" onClick={showHelp}>
                <Icons.Help />
              </ToolbarButton>
              <ToolbarButton
                onClick={save}
                disabled={!Editor.canSave(state)}
                title="Download"
              >
                <Icons.Download/>
              </ToolbarButton>
            </Toolbar>
          </Panel>
        </div>
      </main>
      <div class="layout-below">
        <Panel>
          <BrushSelector
            sizes={BRUSH_SIZES}
            activeSize={state.settings.size}
            setSize={setSize}
          />
        </Panel>
        <Panel>
          <OpacitySlider
            opacity={state.settings.opacity}
            setOpacity={setOpacity}
          />
        </Panel>
      </div>
    </div>
  );
}

function download(file: File) {
  let a = document.createElement("a");
  a.style.display = "none";
  a.href = URL.createObjectURL(file);
  a.download = file.name;

  document.body.append(a);
  a.click();

  requestAnimationFrame(() => {
    URL.revokeObjectURL(a.href);
    a.remove();
  });
}

