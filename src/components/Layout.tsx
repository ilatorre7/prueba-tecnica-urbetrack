import { Flex } from "@radix-ui/themes"
import { Menu } from "./molecules/Menu"
import { useUserStore } from "../stores"

export const Layout = ({ children } : { children: React.ReactNode }) => {
  const username = useUserStore((state) => state.username);
  
  return (
    <>
      <main>
        <Flex direction='row' minHeight='100vh'>
          <Menu username={username} />
          { children }
        </Flex>
      </main>
    </>
  )
}