import { useInView } from "react-intersection-observer";

import { Layout } from "../components/Layout";
import { ImageCardList } from "../components/organisms/ImageCardList";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useEffect } from "react";
import { useGetImages } from "../hooks/useGetImages";
import { LoadingScreen } from "../components/molecules/LoadingScreen";
import { ErrorScreen } from "../components/molecules/ErrorScreen";

export const Home = () => {
  const { ref, inView } = useInView();
  const { data = [], status, isFetchingNextPage, error, fetchNextPage } = useGetImages()

  useEffect(() => {
    if(inView){
      fetchNextPage();
    }
  }, [inView, fetchNextPage])

  if(status === 'pending') return (
    <Layout>
      <LoadingScreen />
    </Layout>
  )
  
  if(error) return (
    <Layout>
      <ErrorScreen message='There was an error retrieving the images. Try again later' />
    </Layout>
  )

  return (
    <Layout>
      <Flex direction='column' p='6' width='100%'>
        <Heading size='8' mb='4'>Home</Heading>
        <ImageCardList images={data} />
        <Flex ref={ref} py='4' justify='center'>{<Spinner size='3' loading={isFetchingNextPage} />}</Flex>
      </Flex>
    </Layout>
  )
}