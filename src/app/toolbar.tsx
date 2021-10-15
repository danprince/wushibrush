import "./toolbar.css";
import { VNode } from "preact";

export function Toolbar({ children }: { children: VNode }) {
  return (
    <div className="toolbar">
      {children}
    </div>
  );
}

interface ToolbarButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function ToolbarButton({ active, ...props }: ToolbarButtonProps) {
  let activeClass = "";

  if (active != null) {
    activeClass = active ? `toolbar-button-active` : `toolbar-button-inactive`;
  }

  return (
    <button
      class={`toolbar-button ${activeClass}`}
      {...props}
    />
  );
}
