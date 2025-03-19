import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Divider,
  useToast,
  useColorModeValue,
  FormErrorMessage,
  HStack,
  Switch,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    instagram: '',
    twitter: '',
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.700');
  
  // Load initial profile data
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        instagram: user.instagram || '',
        twitter: user.twitter || '',
      });
    }
  }, [user]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!profile.name) {
      newErrors.name = 'Ad-Soyad gerekli';
    }
    
    if (!profile.email) {
      newErrors.email = 'Email gerekli';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Geçerli bir email adresi girin';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Demo: Normalde burada API çağrısı yapılır
      // await apiClient.put('/api/users/profile', profile);
      
      setIsEditing(false);
      toast({
        title: 'Profil güncellendi',
        description: 'Profil bilgileriniz başarıyla güncellendi',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Güncelleme başarısız',
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
    <Container maxW="container.md" py={8}>
      <Box
        p={8}
        bg={bgColor}
        boxShadow="md"
        borderRadius="lg"
      >
        <VStack spacing={6} align="stretch">
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
            <Box textAlign={{ base: 'center', md: 'left' }} mb={{ base: 4, md: 0 }}>
              <Heading size="lg">Profil Bilgileri</Heading>
              <Text color="gray.600">Kişisel bilgilerinizi yönetin</Text>
            </Box>
            
            <Avatar 
              size="xl" 
              name={profile.name} 
              src={user?.avatar}
              bg="brand.500"
            />
          </Flex>
          
          <Divider />
          
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Ad Soyad</FormLabel>
                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  isReadOnly={!isEditing}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  isReadOnly={!isEditing}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              
              <FormControl id="bio">
                <FormLabel>Biyografi</FormLabel>
                <Input
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>
              
              <FormControl id="instagram">
                <FormLabel>Instagram Kullanıcı Adı</FormLabel>
                <Input
                  name="instagram"
                  value={profile.instagram}
                  onChange={handleChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>
              
              <FormControl id="twitter">
                <FormLabel>Twitter Kullanıcı Adı</FormLabel>
                <Input
                  name="twitter"
                  value={profile.twitter}
                  onChange={handleChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Bildirimler</FormLabel>
                <HStack>
                  <Switch defaultChecked size="md" />
                  <Text>Email bildirimleri</Text>
                </HStack>
              </FormControl>
              
              <Box pt={4}>
                {isEditing ? (
                  <HStack>
                    <Button
                      type="submit"
                      colorScheme="brand"
                      isLoading={isSubmitting}
                    >
                      Kaydet
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      İptal
                    </Button>
                  </HStack>
                ) : (
                  <Button
                    colorScheme="brand"
                    onClick={() => setIsEditing(true)}
                  >
                    Profili Düzenle
                  </Button>
                )}
                
                <Button
                  ml={4}
                  colorScheme="red"
                  variant="outline"
                  onClick={logout}
                >
                  Çıkış Yap
                </Button>
              </Box>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
} 