import { Renderer } from ".";
import { Point, Update } from "../editor";

/**
 * TODO: Might be possible to have real eraser using the feComposite filter.
 */

export class SvgRenderer implements Renderer {
  width: number;
  height: number;

  readonly container = h("svg");
  private viewGroup = h("g", { class: "view" });
  private previewGroup = h("g", { class: "preview" });

  private cursor = h("g", {
    class: "cursor",
    display: "none",
  });

  constructor(
    width: number,
    height: number,
  ) {
    this.width = width;
    this.height = height;
    this.resize(width, height);
    this.container.append(this.viewGroup, this.previewGroup, this.cursor);
    this.container.style.cursor = "none";
  }

  mount = (element: HTMLElement | null) => {
    if (element) {
      element.append(this.container);
    } else {
      this.unmount();
    }
  }

  unmount = () => {
    this.container.remove();
  }

  clear() {
    this.viewGroup.innerHTML = "";
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.container.setAttribute("width", `${width}`);
    this.container.setAttribute("height", `${height}`);
  }

  clientToCanvas(clientX: number, clientY: number): Point {
    let rect = this.container.getBoundingClientRect();
    return [clientX - rect.x, clientY - rect.y];
  }

  clearPreview() {
    this.previewGroup.innerHTML = "";
  }

  update(update: Update) {
    this.apply(this.viewGroup, update);
  }

  preview(update: Update) {
    this.clearPreview();
    this.apply(this.previewGroup, update);
  }

  private apply(element: SVGElement, update: Update) {
    switch (update.type) {
      case "path": {
        if ("fillColor" in update) {
          element.append(
            h("path", {
              "d": update.path,
              "opacity": update.opacity,
              "fill": update.fillColor,
            })
          );
        } else {
          element.append(
            h("path", {
              "d": update.path,
              "opacity": update.opacity,
              "fill": "none",
              "stroke": update.strokeColor,
              "stroke-width": update.strokeWidth,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            })
          );
        }

        break;
      }

      case "erase": {
        element.append(
          h("path", {
            d: update.path,
            fill: "white", // TODO
          })
        );
        break;
      }

      case "circle": {
        element.append(
          h("circle", {
            "cx": update.x,
            "cy": update.y,
            "r": update.r,
            "opacity": update.opacity.toString(),
            "stroke": update.strokeColor,
            "fill": "none",
            "stroke-width": update.strokeWidth,
          })
        );

        break;
      }
    }
  }

  setCursorSize(size: number) {
    this.cursor.innerHTML = "";
    this.cursor.append(createCursor(size));
  }

  setCursorPosition(x: number, y: number) {
    this.cursor.setAttribute("transform", `translate(${x} ${y})`);

    // Remove display: none so that cursor is visible
    if (this.cursor.hasAttribute("display")) {
      this.cursor.removeAttribute("display");
    }
  }

  sampleAt(x: number, y: number) {
    let rect = this.container.getBoundingClientRect();

    // Make point relative to root
    let clientX = rect.x + x;
    let clientY = rect.y + y;
    let element = document.elementFromPoint(clientX, clientY);

    if (element instanceof SVGElement) {
      return element.getAttribute("fill");
    } else {
      return null;
    }
  }

  async toFile() {
    let root = h("svg", {
      width: this.width,
      height: this.height,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${this.width} ${this.height}`,
    });

    root.innerHTML = this.viewGroup.innerHTML;

    let body = root.outerHTML;

    return new File([body], "download.svg", {
      type: "image/svg+xml",
    });
  }
}

function h(tag: string, attrs: { [key: string]: string | number } = {}) {
  let element = document.createElementNS("http://www.w3.org/2000/svg", tag);

  for (let key in attrs) {
    element.setAttribute(key, attrs[key] as string);
  }

  return element;
}

function createCursor(size: number) {
  let r = size / 2;
  let pad = 3;
  let len = 6;

  let circle = (r: number, stroke: string) =>
    h("circle", { r, fill: "none", stroke });

  let rect = (x: number, y: number, width: number, height: number) =>
    h("rect", { x, y, width, height, fill: "black", stroke: "white" });

  let g = h("g");

  g.append(
    circle(r, "black"),
    circle(r + 1, "white"),
    rect(0, -r-pad-len, 2, len),
    rect(0, r+pad, 2, len),
    rect(r+pad, 0, len, 2),
    rect(-r-pad-len, 0, len, 2),
  );

  return g;
}

