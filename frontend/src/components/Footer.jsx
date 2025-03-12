import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container as={Stack} maxW={'container.xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Şirket</ListHeader>
            <Link as={RouterLink} to='/about'>Hakkımızda</Link>
            <Link as={RouterLink} to='/contact'>İletişim</Link>
            <Link as={RouterLink} to='/careers'>Kariyer</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Destek</ListHeader>
            <Link as={RouterLink} to='/help'>Yardım Merkezi</Link>
            <Link as={RouterLink} to='/terms'>Kullanım Şartları</Link>
            <Link as={RouterLink} to='/privacy'>Gizlilik Politikası</Link>
            <Link as={RouterLink} to='/cookie'>Çerez Politikası</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Özellikler</ListHeader>
            <Link as={RouterLink} to='/hashtag-generator'>Hashtag Oluşturucu</Link>
            <Link as={RouterLink} to='/image-generator'>Resim Oluşturucu</Link>
            <Link as={RouterLink} to='/voice-generation'>Ses Sentezi</Link>
            <Link as={RouterLink} to='/integrations'>Entegrasyonlar</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Bizi Takip Edin</ListHeader>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'https://twitter.com/siennacarter'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'https://instagram.com/siennacarter'}>
                <FaInstagram />
              </SocialButton>
              <SocialButton label={'LinkedIn'} href={'https://linkedin.com/company/siennacarter'}>
                <FaLinkedin />
              </SocialButton>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'container.xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text>© {new Date().getFullYear()} Sienna Carter. Tüm hakları saklıdır.</Text>
        </Container>
      </Box>
    </Box>
  );
} 