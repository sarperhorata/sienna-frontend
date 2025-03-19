import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PriceWrapper = ({ children }) => {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
};

export default function PaymentPlans() {
  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Ödeme Planları
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          İhtiyacınıza uygun planı seçerek başlayın.
        </Text>
      </VStack>
      <Container maxW="container.xl" mt={12}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}>
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Ücretsiz
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  ₺
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  0
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /ay
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  5 hashtag seti oluşturma
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Temel performans analizi
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  1 sosyal medya platformu
                </ListItem>
                <ListItem>
                  <ListIcon as={FaTimesCircle} color="red.500" />
                  Özel destek
                </ListItem>
                <ListItem>
                  <ListIcon as={FaTimesCircle} color="red.500" />
                  İleri görsel analiz
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="brand" variant="outline">
                  Başla
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>

          <PriceWrapper>
            <Box position="relative">
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: 'translate(-50%)' }}>
                <Text
                  textTransform="uppercase"
                  bg={useColorModeValue('brand.500', 'brand.600')}
                  px={3}
                  py={1}
                  color="white"
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl">
                  En Popüler
                </Text>
              </Box>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Profesyonel
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    ₺
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    149
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    /ay
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}>
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Sınırsız hashtag seti
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Detaylı analiz & raporlar
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    3 sosyal medya platformu
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Öncelikli destek
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Rakip analizi
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Button w="full" colorScheme="brand">
                    Şimdi Başla
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>
          
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Kurumsal
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  ₺
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  349
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /ay
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Tüm Profesyonel özellikleri
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  5 kullanıcıya kadar ekip erişimi
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Tüm sosyal medya platformları
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  7/24 öncelikli destek
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Özel API entegrasyonu
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="brand" variant="outline">
                  Özel Teklif Alın
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>
        </Stack>
      </Container>
    </Box>
  );
} 