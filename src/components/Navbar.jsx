import { useState } from 'react';
import { 
  Box, 
  Flex, 
  HStack,
  IconButton, 
  Button, 
  Menu, 
  MenuButton,
  MenuList, 
  MenuItem, 
  MenuDivider, 
  useDisclosure, 
  useColorModeValue, 
  Stack, 
  Avatar,
  Text,
  Container,
  Link,
} from '@chakra-ui/react';
import { 
  HamburgerIcon, 
  CloseIcon, 
  ChevronDownIcon, 
} from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const NavLink = ({ children, path }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to={path}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const Links = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.features'), path: '/features' },
    { name: t('nav.pricing'), path: '/payment-plans' },
    { name: t('nav.about'), path: '/about' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} boxShadow="sm">
      <Container maxW="container.xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight="bold" fontSize="xl" color="brand.500">
              <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                {t('app.name')}
              </Link>
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} path={link.path}>{link.name}</NavLink>
              ))}
            </HStack>
          </HStack>
          
          <Flex alignItems={'center'}>
            <LanguageSwitcher />
            
            {currentUser ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                  ml={4}>
                  <HStack>
                    <Avatar
                      size={'sm'}
                      src={currentUser.avatar || 'https://bit.ly/broken-link'}
                    />
                    <Text display={{ base: 'none', md: 'flex' }}>
                      {currentUser.firstName}
                    </Text>
                    <ChevronDownIcon />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/dashboard">{t('nav.dashboard')}</MenuItem>
                  <MenuItem as={RouterLink} to="/profile">{t('nav.profile')}</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>{t('nav.logout')}</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={4} ml={4}>
                <Button as={RouterLink} to="/login" variant={'outline'}>
                  {t('login.loginButton')}
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  display={{ base: 'none', md: 'inline-flex' }}
                  variant={'solid'}>
                  {t('register.registerButton')}
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} path={link.path}>{link.name}</NavLink>
              ))}
              {!currentUser && (
                <NavLink path="/register">{t('register.registerButton')}</NavLink>
              )}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
} 