/**
 * 预览信息
 * */
export interface PreviewData {
  X: number,
  Y: number,
  Top: number,
  Left: number,
  Width: number,
  Height: number,
}

/**
 * 网格信息
 * */
export interface CanvasData {
  row: number,
  column: number,
  width: number,
  height: number,
}

/**
 * 拖曳卡片信息
 * */

export interface ItemData {
  id: string
  /**
   * 卡片位置
   * */
  position: {
    X: number,
    Y: number,
  }
  /**
   * 卡片大小
   * */
  size: {
    width: number,
    height: number,
  }
  /**
   * 卡片内容
   * */
  content: {
    title: string,
    text: string,
    /**
     * 链接信息
     * */
    url: string,
    /**
     * 图片url
     * */
    IMGurl: string
  }
}

/**
 * 存储卡片信息
 * */

class DragCards <T extends ItemData>  {
  cards = new Map<string, ItemData>();

  set(key: string, data: T): void {
    this.cards.set(key, data);
  }

  remove(key: string): void {
    this.cards.delete(key);
  }

  get(key: string): ItemData | undefined {
    return this.cards.get(key)
  }
}

export const dragCards = new DragCards<ItemData>()








