import { CORS_PROXY } from './config';
import { INNOLOFT_API_ENDPOINT } from './constants';

export const getModifiedVideoUrl = (videoUrl: string) => {
  const videoId = videoUrl.split('v=')[1];
  return `https://www.youtube.com/embed/${videoId}`;
};

export const setThemeColor = (color: string) => {
  document.documentElement.style.setProperty('--primary-color', color);
};

export const getBaseURL = () => {
  let baseUrl = INNOLOFT_API_ENDPOINT;
  if (CORS_PROXY) {
    baseUrl = `${CORS_PROXY}/${INNOLOFT_API_ENDPOINT}`;
  }
  return baseUrl;
};

export const isValidDescriptionField = (description: string) => {
  const trimmedDescription = description?.trim();
  return trimmedDescription && trimmedDescription !== '<p><br></p>';
};
