import React from 'react'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { CgProfile } from 'react-icons/cg';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';

function Account() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button ref={btnRef} colorScheme='white' variant='outline' onClick={onOpen}>
        <CgProfile size={28}/>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent height="74%  !important">
          <DrawerCloseButton />
          <DrawerHeader fontFamily={'cursive'} fontSize={'2xl'} color={'red'}>Sport Events</DrawerHeader>

          <DrawerBody>
              <Tabs size='md' variant='enclosed'>

                <TabList>
                  <Tab fontWeight="bold">Signup</Tab>
                  <Tab fontWeight="bold">Login</Tab>
                  <Tab fontWeight="bold">Logout</Tab>
                </TabList>

                <TabPanels>

                  <TabPanel>
                    <Signup />
                  </TabPanel>

                  <TabPanel>
                    <Login />
                  </TabPanel>

                  <TabPanel>
                    <Logout />
                  </TabPanel>

                </TabPanels>

              </Tabs>
            </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Account;