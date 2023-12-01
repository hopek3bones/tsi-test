import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { GetEventContext } from '../../App'
import axios from 'axios'

const initState = {
  players: []
}

const Home = () => {
  const {eventList, getEventList, setEventList} = useContext(GetEventContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rowSeleted, setRowSelected] = useState(initState);
  const profile = JSON.parse(localStorage.getItem("sportEvent")) || "";
  const toast = useToast();
  const [keyword, setKeyWord] = useState("");

  const handleJoinBtn = async(id)=>{
    if(!profile){
      return toast({
        title: 'Login first.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    }
    if(profile.role === "organizer"){
      return toast({
        title: 'Organizers cannot join.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    }
    await axios({
      url: `http://localhost:8080/event/${id}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: {
        "player" : profile.user
      }
    })
      .then((res) => {
          console.log(res.data);
          getEventList();
          onClose();
          toast({
            title: 'Joined Successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top",
          })
      })
      .catch((e) => {
          toast({
            title: 'Something went worng try again.',
            status: 'warning',
            duration: 3000,
            isClosable: true,
            position: "top",
          })
        }
      );
  }

  const handleSearch = async(e)=>{
    e.preventDefault();
    await axios.get(`http://localhost:8080/event/search?keyword=${keyword}`)
      .then((res)=>{
        setEventList(res.data)
      })
      .catch((e)=>{
        console.log(e)
      })

      setKeyWord("")
  }

  const getAllEvents = (e)=>{
    e.preventDefault();
    getEventList();
  }

  useEffect(()=>{
    getEventList();
  },[])
  
  return (
    <Box w={'90%'} m={'auto'} mt={'100px'}>
      <Text fontFamily={'cursive'} fontSize={'3xl'} mb={10} color={'red'}>Events</Text>
      <Box display={'flex'} gap={5} mb={10}>
        <Input 
          name='keyword'
          value={keyword}
          onChange={(e)=>setKeyWord(e.target.value)}
          placeholder='Search by venue, event type, description or organizer name'
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={getAllEvents}>Get all Events</Button>
        
      </Box>
        <SimpleGrid columns={[1,1,1,3]} gap={10}>
          {
            eventList?.map((el)=>(
              <Box key={el._id} boxShadow='outline' p='6' rounded='md' bg='white' fontFamily={'cursive'}>

                <Box display={'flex'} justifyContent={'space-between'}> 
                  <Text color={'red'} fontSize={'xl'}>{el.venue}</Text>
                  <Text>Date: {el.date}</Text>
                </Box>

                <Box textAlign={'center'} boxShadow='xl' p='6' rounded='md' bg='white' color={'gray'}>{el.desc}</Box>

                <Text textAlign={'left'} mt={3} fontSize={'2xl'}>{el.type}</Text>
                <Text textAlign={'left'} mt={3}>Organizer Name: {el.org_name}</Text>

                <Button mt={3} onClick={()=>{
                  onOpen();
                  setRowSelected(el)
                  }}>More Detail</Button>
              </Box>
            ))
          }
        </SimpleGrid>
        <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Player Limit for the event: {rowSeleted.playersLimit}</ModalHeader>
                <ModalCloseButton />
                <ModalBody fontFamily={'cursive'} >
                  {
                    rowSeleted.players.length === 0 ? 
                    "Be the first one to join the team" : 
                    <Box>
                      <Text mb={5} color={'red'}>List of Players Joined</Text>
                      <Box display={'flex'} gap={10} flexWrap={'wrap'}>
                        {
                          rowSeleted.players?.map((el,i)=><Box key={i}>{el}</Box>)
                        }
                      </Box>
                    </Box>
                  }
                  
                </ModalBody>

                <ModalFooter>
                <Button
                  onClick={() => {
                    handleJoinBtn(rowSeleted._id)
                  }}
                  colorScheme="whatsapp"
                >
                  Join
                </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    </Box>
  )
}

export default Home