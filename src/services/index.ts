import { RawImage } from "../types";

const limit = 10;

export const getImages = async ({ pageParam }: { pageParam: number }): Promise<RawImage[]> => {
  const res = await fetch(`https://picsum.photos/v2/list?page=${pageParam}&limit=${limit}`)
  return res.json()
}

export const getImage = async ({ id } : { id: number }): Promise<RawImage> => {
  const res = await fetch(`https://picsum.photos/id/${id}/info`)
  return res.json()
} 