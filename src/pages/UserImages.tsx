import { Layout } from "../components/Layout";
import { ImageCardList } from "../components/organisms/ImageCardList";
import { Flex, Heading, Link, Text } from "@radix-ui/themes";
import { useUserStore } from "../stores";

export const UserImages = () => {
  const images = useUserStore((state) => state.bookmarkedImages);

  const isEmpty = images.length === 0;

  return (
    <Layout>
      <Flex direction='column' p='6' width='100%'>
        <Heading size='8' mb='4'>My Images</Heading>
        { isEmpty ? 
          <Flex direction='column' justify='center' align='center' gap='4' height='100%'>
            <Text size='4'>Oops, seems you have no bookmarked pictures</Text>
            <Link size='4' href='/home'>Go to home and start saving some!</Link>
          </Flex> 
          : 
          <ImageCardList images={images} /> 
        }
      </Flex>
    </Layout>
  )
}