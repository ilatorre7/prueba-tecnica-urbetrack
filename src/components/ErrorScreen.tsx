import { Button, Flex, Heading } from "@radix-ui/themes"

export const ErrorScreen = ({ message, action } : { message: string, action?: { label: string, onClick: () => void} }) => {

  return (
    <Flex direction='column' gap='6' justify='center' align='center' width='100%' height='100vh'>
      <Heading align='center'>{message}</Heading>
      {action && <Button size='4' onClick={action.onClick}>{action.label}</Button>}
    </Flex>
  )
}