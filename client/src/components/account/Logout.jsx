import { Box, Button, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { FaRegSmileWink } from 'react-icons/fa';

const Logout = () => {
    const toast = useToast()

    const handleClick = ()=>{
      if(!localStorage.getItem("sportEvent")){
        toast({
          title: 'Login First.',
          description: "To Logout, You Need To Login First",
          status: 'warning',
          duration: 6000,
          isClosable: true,
          position: "top",
        }) 
      }else{
        toast({
          title: 'Logout Successfully.',
          description: "",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: "top",
        }) 
      }

        localStorage.removeItem("sportEvent");

          
    }
  return (
    <Box>
        <Box display={'flex'} gap={2} mt={5}>
            <Text mt={-3} mb={8} fontFamily={'cursive'} fontSize={'3xl'}>Come back soon</Text>
            <FaRegSmileWink size={28}/>
        </Box>
        <Button onClick={handleClick} colorScheme='teal' size='md'>Logout</Button>
    </Box>
  )
}

export default Logout