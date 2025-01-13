import '../styles/ImageCard.css'
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons"
import { Box, Card, Flex, IconButton, Skeleton, Text, Tooltip } from "@radix-ui/themes"
import { IImage } from '../types'
import { MouseEvent } from 'react'

interface ImageCardActions {
  onDetailsClick: () => void, 
  onBookmarkClick: (e: MouseEvent) => void
}

const Bookmark = ({ bookmarked, onClick }: {bookmarked: boolean, onClick: (e: MouseEvent) => void}) => (
  <Tooltip content={bookmarked ? 'Remove Image' : 'Save Image'}>
    <IconButton variant='solid' size='2' className='bookmark-button' onClick={onClick}>
      { bookmarked ? <BookmarkFilledIcon width='18' height='18' /> : <BookmarkIcon width='18' height='18' />}
    </IconButton>
  </Tooltip>
)

export const ImageCard = ({ 
  id, 
  author,
  bookmarked, 
  onDetailsClick, 
  onBookmarkClick
} : IImage & ImageCardActions) => {
  
  return (
    <Box position='relative'>
      <Card className='card' onClick={onDetailsClick}>
        <Bookmark bookmarked={bookmarked} onClick={onBookmarkClick} />
        <Flex direction='column' gap='2'>
          <Skeleton>
            <img 
              src={`https://picsum.photos/id/${id}/${480}/${360}`}
              className='card-image'
              alt='Unsplash picture'
            />
          </Skeleton>
          <Flex direction='column' gap='1'>
            <Text size='3'>by {author}</Text>
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}