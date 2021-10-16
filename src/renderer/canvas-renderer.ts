import { Renderer } from ".";
import { Point, Update } from "../editor";

export class CanvasRenderer implements Renderer {
  width: number;
  height: number;
  private resolution: number;

  private cursorCanvas = document.createElement("canvas");
  private cursorCtx = this.cursorCanvas.getContext("2d")!;

  private previewCanvas = document.createElement("canvas");
  private previewCtx = this.previewCanvas.getContext("2d")!;

  private canvas = document.createElement("canvas");
  private ctx = this.canvas.getContext("2d")!;

  readonly container = document.createElement("div");

  private cursorSize = 10;
  private cursorPosition: Point | null = null;

  constructor(
    width: number,
    height: number,
    resolution = window.devicePixelRatio,
  ) {
    this.width = width;
    this.height = height;
    this.resolution = resolution;
    this.resize(width, height);

    this.container.style.position = "relative";
    this.container.style.cursor = "none";

    for (let canvas of [this.canvas, this.previewCanvas, this.cursorCanvas]) {
      canvas.style.position = "absolute";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      this.container.append(canvas);
    }
  }

  mount = (element: HTMLElement | null) => {
    if (element) {
      element.append(this.container);
    } else {
      this.unmount();
    }
  }

  unmount() {
    this.container.remove();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.previewCanvas.width =
      this.canvas.width =
      this.cursorCanvas.width =
      this.width * this.resolution;

    this.previewCanvas.height =
      this.canvas.height =
      this.cursorCanvas.height =
      this.height * this.resolution;

    this.cursorCtx.scale(this.resolution, this.resolution);
    this.previewCtx.scale(this.resolution, this.resolution);
    this.ctx.scale(this.resolution, this.resolution);

    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;
  }

  clearPreview() {
    this.previewCtx.clearRect(0, 0, this.width, this.height);
  }

  update(update: Update) {
    this.apply(this.ctx, update);
  }

  preview(update: Update) {
    this.clearPreview();
    this.apply(this.previewCtx, update);
  }

  clientToCanvas(clientX: number, clientY: number): Point {
    let rect = this.previewCanvas.getBoundingClientRect();
    return [clientX - rect.left, clientY - rect.top];
  }

  private apply(ctx: CanvasRenderingContext2D, update: Update) {
    ctx.save();

    switch (update.type) {
      case "path": {
        ctx.globalAlpha = update.opacity;

        if ("fillColor" in update) {
          ctx.fillStyle = update.fillColor;
          ctx.fill(new Path2D(update.path));
        } else {
          ctx.strokeStyle = update.strokeColor;
          ctx.lineWidth = update.strokeWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke(new Path2D(update.path));
        }
        break;
      }

      case "erase": {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fill(new Path2D(update.path));
        break;
      }

      case "circle": {
        let { x, y, r } = update;
        ctx.lineWidth = update.strokeWidth;
        ctx.strokeStyle = update.strokeColor;
        ctx.globalAlpha = update.opacity;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, false);
        ctx.stroke();
        break;
      }
    }

    ctx.restore();
  }

  sampleAt(x: number, y: number): [string, number] {
    let imageData = this.ctx.getImageData(x, y, 1, 1);
    let [r, g, b, a] = imageData.data;
    let color =  `rgb(${r}, ${g}, ${b})`;
    return [color, a];
  }

  setCursorSize(size: number) {
    this.cursorSize = size;
    this.drawCursor();
  }

  setCursorPosition(x: number, y: number) {
    this.cursorPosition = [x, y];
    this.drawCursor();
  }

  drawCursor() {
    if (this.cursorPosition == null) {
      return;
    }

    let r = this.cursorSize / 2;
    let [cx, cy] = this.cursorPosition;
    let pad = 3;
    let len = 6;
    let sw = 0.8;

    let ctx = this.cursorCtx;
    ctx.save();
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.translate(cx, cy);

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2, false);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, r + 1, 0, Math.PI * 2, false);
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(r+pad, 0, len, sw);
    ctx.rect(-r-pad, 0, -len, sw);
    ctx.rect(0, r+pad, sw, len);
    ctx.rect(0, -r-pad, sw, -len);
    ctx.fillStyle = "black";
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  async toFile(name: string) {
    let blob = await this.toBlob();
    return new File([blob], `${name}.png`, {
      type: "image/png",
    });
  }

  toBlob() {
    return new Promise<Blob>(resolve => {
      return this.canvas.toBlob(blob => resolve(blob!));
    });
  }
}
