import { Flex, Progress } from "@radix-ui/themes"

export const LoadingScreen = () => (
  <Flex justify='center' align='center' width='100%' height='100vh'>
    <Flex width='360px' p='2'>
      <Progress size='3' />
    </Flex>
  </Flex>
)
