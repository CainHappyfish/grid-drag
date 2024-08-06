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
export interface GridData {
  Width: number,
  Height: number,
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