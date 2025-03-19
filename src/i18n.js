import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Localization dosyalarını backend'den almak için
  .use(Backend)
  // Tarayıcı dilini algılamak için
  .use(LanguageDetector)
  // React ile entegrasyon için
  .use(initReactI18next)
  // i18next başlatma
  .init({
    // varsayılan dil
    fallbackLng: 'en',
    // debugger aktif
    debug: process.env.NODE_ENV === 'development',
    // çeviriler yüklenmeden önce fallbackLng'yi kullan
    load: 'languageOnly',
    
    // çevirilerin depolandığı klasör yapısı
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // kullanılan çeviri namespace'leri
    ns: ['common', 'auth', 'home', 'dashboard', 'payment', 'profile', 'error'],
    defaultNS: 'common',
    
    // HTML içeriğini çeviriler için güvenli hale getir
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlar
    },
    
    react: {
      useSuspense: true,
    },
    
    // kullanılacak dillerin listesi
    supportedLngs: ['en', 'tr'],
  });

export default i18n; 