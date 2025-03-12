import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // CSRF token ve Cookie'ler için gerekli
});

// İstek interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Storageden token al
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // CSRF token'ı ekle (gerekli ise)
    const csrfToken = localStorage.getItem('csrf_token');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Yanıt interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 401 Unauthorized hatası durumunda
    if (error.response && error.response.status === 401) {
      // Kullanıcıyı logout yap ve login sayfasına yönlendir
      localStorage.removeItem('auth_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // 403 Forbidden hatası ve CSRF token hatası ise
    if (error.response && error.response.status === 403 && 
        error.response.data && error.response.data.message.includes('CSRF')) {
      // Yeni CSRF token al
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/csrf-token`);
        localStorage.setItem('csrf_token', response.data.csrfToken);
        
        // Orijinal isteği yeni token ile tekrar dene
        const originalRequest = error.config;
        originalRequest.headers['X-CSRF-Token'] = response.data.csrfToken;
        return axios(originalRequest);
      } catch (retryError) {
        console.error('Failed to refresh CSRF token', retryError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient; 