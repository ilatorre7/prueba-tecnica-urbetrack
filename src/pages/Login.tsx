import { Flex } from '@radix-ui/themes'
import { LoginForm } from '../components/forms/LoginForm'

export const Login = () => {
  
  return (
    <Flex justify='center' align='center' height='100vh'>
      <LoginForm />
    </Flex>
  )
}