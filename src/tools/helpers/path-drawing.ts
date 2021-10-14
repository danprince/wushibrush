import { Point } from "../../editor";
import { Renderer } from "../../renderer/renderer";

export class PathDrawingTool {
  private _points: Point[] = [];
  private _active = false;

  get points() {
    return this._points;
  }

  get active() {
    return this._active;
  }

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

  private onPointerDown = (event: PointerEvent) => {
    if (!this._active) {
      let point = this.renderer.clientToCanvas(event.clientX, event.clientY);
      this._active = true;
      this._points = [point];
      this.onPreview();
    }
  }

  private onPointerUp = (event: PointerEvent) => {
    if (this._active) {
      this.onCreate();
      this._active = false;
      this._points = [];
    }
  }

  private onPointerMove = (event: PointerEvent) => {
    if (this._active) {
      let point = this.renderer.clientToCanvas(event.clientX, event.clientY);
      this._points.push(point);
      this.onPreview();
    }
  }
}

