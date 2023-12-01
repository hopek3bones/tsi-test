import { Button, 
    FormLabel, 
    Input, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay,
    Textarea, 
    useDisclosure,
    useToast
} from "@chakra-ui/react"
import axios from "axios";
import { useContext, useState } from "react";
import { GetEventContext } from "../App";

const profile = JSON.parse(localStorage.getItem("sportEvent")) || "";

const initState = {
    desc: "",
    date: "",
    venue: "",
    playersLimit: 0,
    type: "",
    org_id: profile.id,
    org_name: profile.user
}

function CreateEvent() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [eventDetail, setEventDetail] = useState(initState);
    const toast = useToast();
    const {getEventList} = useContext(GetEventContext);

    const handleChange = (e)=>{
      const {name, value} = e.target;

      setEventDetail({
        ...eventDetail,
        [name]: value
      });

    }

    const handleSubmit = async(e)=>{
      e.preventDefault();
      await axios({
        url: "http://localhost:8080/event",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        },
        data: eventDetail
      })
        .then((res) => {
            console.log(res.data);
            getEventList();
            toast({
              title: 'Event Created Successfully.',
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

      setEventDetail(initState)
    }
  
    return (
      <>
        <Button colorScheme='white' variant='outline' onClick={onOpen}>Create Event</Button>
  
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontFamily={"cursive"} color={'red'}>Create New Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <form onSubmit={handleSubmit}>
                  <Textarea
                    name="desc"
                    value={eventDetail.desc}
                    onChange={handleChange} 
                    mb={5} 
                    placeholder='Add description about your event.' 
                  />

                  <FormLabel>Date Of Event</FormLabel>
                  <Input
                    name="date"
                    value={eventDetail.date}
                    onChange={handleChange}  
                    mb={5} 
                    type="date"
                  />

                  <FormLabel>Venue</FormLabel>
                  <Input
                    name="venue"
                    value={eventDetail.venue}
                    onChange={handleChange}  
                    mb={5} 
                  />
                  
                  <FormLabel>Player Limit</FormLabel>
                  <Input
                    name="playersLimit"
                    value={eventDetail.playersLimit}
                    onChange={handleChange}  
                    mb={5} 
                    type="number" 
                    placeholder="Players Limit"
                  />

                  <FormLabel>Event Type</FormLabel>
                  <Input
                    name="type"
                    value={eventDetail.type}
                    onChange={handleChange}  
                    mb={5} 
                    type="text" 
                    placeholder="Ex: cricket, football, etc..."
                  />

                  <Button type={"submit"}>Create Event</Button>

                </form>
                
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default CreateEvent;