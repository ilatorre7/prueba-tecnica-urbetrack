import '../styles/ImageCard.css'
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons"
import { Box, Card, Flex, IconButton, Skeleton, Text, Tooltip } from "@radix-ui/themes"
import { IImage } from '../types'
import { MouseEvent } from 'react'

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
} : IImage & {
  onDetailsClick: () => void, 
  onBookmarkClick: (e: MouseEvent) => void
}) => {
  
  return (
    <Box position='relative'>
      <Card onClick={onDetailsClick}>
        <Bookmark bookmarked={bookmarked} onClick={onBookmarkClick} />
        <Flex direction='column' gap='2'>
          <Skeleton>
            <img 
              src={`https://picsum.photos/id/${id}/${480}/${360}`}
              style={{
                display: 'block',
                objectFit: 'cover',
                width: '100%',
                height: 360,
              }}
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