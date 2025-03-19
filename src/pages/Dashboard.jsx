import { useState } from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaUserFriends, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const cardBg = useColorModeValue('white', 'gray.700');
  
  // Demo data
  const [stats] = useState({
    totalPosts: 43,
    engagement: 12.4,
    followers: 2450,
    views: 15280
  });
  
  return (
    <Box py={10}>
      <Container maxW={'container.xl'}>
        <Stack spacing={8}>
          <Box>
            <Heading as="h1" size="xl" mb={2}>
              Hoş Geldin, {user?.name || 'Kullanıcı'}
            </Heading>
            <Text color={'gray.600'}>
              Sosyal medya performansınızı görüntüleyin ve içeriklerinizi optimize edin.
            </Text>
          </Box>
          
          {/* Stats Overview */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
            <Card bg={cardBg} boxShadow={'md'}>
              <CardBody>
                <Stat>
                  <StatLabel fontWeight={'medium'}>Toplam Gönderi</StatLabel>
                  <StatNumber fontSize={'2xl'}>{stats.totalPosts}</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    23% (Son 30 gün)
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            
            <Card bg={cardBg} boxShadow={'md'}>
              <CardBody>
                <Stat>
                  <StatLabel fontWeight={'medium'}>Etkileşim Oranı</StatLabel>
                  <StatNumber fontSize={'2xl'}>{stats.engagement}%</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    5.3% (Son 30 gün)
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            
            <Card bg={cardBg} boxShadow={'md'}>
              <CardBody>
                <Stat>
                  <StatLabel fontWeight={'medium'}>Takipçiler</StatLabel>
                  <StatNumber fontSize={'2xl'}>{stats.followers}</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    12% (Son 30 gün)
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            
            <Card bg={cardBg} boxShadow={'md'}>
              <CardBody>
                <Stat>
                  <StatLabel fontWeight={'medium'}>Görüntülenme</StatLabel>
                  <StatNumber fontSize={'2xl'}>{stats.views}</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    18% (Son 30 gün)
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>
          
          {/* Content Creation Tools */}
          <Box my={8}>
            <Heading as="h2" size="lg" mb={5}>
              İçerik Oluşturma Araçları
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
              <Card bg={cardBg} boxShadow={'md'}>
                <CardHeader>
                  <Icon as={FaInstagram} color="brand.500" boxSize={10} mb={2} />
                  <Heading size="md">Instagram Hashtag Oluşturucu</Heading>
                </CardHeader>
                <CardBody>
                  <Text>Gönderileriniz için optimum hashtag setleri oluşturun ve erişimi artırın.</Text>
                </CardBody>
                <CardFooter>
                  <Button colorScheme="brand">Şimdi Oluştur</Button>
                </CardFooter>
              </Card>
              
              <Card bg={cardBg} boxShadow={'md'}>
                <CardHeader>
                  <Icon as={FaTwitter} color="brand.500" boxSize={10} mb={2} />
                  <Heading size="md">Twitter İçerik Optimizasyonu</Heading>
                </CardHeader>
                <CardBody>
                  <Text>Tweet'lerinizi optimize edin ve etkileşimi artırın.</Text>
                </CardBody>
                <CardFooter>
                  <Button colorScheme="brand">Şimdi Optimize Et</Button>
                </CardFooter>
              </Card>
              
              <Card bg={cardBg} boxShadow={'md'}>
                <CardHeader>
                  <Icon as={FaChartLine} color="brand.500" boxSize={10} mb={2} />
                  <Heading size="md">İçerik Analizi</Heading>
                </CardHeader>
                <CardBody>
                  <Text>İçeriklerinizin performansını analiz edin ve iyileştirme önerileri alın.</Text>
                </CardBody>
                <CardFooter>
                  <Button colorScheme="brand">Analiz Et</Button>
                </CardFooter>
              </Card>
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
} 