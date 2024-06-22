import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Typography, Link } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'

import { CustomPaper, CustomTextField, CustomHeading } from '../../customComponents'
import { signupSchema } from '../../schemas/userSchema'

const Signup = ({ signup, error, setShowLogin }) => {

  const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(signupSchema) })

  const onSubmit = async (data) => {
    try {
      const response = await signup(data)
      const user = response?.data?.user
      if (user) {
        console.log(user)
        setShowLogin(true)
        reset()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <CustomPaper className='flex flex-col gap-2' >
      <CustomHeading sx={{ fontWeight: 700 }} className='font-extrabold' variant='h5' align='center'>Signup</CustomHeading>
      {error && <Typography className='text-red-500 self-center' variant='h6' >{error?.data?.message}</Typography>}
      <CustomTextField
        name={'name'}
        label={'Name'}
        type={'text'}
        control={control}
        isRequired
      />
      <CustomTextField
        name={'email'}
        label={'Email'}
        type={'email'}
        control={control}
        isRequired
      />
      <CustomTextField
        name={'phone'}
        label={'Phone'}
        type={'phone'}
        control={control}
        isRequired
      />
      <CustomTextField
        name={'password'}
        label={'Password'}
        type={'password'}
        control={control}
        isRequired
      />
      <Button
        sx={{ textTransform: 'capitalize', marginTop: '1rem' }}
        className='self-center lowercase'
        color='success'
        variant='contained'
        onClick={handleSubmit(onSubmit)}
      >
        submit
      </Button>
      <div className='text-green-600 self-center mt-2'>
        <Typography className='flex gap-0.5'>Existing user? <Link component={'button'} onClick={() => setShowLogin(true)}>Login</Link></Typography>
      </div>
    </CustomPaper>
  )
}

export default Signup