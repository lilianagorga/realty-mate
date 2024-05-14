import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7f8f9', 
    },
    team: {
      100: '#f7f9fc',
      200: '#ff6922',
      300: '#108be7',
      400: '#2d3954',
      500: '#f4f5f7',
      600: '#27ae60'
    },
    heading: {
      100: '#2d3954',
      200: '#72809d'
    },
    price: {
      100: '#dc35451f',
      200: '#27ae601f',
      300: '#dc3848',
      400: '#27ae60'
    }
    },
  shadows: {
    teamShadow: "0 0 20px 0 rgba(112, 121, 138, 0.18)"
  },
  components: {
    Button: {
      variants: {
        message: {
          margin: "0",
          padding: "25px 30px",
          fontSize: '14px',
          borderRadius: "5px",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          bg: "team.600",
          _hover: {
            bg: "team.200",
          }
        },
        dark: {
          borderRadius: "5px",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          bg: "black",
          padding: "25px 30px",
        },
        contactUs: {
          padding: '30px 40px',
          color: '#27ae60',
          fontWeight: 'bold',
          border: '5px solid',
          borderColor: '#27ae601f',
          bg: 'white',
          borderRadius: '50px',
          fontSize: '20px',
        },
      }
    },
    Text: {
      baseStyle: {
        fontWeight: 'normal',
      },
      variants: {
        paragraph: {
          fontSize: '15px',
          fontWeight: '500',
          paddingRight: { base: '0', md: '30px' },
          marginBottom: '20px',
          lineHeight: '30px',
        },
      },
      defaultProps: {
        variant: null,
      },
    },
  },
});

export default theme;