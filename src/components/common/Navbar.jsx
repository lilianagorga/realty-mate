import React, { useContext } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, Button, useTheme, useMediaQuery } from '@chakra-ui/react';
import { AiOutlineMail, AiOutlineSearch } from 'react-icons/ai';
import { MdHome, MdAttachMoney } from 'react-icons/md';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { token, logout } = useContext(AuthContext);

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
        display={isLargerThan768 ? 'flex' : 'none'}
      >
        Home
      </Button>
      <Button
        leftIcon={<AiOutlineSearch />}
        colorScheme="green"
        variant="outline"
        fontSize="xl"
        fontWeight="bold"
        onClick={() => navigate('/properties')}
        mr="2"
        display={isLargerThan768 ? 'flex' : 'none'}
      >
        Properties
      </Button>
      <Button
        leftIcon={<AiOutlineMail />}
        colorScheme="blue"
        variant="outline"
        fontSize="xl"
        fontWeight="bold"
        onClick={() => navigate('/contact')}
        mr="2"
        display={isLargerThan768 ? 'flex' : 'none'}
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
          display={isLargerThan768 ? 'flex' : 'none'}
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
          mr="2"
          display={isLargerThan768 ? 'flex' : 'none'}
        >
          Pricing
        </Button>
        {token ? (
          <>
            <Button
              leftIcon={<BsSearch />}
              colorScheme="blue"
              variant="outline"
              fontSize="xl"
              fontWeight="bold"
              onClick={() => navigate('/myProperties')}
              mr="2"
              display={isLargerThan768 ? 'flex' : 'none'}
            >
              My Properties
            </Button>
            <Button
              leftIcon={<BsSearch />}
              colorScheme="blue"
              variant="outline"
              fontSize="xl"
              fontWeight="bold"
              onClick={() => navigate('/addProperty')}
              mr="2"
              display={isLargerThan768 ? 'flex' : 'none'}
            >
              Add Property
            </Button>
            <Button
              leftIcon={<FiKey />}
              colorScheme="red"
              variant="outline"
              fontSize="xl"
              fontWeight="bold"
              onClick={logout}
              display={isLargerThan768 ? 'flex' : 'none'}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            leftIcon={<FiKey />}
            colorScheme="teal"
            variant="outline"
            fontSize="xl"
            fontWeight="bold"
            onClick={() => navigate('/login')}
            mr="2"
            display={isLargerThan768 ? 'flex' : 'none'}
          >
            Login
          </Button>
        )}
    <Spacer />
    <Box>
      <Menu>
        <MenuButton as={IconButton} icon={<FcMenu />} variant="outlined" color="red.400" />
        <MenuList>
          <MenuItem icon={<FcHome />} onClick={() => navigate('/')}>
            Home
          </MenuItem>
          <MenuItem icon={<BsSearch />} onClick={() => navigate('/properties')}>
            Properties
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
          {token ? (
            <>
              <MenuItem icon={<BsSearch />} onClick={() => navigate('/myProperties')}>My Properties</MenuItem>
              <MenuItem icon={<BsSearch />} onClick={() => navigate('/addProperty')}>Add Property</MenuItem>
              <MenuItem icon={<FiKey />} onClick={logout}>Logout</MenuItem>
            </>
          ) : (
            <MenuItem icon={<FiKey />} onClick={() => navigate('/login')}>Login</MenuItem>
          )}
        </MenuList>
      </Menu>
    </Box>
  </Flex>
  )
}

export default Navbar;