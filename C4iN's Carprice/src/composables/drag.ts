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
  position: {
    X: number,
    Y: number,
  }
  size: {
    width: number,
    height: number,
  }
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