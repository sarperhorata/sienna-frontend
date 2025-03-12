import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0e4ff',
      100: '#d1beff',
      200: '#b397ff',
      300: '#946dff',
      400: '#7855f7',
      500: '#6a3aee', // Ana marka rengi
      600: '#5727c8',
      700: '#431aa3',
      800: '#2e0c7d',
      900: '#1a0159',
    },
    secondary: {
      50: '#e6faff',
      100: '#c7f0ff',
      200: '#a4e5ff',
      300: '#7ddbff',
      400: '#57d1ff',
      500: '#33c6ff', // İkincil marka rengi
      600: '#1eaad8',
      700: '#0f8ab0',
      800: '#016a89',
      900: '#004b61',
    },
  },
  fonts: {
    heading: '"Montserrat", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
        secondary: {
          bg: 'secondary.500',
          color: 'white',
          _hover: {
            bg: 'secondary.600',
          },
        },
      },
    },
    Link: {
      baseStyle: {
        color: 'brand.500',
        _hover: {
          textDecoration: 'none',
          color: 'brand.600',
        },
      },
    },
  },
});

export default theme; 