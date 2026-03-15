import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

const validateURL = (url) => {
  if (!url || typeof url !== 'string') throw new Error('URL required!');
  if (url.length > 500) throw new Error('URL too long!');
  
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Only HTTP/HTTPS URLs allowed!');
    }
  } catch {
    throw new Error('Invalid URL format!');
  }
  
  return url.trim();
};

const validatePassword = (password) => {
  if (!password || typeof password !== 'string') throw new Error('Password required!');
  if (password.length > 256) throw new Error('Password too long!');
  return password;
};

const validateCode = (code) => {
  if (!code || typeof code !== 'string') throw new Error('Code required!');
  if (code.length > 10000) throw new Error('Code too long — max 10000 characters!');
  return code.trim();
};

export const checkHeaders = (url) => {
  const validURL = validateURL(url);
  return API.post('/security/check-headers', { url: validURL });
};

export const checkPassword = (password) => {
  const validPassword = validatePassword(password);
  return API.post('/password/check-strength', { password: validPassword });
};

export const checkBreach = (password) => {
  const validPassword = validatePassword(password);
  return API.post('/breach/check-breach', { password: validPassword });
};

export const checkSSL = (url) => {
  const validURL = validateURL(url);
  return API.post('/ssl/check-ssl', { url: validURL });
};

export const reviewCode = (code, language) => {
  const validCode = validateCode(code);
  const validLanguage = ['javascript', 'python', 'java', 'php', 'c++', 'other']
    .includes(language) ? language : 'other';
  return API.post('/code/review', { code: validCode, language: validLanguage });
};