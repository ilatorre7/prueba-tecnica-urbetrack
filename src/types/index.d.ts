export interface RawImage {
  id: string,
  author: string,
  width: number,
  height: number,
  url: string,
  download_url: string
}

export interface IImage {
  id: string,
  author: string,
  width: number,
  height: number,
  url: string,
  downloadUrl: string
  bookmarked: boolean
}