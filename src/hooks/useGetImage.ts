import { useQuery } from "@tanstack/react-query"
import { getImage } from "../services"
import { imageAdapter } from "./adapters"

export const useGetImage = ({ id } : { id: number }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['image'],
    queryFn: () => getImage({ id }),
    select: imageAdapter,
  })

  return { data, isLoading, error }
}