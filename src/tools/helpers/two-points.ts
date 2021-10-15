import { Point } from "../../editor";
import { Renderer } from "../../renderer";

export class TwoPointsTool {
  private start: Point | null = null;
  private end: Point | null = null;

  constructor(
    private renderer: Renderer,
    private onPreview: () => void,
    private onCreate: () => void,
  ) {
    let container = this.renderer.container as HTMLElement;
    container.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("pointermove", this.onPointerMove);
  }

  stop() {
    let container = this.renderer.container as HTMLElement;
    container.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("pointermove", this.onPointerMove);
  }

  getPoints() {
    return [this.start!, this.end!];
  }

  private onPointerDown = (event: PointerEvent) => {
    if (!this.start) {
      this.start = this.end = this.renderer.clientToCanvas(event.clientX, event.clientY);
      this.onPreview();
    }
  }

  private onPointerUp = (event: PointerEvent) => {
    if (this.start) {
      this.end = this.renderer.clientToCanvas(event.clientX, event.clientY);
      this.onCreate();
      this.start = this.end = null;
    }
  }

  private onPointerMove = (event: PointerEvent) => {
    if (this.start) {
      this.end = this.renderer.clientToCanvas(event.clientX, event.clientY);
      this.onPreview();
    }
  }
}

