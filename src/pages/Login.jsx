import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputRightElement,
  Icon,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email gerekli';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir email adresi girin';
    }
    
    if (!password) {
      newErrors.password = 'Şifre gerekli';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      toast({
        title: 'Giriş başarılı',
        description: 'Hoş geldiniz!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Giriş başarısız',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Hesabınıza Giriş Yapın</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Sosyal medya içeriklerinizi <Text as="span" color="brand.500">optimize etmek</Text> için
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email adresi</FormLabel>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel>Şifre</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Beni hatırla</Checkbox>
                  <Text color={'brand.500'} as={RouterLink} to="/forgot-password">
                    Şifrenizi mi unuttunuz?
                  </Text>
                </Stack>
                <Button
                  bg={'brand.500'}
                  color={'white'}
                  _hover={{
                    bg: 'brand.600',
                  }}
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Giriş yapılıyor...">
                  Giriş Yap
                </Button>
              </Stack>
            </Stack>
          </form>
          
          <Stack spacing={6} mt={6}>
            <Divider />
            
            <Text align="center">veya şununla devam edin</Text>
            
            <HStack>
              <Button
                w="full"
                variant="outline"
                leftIcon={<Icon as={FaGoogle} />}>
                Google
              </Button>
              <Button
                w="full"
                variant="outline"
                leftIcon={<Icon as={FaTwitter} />}>
                Twitter
              </Button>
            </HStack>
            
            <Text align={'center'}>
              Hesabınız yok mu?{' '}
              <Text as={RouterLink} to="/register" color={'brand.500'}>
                Kaydolun
              </Text>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
} 