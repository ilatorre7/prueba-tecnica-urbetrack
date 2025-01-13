import { useInfiniteQuery } from "@tanstack/react-query"
import { getImages } from "../services"
import { imagesAdapter } from "./adapters"

export const useGetImages = () => {
  const { data, status, isFetchingNextPage, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ['images'],
    queryFn: getImages,
    select: imagesAdapter,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => lastPage.length > 0 ? allPages.length + 1 : undefined,
  })

  return { data, status, isFetchingNextPage, error, fetchNextPage }
}