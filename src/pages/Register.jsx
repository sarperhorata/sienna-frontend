import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
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

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!name) {
      newErrors.name = 'Ad-Soyad gerekli';
    }
    
    if (!email) {
      newErrors.email = 'Email gerekli';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir email adresi girin';
    }
    
    if (!password) {
      newErrors.password = 'Şifre gerekli';
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await register({
        name,
        email,
        password
      });
      
      toast({
        title: 'Kayıt başarılı',
        description: 'Hesabınız oluşturuldu!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Kayıt başarısız',
        description: error.response?.data?.message || 'Bir hata oluştu',
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
          <Heading fontSize={'4xl'}>Hesap Oluşturun</Heading>
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
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Ad Soyad</FormLabel>
                <Input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              
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
              
              <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
                <FormLabel>Şifre (Tekrar)</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
              
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Kaydediliyor"
                  size="lg"
                  bg={'brand.500'}
                  color={'white'}
                  _hover={{
                    bg: 'brand.600',
                  }}
                  type="submit"
                  isLoading={isSubmitting}>
                  Kaydol
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
              Zaten hesabınız var mı?{' '}
              <Text as={RouterLink} to="/login" color={'brand.500'}>
                Giriş Yapın
              </Text>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
} 