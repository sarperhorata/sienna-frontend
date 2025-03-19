import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Image,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack
        spacing={8}
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        textAlign="center">
        <Heading
          fontSize={{ base: '6xl', md: '8xl' }}
          fontWeight="bold"
          color={useColorModeValue('brand.500', 'brand.300')}>
          404
        </Heading>
        
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Sayfa Bulunamadı
          </Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
          </Text>
        </Box>
        
        <Button
          as={RouterLink}
          to="/"
          colorScheme="brand"
          size="lg"
          px={8}>
          Ana Sayfaya Dön
        </Button>
      </VStack>
    </Container>
  );
} 