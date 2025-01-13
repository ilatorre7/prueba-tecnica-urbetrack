import { create } from 'zustand'
import { IImage } from '../types'
import { persist } from 'zustand/middleware';

interface State {
  username: string,
  menuOpen: boolean,
  bookmarkedImages: IImage[],
  bookmarkedIds: string[]
}

interface Action {
  setUsername: (username: string) => void,
  addImage: (image: IImage) => void,
  removeImage: (image: IImage) => void,
  reset: () => void,
  toggleMenu: () => void
}

const initialState: State = {
  username: '',
  menuOpen: false,
  bookmarkedImages: [],
  bookmarkedIds: []
}

export const useUserStore = create<State & Action>()(
  persist(
    (set) => ({
      ...initialState,
      setUsername: (username: string) => set(() => ({ username: username })),
      addImage: (image: IImage) => set((state) => ({ 
        bookmarkedImages: [ ...state.bookmarkedImages, image ],
        bookmarkedIds: [ ...state.bookmarkedIds, image.id ]
      })),
      removeImage: (image: IImage) => set((state) => ({
        bookmarkedImages: state.bookmarkedImages.filter((i) => i.id != image.id),
        bookmarkedIds: state.bookmarkedIds.filter((i) => i != image.id)
      })),
      reset:() => set(initialState),
      toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen }))
    }),
    {
      name: 'user'
    }
  )
)

