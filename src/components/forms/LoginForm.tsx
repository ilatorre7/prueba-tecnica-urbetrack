import { Button, Flex, IconButton, Text, TextField } from '@radix-ui/themes'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { MouseEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores'
import { Logo } from '../atoms/Logo'

interface IFormLogin {
  username: string,
  password: string
}

export const LoginForm = () => {
  const [visible, setVisible] = useState(false);

  const { 
    register,
    formState: { 
      errors,
      isSubmitSuccessful,
    },
    reset,
    handleSubmit 
  } = useForm<IFormLogin>();

  const navigate = useNavigate();

  const setUsername = useUserStore((state) => state.setUsername);

  const handleVisibleClick = (e: MouseEvent) => {
    e.preventDefault();
    setVisible((visible) => !visible)
  };

  const passwordInputType = (() => { 
    return visible ? 'text' : 'password';
  })();

  const VisibleIcon = () => (
    visible ? <EyeClosedIcon width={16} height={16} /> : <EyeOpenIcon width={16} height={16} />
  );

  function capitalizeLetter(s: string) {
    if (s.length === 0) return s; 
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  const validatePassword = (password: string, username: string) => {
    return password === `123${capitalizeLetter(username)}`
  }

  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    reset();
    setUsername(data.username);
    setTimeout(() => {
      navigate('/home')
    }, 1500)
  }

  const UsernameInput = () => (
    <>
      <TextField.Root 
        {...register('username', { pattern: /^[a-z]+$/ })}
        size='3'
        placeholder='User'
        required
      />
      {errors.username?.type && <Text size='1' color='red'>Username must be in lowercase and cannot include numbers</Text>}
    </>
  )

  const PasswordInput = () => (
    <>
      <TextField.Root 
        {...register('password', { validate: (value, values) => validatePassword(value, values.username) }) } 
        size='3' 
        type={passwordInputType} 
        placeholder='Password' 
        required
      >
        <TextField.Slot side='right'>
          <IconButton size='3' type='button' variant='ghost' onClick={handleVisibleClick}>
            <VisibleIcon />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
      {errors.password?.type && <Text size='1' color='red'>Password is incorrect. Try again</Text>}
    </>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction='column' gap='4' width={{ sm: '100%', md: '420px' }} maxWidth='480px'>
        <Flex justify='center' width='100%'>
          <Logo />
        </Flex>
        <Flex direction='column' gap='2' justify='center'>
          <UsernameInput />
          <PasswordInput />
        </Flex>
        <Button type='submit' size='3'>Login</Button>
        {isSubmitSuccessful && <Text size='1' color='green' wrap='wrap'>Log in successful! You'll be redirected to the home page</Text>}
      </Flex>
    </form>
  )
}