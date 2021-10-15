import { getStroke } from "perfect-freehand";
import { Point } from "./state";

export function pointsToPerfectPath(points: Point[], size: number) {
  if (points.length === 0) {
    return "";
  }

  let stroke = getStroke(points, {
    thinning: 0.5,
    size,
  });

  if (stroke.length === 0) {
    return "";
  }

  let [startX, startY] = stroke[0];
  let cmds = ["M", startX, startY, "Q"];

  for (let i = 0; i < stroke.length; i++) {
    let [x0, y0] = stroke[i];
    let [x1, y1] = stroke[(i + 1) % stroke.length];
    let cpx = (x0 + x1) / 2;
    let cpy = (y0 + y1) / 2;

    cmds.push(
      x0.toFixed(2),
      y0.toFixed(2),
      cpx.toFixed(2),
      cpy.toFixed(2),
    );
  }

  cmds.push("Z");

  return cmds.join(" ");
}

export function pointsToSimplePath(points: Point[]) {
  if (points.length === 0) {
    return "";
  }

  points = simplifyPoints(points);

  let start = points[0];
  let end = points[points.length - 1];
  let cmds = ["M", ...start];

  if (points.length > 1) {
    cmds.push("Q");
  } else {
    cmds.push("Z");
  }

  for (let i = 0; i < points.length - 1; i++) {
    let [x1, y1] = points[i];
    let [x2, y2] = points[i + 1];
    let cx = (x2 + x1) / 2;
    let cy = (y2 + y1) / 2;
    cmds.push(cx, cy, x2, y2)
  }

  return cmds.join(" ");
}

export function simplifyPoints(points: Point[], minDistance = 1): Point[] {
  if (points.length === 0) {
    return [];
  }

  let stack = [...points];
  let prev = stack.shift()!;
  let path = [prev];

  while (stack.length) {
    let point = stack.shift()!;

    let dist = Math.hypot(
      point[0] - prev[0],
      point[1] - prev[1],
    );

    if (dist < minDistance) {
      continue;
    }

    prev = point;
    path.unshift(point);
  }

  return path;
}

