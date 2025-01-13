import { InfiniteData } from "@tanstack/react-query";
import { IImage, RawImage } from "../../types";


export const imageAdapter = (image: RawImage) => {
  return {
    id: image.id,
    author: image.author,
    width: image.width,
    height: image.height,
    url: image.url,
    downloadUrl: image.download_url,
    bookmarked: false,
  }
}

export const imagesAdapter = (data: InfiniteData<RawImage[], number>): IImage[] => {
  const images = data?.pages.reduce((acc, cur) => {
    return [...acc, ...cur]
  }, []) || []

  const adaptedImages = images.map(imageAdapter)
  
  return adaptedImages;
}

