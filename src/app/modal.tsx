import "./modal.css";
import { ComponentChildren } from "preact";
import { createPortal } from "preact/compat";
import { useRef, useEffect } from "preact/hooks";
import { push } from "../shortcuts";
import { Close } from "./icons";

export function Modal({
  children,
  onClose,
  closeKeys: closeOnShortcut = "escape",
}: {
  children: ComponentChildren,
  onClose: () => any,
  closeKeys?: string,
}) {
  let close = () => onClose();

  let overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return push({
      "escape": close,
      [closeOnShortcut]: close,
    });
  }, []);

  useEffect(() => {
    window.history.pushState(null, "", "");
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  function onClickOverlay(event: MouseEvent) {
    // Only close if overlay was clicked directly
    if (event.target === overlayRef.current) {
      close();
    }
  }

  return createPortal(
    <div class="overlay" onClick={onClickOverlay} ref={overlayRef}>
      <div class="modal">
        <button class="modal-close" onClick={close}>
          <Close />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal")!,
  );
}
