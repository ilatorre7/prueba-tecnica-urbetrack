import { Grid } from "@radix-ui/themes"
import { ImageCard } from "../molecules/ImageCard"
import { useNavigate } from "react-router-dom"
import { IImage } from "../../types"
import { useBookmarks } from "../../hooks/useBookmarks"

export const ImageCardList = ({ images } : { images: IImage[] }) => {
  const navigate = useNavigate();
  
  const { handleBookmark, isBookmarked } = useBookmarks();

  return (
    <Grid columns='3' gap='3'>
      {images.map((image) => {
        image.bookmarked = isBookmarked(image.id)
        return (
          <ImageCard
            key={image.id}
            onDetailsClick={() => navigate(`/images/${image.id}`)}
            {...image}
            onBookmarkClick={(event) => handleBookmark(image, event)}
          />
        )}
      )}
    </Grid>
  )
}