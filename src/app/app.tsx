import "./app.css";
import * as Editor from "../editor";
import * as Tools from "../tools";
import * as Shortcuts from "../shortcuts";
import * as Icons from "./icons";
import * as Regions from "./regions";
import { VNode } from "preact";
import { useReducer, useMemo, useEffect } from "preact/hooks";
import { SvgRenderer } from "../renderer/svg-renderer";
import { useEditor, useTool } from "../hooks";
import { Palette } from "./palette";
import { Panel } from "./panel";
import { Toolbar, ToolbarButton } from "./toolbar";
import { BrushSelector } from "./brush-selector";
import { OpacitySlider } from "./opacity-slider";
import { Tool } from "../tools";

interface ToolOption {
  label: string;
  shortcut: string;
  icon: VNode;
  handler: Tool;
}

const tools: ToolOption[] = [
  {
    label: "Brush",
    shortcut: "b",
    icon: <Icons.Brush />,
    handler: Tools.brush,
  },
  {
    label: "Eraser",
    shortcut: "e",
    icon: <Icons.Eraser />,
    handler: Tools.eraser,
  },
  {
    label: "Rectangle",
    shortcut: "r",
    icon: <Icons.Rect />,
    handler: Tools.rect,
  },
  {
    label: "Circle",
    shortcut: "c",
    icon: <Icons.Circle />,
    handler: Tools.circle,
  },
  {
    label: "Line",
    shortcut: "l",
    icon: <Icons.Line />,
    handler: Tools.line,
  },
  {
    label: "Eyedropper",
    shortcut: "i",
    icon: <Icons.Eyedropper />,
    handler: Tools.eyedropper,
  },
];

export function App() {
  let renderer = useMemo(() => new SvgRenderer(200, 200), []);

  let [state, dispatch] = useEditor({ renderer });

  let [tool, setTool] = useTool({
    state,
    dispatch,
    renderer,
    defaultTool: Tools.brush,
  });

  let undo = () => dispatch(Editor.undo());
  let redo = () => dispatch(Editor.redo());
  let setColor = (color: string) => dispatch(Editor.setColor(color));
  let setSize = (size: number) => dispatch(Editor.setPenSize(size));
  let setOpacity = (opacity: number) => dispatch(Editor.setOpacity(opacity));
  let save = () => renderer.toFile().then(download);

  useEffect(() => {
    let toolShortcuts: Shortcuts.Bindings = {};

    for (let tool of tools) {
      toolShortcuts[tool.shortcut] = () => setTool(tool.handler);
    }

    return Shortcuts.on({
      "ctrl+shift+z": redo,
      "ctrl+z": undo,
      "ctrl+s": event => {
        event.preventDefault();
        save();
      },
      ...toolShortcuts,
    });
  }, []);

  useEffect(() => {
    Shortcuts.start();
    return () => Shortcuts.stop();
  }, []);

  let activeTool = tool;

  return (
    <div class="app">
      <div class="renderer" ref={renderer.mount} />
      <Regions.Left>
        <Panel>
          <Palette
            activeColor={state.settings.color}
            setColor={setColor}
          />
        </Panel>
      </Regions.Left>
      <Regions.Right>
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
            <a href="https://github.com/danprince/wushi" target="_blank">
              <ToolbarButton title="GitHub">
                <Icons.GitHub />
              </ToolbarButton>
            </a>
            <ToolbarButton
              onClick={save}
              title="Download"
            >
              <Icons.Download/>
            </ToolbarButton>
          </Toolbar>
        </Panel>
      </Regions.Right>
      <Regions.Bottom>
        <Panel>
          <BrushSelector
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
      </Regions.Bottom>
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
