import '../../styles/Menu.css'
import { ChevronLeftIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Avatar, Button, Flex, IconButton, Link, Separator, Text } from "@radix-ui/themes"
import { Logo } from "../atoms/Logo"
import { useUserStore } from "../../stores"
import { useNavigate } from "react-router-dom"

const MenuClosed = ({  onMenuClick } : { onMenuClick: () => void }) => {
  return (
    <Flex direction='column' justify='between' p='6' height='100vh' position='sticky' top='0' className='menu'>
      <IconButton variant='ghost' onClick={onMenuClick}>
        <HamburgerMenuIcon width='24' height='24' />
      </IconButton>
    </Flex>
  )
}

const MenuOpen = ({ username, onMenuClick, onLogout } : { username: string, onMenuClick: () => void, onLogout: () => void } ) => {
  const fallback = username.slice(0,1);

  return (
    <Flex direction='column' justify='between' p='6' minWidth='240px' height='100vh' position='sticky' top='0' className='menu'>
      <Flex direction='column'>
        <Flex direction='row' align='stretch' gap='4' py='4'>
          <IconButton variant='ghost' onClick={onMenuClick}>
            <ChevronLeftIcon width='24' height='24' />
          </IconButton>
          <Logo />
        </Flex>
        <Flex direction='row' gap='4' align='center'>
          <Avatar size='4' fallback={fallback} />
          <Text size='4'>{username}</Text>
        </Flex>
        <Separator orientation='horizontal' size='4' my='4'></Separator>
        <Flex direction='column' display='flex' gap='4'>
          <Link href='/home'>Home</Link>
          <Link href='/my-images'>My Images</Link>
        </Flex>
      </Flex>
      <Button variant='outline' onClick={onLogout}>Log out</Button>
    </Flex>
  )

}

export const Menu = ({ username } : { username: string }) => {
  const isOpen = useUserStore((state) => state.menuOpen);
  const toggleMenu = useUserStore((state) => state.toggleMenu);
  const navigate = useNavigate();
  const reset = useUserStore((state) => state.reset);

  const handleMenuClick = () => {
    toggleMenu()
  };

  const handleLogout = () => {
    reset()
    navigate('/')
  }

  if (!isOpen) return (<MenuClosed onMenuClick={handleMenuClick} />)

  return <MenuOpen username={username} onMenuClick={handleMenuClick} onLogout={handleLogout} />
}