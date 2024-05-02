import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, Button } from '@chakra-ui/react';
import { AiOutlineMail, AiOutlineSearch } from 'react-icons/ai';
import { MdHome } from 'react-icons/md';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Flex p="2" borderBottom="1px" borderColor="gray.100" position="relative" style={{ zIndex: 1000 }}>
    <Button
        leftIcon={<MdHome />}
        colorScheme="teal"
        variant="outline"
        fontSize="xl"
        fontWeight="bold"
        onClick={() => navigate('/')}
        mr="2"
      >
        Home
      </Button>
      <Button
        leftIcon={<AiOutlineSearch />}
        colorScheme="green"
        variant="outline"
        fontSize="xl"
        fontWeight="bold"
        onClick={() => navigate('/search')}
        mr="2"
      >
        Search
      </Button>
      <Button
        leftIcon={<AiOutlineMail />}
        colorScheme="blue"
        variant="outline"
        fontSize="xl"
        fontWeight="bold"
        onClick={() => navigate('/contact')}
      >
        Contact
      </Button>
    <Spacer />
    <Box>
      <Menu>
        <MenuButton as={IconButton} icon={<FcMenu />} variant="outlined" color="red.400" />
        <MenuList>
          <MenuItem icon={<FcHome />} onClick={() => navigate('/')}>
            Home
          </MenuItem>
          <MenuItem icon={<BsSearch />} onClick={() => navigate('/search')}>
            Search
          </MenuItem>
          <MenuItem icon={<FcAbout />} onClick={() => navigate('/search?purpose=for-sale')}>
            Buy Property
          </MenuItem>
          <MenuItem icon={<FiKey />} onClick={() => navigate('/search?purpose=for-rent')}>
            Rent Property
          </MenuItem>
          <MenuItem icon={<AiOutlineMail />} onClick={() => navigate('/contact')}>
              Contact
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  </Flex>
  )
}

export default Navbar;