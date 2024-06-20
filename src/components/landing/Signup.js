import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'

import { CustomPaper, CustomTextField, CustomHeading } from '../../customComponents'
import { signupSchema } from '../../schemas/userSchema'
import { yupResolver } from '@hookform/resolvers/yup'

const Signup = () => {

  const { control, handleSubmit } = useForm({ resolver: yupResolver(signupSchema) })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <CustomPaper className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2' >
      <CustomHeading sx={{ fontWeight: 700 }} className='font-extrabold' variant='h5' align='center'>Signup</CustomHeading>
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
    </CustomPaper>
  )
}

export default Signup