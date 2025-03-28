import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Flex,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Sosyal Medya İçerikleriniz <br />
            <Text as={'span'} color={'brand.500'}>
              Yapay Zeka ile Gelişsin
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Sienna Carter, sosyal medya içeriklerinizi yapay zeka ile güçlendiren
            bir platformdur. Hashtag önerileri, içerik fikirleri ve daha fazlasını
            tek bir yerden yönetin. Instagram, Twitter ve diğer platformlar için
            özel araçlarla engagement oranlarınızı arttırın.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              as={RouterLink}
              to="/register"
              colorScheme={'brand'}
              bg={'brand.500'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'brand.600',
              }}>
              Hemen Başla
            </Button>
            <Button 
              as={RouterLink}
              to="/features" 
              variant={'link'} 
              colorScheme={'blue'} 
              size={'sm'}>
              Özelliklerimizi Keşfet
            </Button>
            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue('gray.800', 'gray.300')}
                w={71}
                position={'absolute'}
                right={-71}
                top={'10px'}
              />
              <Text
                fontSize={'lg'}
                fontFamily={'Caveat'}
                position={'absolute'}
                right={'-125px'}
                top={'-15px'}
                transform={'rotate(10deg)'}>
                Ücretsiz plan ile başlayın
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>

      {/* Feature Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} p={10}>
        <Container maxW={'container.xl'}>
          <Heading textAlign="center" mb={10}>Özelliklerimiz</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <FeatureCard
              title="Akıllı Hashtag Önerileri"
              text="Fotoğrafınıza özel, trendlere uygun hashtagler öneren yapay zeka sistemi."
              icon={"/icons/hashtag.svg"}
            />
            <FeatureCard
              title="Sosyal Medya Entegrasyonu"
              text="Instagram, Twitter ve diğer platformlarınızla sorunsuz entegrasyon."
              icon={"/icons/social.svg"}
            />
            <FeatureCard
              title="Resim Oluşturma"
              text="Metinden resim üreten yapay zeka teknolojisi ile özel içerikler oluşturun."
              icon={"/icons/image.svg"}
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box bg={useColorModeValue('white', 'gray.800')} p={10}>
        <Container maxW={'container.xl'}>
          <Heading textAlign="center" mb={10}>Kullanıcılarımız Ne Diyor?</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <TestimonialCard
              name="Ahmet Yılmaz"
              role="Instagram İçerik Üreticisi"
              content="Sienna Carter sayesinde Instagram'da takipçi sayımı %30 arttırdım. Önerilen hashtagler gerçekten çok etkili!"
              avatar="/testimonials/person1.jpg"
            />
            <TestimonialCard
              name="Ayşe Kaya"
              role="Dijital Pazarlama Uzmanı"
              content="Müşterilerim için sosyal medya stratejisi oluştururken vazgeçilmez araçlarımdan biri oldu. Zaman tasarrufu sağlıyor."
              avatar="/testimonials/person2.jpg"
            />
            <TestimonialCard
              name="Mehmet Demir"
              role="Freelance Fotoğrafçı"
              content="Fotoğraflarım için en uygun hashtagleri bulmak artık çok kolay. Sienna Carter'ı tüm fotoğrafçı arkadaşlarıma öneriyorum."
              avatar="/testimonials/person3.jpg"
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg={useColorModeValue('brand.500', 'brand.600')} color="white" p={10}>
        <Container maxW={'container.xl'}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={10}
            align="center"
            justify="space-between">
            <Stack spacing={4} w={{ base: 'full', md: '50%' }}>
              <Heading>Sosyal Medya Varlığınızı Güçlendirin</Heading>
              <Text fontSize="lg">
                Sienna Carter ile sosyal medya içeriklerinizi optimize edin ve daha fazla etkileşim alın.
              </Text>
            </Stack>
            <Button
              as={RouterLink}
              to="/register"
              rounded="full"
              size="lg"
              fontWeight="bold"
              px={6}
              bg="white"
              color="brand.500"
              _hover={{ bg: 'gray.100' }}>
              Ücretsiz Başlayın
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

const FeatureCard = ({ title, text, icon }) => {
  return (
    <Box
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}>
      <Flex
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        <Image src={icon} alt={title} w="64px" h="64px" />
      </Flex>
      <Heading fontSize={'xl'} fontFamily={'body'}>
        {title}
      </Heading>
      <Text mt={2} color={'gray.500'}>
        {text}
      </Text>
    </Box>
  );
};

const TestimonialCard = ({ name, role, content, avatar }) => {
  return (
    <Box
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}>
      <Image
        h={'120px'}
        w={'120px'}
        src={avatar}
        alt={name}
        mb={4}
        pos={'relative'}
        mx="auto"
        borderRadius="full"
        objectFit="cover"
      />
      <Heading fontSize={'xl'} fontFamily={'body'}>
        {name}
      </Heading>
      <Text fontWeight={600} color={'gray.500'} mb={4}>
        {role}
      </Text>
      <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.300')} px={3}>
        {content}
      </Text>
    </Box>
  );
};

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
}); 