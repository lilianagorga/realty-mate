import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Flex p="2" borderBottom="1px" borderColor="gray.100" position="relative" style={{ zIndex: 1000 }}>
    <Box fontSize="3xl" color="blue.400" fontWeight="bold" onClick={() => navigate('/')}>
        Home
      </Box>
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
        </MenuList>
      </Menu>
    </Box>
  </Flex>
  )
}

export default Navbar;