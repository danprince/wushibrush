import "./regions.css";
import { VNode } from "preact"

type Props = { children: VNode | VNode[] };

export const Left = (props: Props) => (
  <div className="region region-left" {...props} />
);

export const Center = (props: Props) => (
  <div className="region region-center" {...props} />
);

export const Right = (props: Props) => (
  <div className="region region-right" {...props} />
);

export const Bottom = (props: Props) => (
  <div className="region region-bottom" {...props} />
);

export const Top = (props: Props) => (
  <div className="region region-top" {...props} />
);
