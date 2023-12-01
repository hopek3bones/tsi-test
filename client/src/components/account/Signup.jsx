import { Button, Checkbox, Input, useToast } from '@chakra-ui/react'
import axios from "axios";
import { useState } from 'react';

const initState = {
    name: "",
    email: "",
    password: "",
    role: "user"
}

const Signup = () => {
    const [form, setForm] = useState(initState);
    const toast = useToast()

    const handleChange = (e)=>{
        const { name, value, type } = e.target;

        const valueToUpdate = type === "checkbox" ? "organizer" : value;
      
        setForm({
            ...form,
            [name]: valueToUpdate
          });;
    }

    async function createAccount(e){
      e.preventDefault();

      await axios({
        url: "http://localhost:8080/user/signup",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        },
        data: form
      })
        .then((res) => {
            console.log(res.data);
            toast({
              title: 'Account Created Successfully.',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: "top",
            })
        })
        .catch((e) => {
          if(e.response.data === "This email is already in use try with other email."){
            toast({
              title: 'This email is already in use try with other email.',
              status: 'warning',
              duration: 3000,
              isClosable: true,
              position: "top",
            })
          }else{
            toast({
              title: 'Something went worng try again.',
              status: 'warning',
              duration: 3000,
              isClosable: true,
              position: "top",
            })
          }
        });

      setForm({
        name: "",
        email: "",
        password: "",
        role: "user"
      });
    }

  return (
    <>
      <form onSubmit={createAccount}>
        <Input 
          type={"text"}
          onChange={handleChange} 
          value={form.name} 
          name="name" 
          required="required" 
          placeholder='Name'
        />
        <Input 
          type={"email"} 
          onChange={handleChange} 
          value={form.email} 
          name="email" 
          required="required"
          placeholder='Email' 
          mt={10} 
          />
        <Input 
          type={"password"} 
          onChange={handleChange} 
          value={form.password} 
          name="password" 
          required="required"
          placeholder='Password' 
          mt={10} 
        />

        <Checkbox
            mt={10}
            name={'role'}
            onChange={handleChange}
            checked={form.role}
        >Are you a Event Organizer</Checkbox>

        <Button type='submit' mt={20} colorScheme='teal' size='md'>
            Create Account
        </Button>
        
      </form>
    </>
  )
}

export default Signup