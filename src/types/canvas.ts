export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}
type BaseLayer = {
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
};

export type RectangleLayer = {
  type: LayerType.Rectangle;
  value?: string;
} & BaseLayer;

export type EllipseLayer = {
  type: LayerType.Ellipse;
  value?: string;
} & BaseLayer;

export type PathLayer = {
  type: LayerType.Path;
  points: number[][];
  value?: string;
} & BaseLayer;

export type TextLayer = {
  type: LayerType.Text;
  value?: string;
} & BaseLayer;

export type NoteLayer = {
  type: LayerType.Note;
  value?: string;
} & BaseLayer;

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.Translating;
      current: Point;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note;
    }
  | {
      mode: CanvasMode.Pencil;
    }
  | {
      mode: CanvasMode.Pressing;
      origin: Point;
    }
  | {
      mode: CanvasMode.Resizing;
      initialBounds: XYWH;
      corner: Side;
    };

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | NoteLayer;
