import { Button, DataList, Flex, IconButton, Link, Skeleton } from "@radix-ui/themes"
import { useGetImage } from "../hooks/useGetImage"
import { useNavigate, useParams } from "react-router-dom";
import '../styles/ImageDetails.css'
import { Layout } from "../components/Layout";
import { BookmarkFilledIcon, BookmarkIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { LoadingScreen } from "../components/molecules/LoadingScreen";
import { useBookmarks } from "../hooks/useBookmarks";
import { IImage } from "../types";
import { ErrorScreen } from "../components/molecules/ErrorScreen";

const ImageDatalist = ({ author, width, height, url } : IImage) => (
  <DataList.Root>
    <DataList.Item align="center">
      <DataList.Label minWidth="88px">Author</DataList.Label>
      <DataList.Value>{author}</DataList.Value>
    </DataList.Item>
    <DataList.Item align="center">
      <DataList.Label minWidth="88px">Width</DataList.Label>
      <DataList.Value>{width}</DataList.Value>
    </DataList.Item>
    <DataList.Item align="center">
      <DataList.Label minWidth="88px">Height</DataList.Label>
      <DataList.Value>{height}</DataList.Value>
    </DataList.Item>
    <DataList.Item align="center">
      <DataList.Label minWidth="88px">URL</DataList.Label>
      <DataList.Value><Link href={url}>{url}</Link></DataList.Value>
    </DataList.Item>
  </DataList.Root>
)

export const ImageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading, 
    error 
  } = useGetImage({ id: parseInt(id!) });

  const { handleBookmark, isBookmarked } = useBookmarks();

  const handleGoBack = () => navigate(-1);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = data!.downloadUrl;
    link.download = 'image.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if(isLoading) return (
    <Layout>
      <LoadingScreen />
    </Layout>
  )

  if(error) return(
    <Layout>
      <ErrorScreen 
        message='There was an error loading the image. Try again later'
        action={{ label: 'Go Back' , onClick: handleGoBack }}
      />
    </Layout>
  )

  return (
    <Layout>
      <Flex direction='column' p='6' gap='4' maxHeight='100vh' width='100%' height='100vh'>
        <Flex direction='row' justify='between' align='center'>
          <IconButton variant='ghost' onClick={handleGoBack}>
            <ChevronLeftIcon height='24' width='24' />
          </IconButton>
          <IconButton onClick={() => handleBookmark(data!)}>
            {isBookmarked(data!.id) ? <BookmarkFilledIcon height='24' width='24' /> : <BookmarkIcon height='24' width='24' />}
          </IconButton>
        </Flex>
        <Flex direction='column' flexGrow='1' overflow='hidden'>
          <Skeleton>
            <img 
              className='details-image' 
              src={`https://picsum.photos/id/${id}/${data?.width}/${data?.height}`}
              alt='Unsplash picture'
            />
          </Skeleton>
        </Flex>
        <Flex direction='row' justify='between' align='end'>
          <ImageDatalist {...data!} />
          <Button size='3' onClick={handleDownload}>Download Image</Button>
        </Flex>
      </Flex>
    </Layout>
  )
}