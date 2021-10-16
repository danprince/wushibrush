import { Point, Update } from "../editor";

export interface Renderer {
  width: number;
  height: number;
  readonly container: HTMLElement | SVGElement;
  mount(element: HTMLElement | null): void;
  unmount(): void;
  clientToCanvas(clientX: number, clientY: number): Point;
  clear(): void;
  clearPreview(): void;
  resize(width: number, height: number): void;
  update(update: Update): void;
  preview(update: Update): void;
  setCursorSize(size: number): void;
  setCursorPosition(x: number, y: number): void;
  sampleAt(x: number, y: number): [color: string, alpha: number] | null;
  toFile(name: string): Promise<File>;
  toBlob(): Promise<Blob>;
}

