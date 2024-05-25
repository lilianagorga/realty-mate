import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, Button, useTheme } from '@chakra-ui/react';
import { AiOutlineMail, AiOutlineSearch } from 'react-icons/ai';
import { MdHome, MdAttachMoney } from 'react-icons/md';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Flex 
      p="2" 
      borderBottom="1px" 
      borderColor={theme.colors.navbar[100]}
      style={{ zIndex: 1000 }} 
      as="nav"
      position="fixed"
      top="0"
      w="100%"              
      zIndex="1000"         
      bg={theme.colors.navbar[200]}
      shadow="sm"  
    >
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
        mr="2"
      >
        Contact
      </Button>
      <Button
          leftIcon={<FcAbout />}
          colorScheme="purple"
          variant="outline"
          fontSize="xl"
          fontWeight="bold"
          onClick={() => navigate('/about')}
          mr="2"
        >
          About
        </Button>
        <Button
          leftIcon={<MdAttachMoney />}
          colorScheme="yellow"
          variant="outline"
          fontSize="xl"
          fontWeight="bold"
          onClick={() => navigate('/pricing')}
        >
          Pricing
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
          <MenuItem icon={<FcAbout />} onClick={() => navigate('/about')}>
              About
            </MenuItem>
            <MenuItem icon={<MdAttachMoney />} onClick={() => navigate('/pricing')}>
              Pricing
            </MenuItem>
          <MenuItem icon={<FiKey />} onClick={() => navigate('/search?purpose=for-sale')}>
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