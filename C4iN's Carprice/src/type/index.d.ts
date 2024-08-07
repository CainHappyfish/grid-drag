interface DragItem {
  key: string;
  title: string;
  column: number;
  row: number;
}

export interface DragItemData extends DragItem {
  id: number;
  x: number;
  y: number;
  left?: number;
  top?: number;
}


