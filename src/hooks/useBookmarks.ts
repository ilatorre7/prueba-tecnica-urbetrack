import { MouseEvent } from "react";
import { useUserStore } from "../stores";
import { IImage } from "../types";

export const useBookmarks = () => {
  const bookmarkedIds = useUserStore((state) => state.bookmarkedIds);
  const addImage = useUserStore((state) => state.addImage);
  const removeImage = useUserStore((state) => state.removeImage);

  const handleBookmark = (image: IImage, e?: MouseEvent) => {
    if(e){
      e.stopPropagation();
    }
    if(image.bookmarked){
      removeImage(image)
    } else {
      addImage(image)
    }
    image.bookmarked = !image.bookmarked
  }

  const isBookmarked = (id: string) => {
    return bookmarkedIds.includes(id)
  }

  return { handleBookmark, isBookmarked }
}