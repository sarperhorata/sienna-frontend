import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  // Desteklenen diller
  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'tr', name: t('language.tr') },
  ];

  // Mevcut dil
  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        rightIcon={<ChevronDownIcon />}
        leftIcon={<FaGlobe />}
        size="sm"
      >
        <HStack>
          <Text>{currentLanguage.name}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            fontWeight={language === lang.code ? 'bold' : 'normal'}
          >
            {lang.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher; 