export const secret = {
  SERVER_API_URL: process.env.REACT_APP_SERVER_URL_PRO,
  // SERVER_API_URL: process.env.REACT_APP_SERVER_URL_DEV,
  // CLIENT_API_URL: process.env.REACT_APP_CLIENT_URL_DEV,
  CLIENT_API_LOCAL_URL: process.env.REACT_APP_CLIENT_URL_PRO,
  //cloudinary profile upload settings
  PROFILE_CLOUDINARY_PRESET: process.env.REACT_APP_PROFILE_CLOUDINARY_PRESET,
  PROFILE_CLOUDINARY_NAME: process.env.REACT_APP_PROFILE_CLOUDINARY_NAME,
  //cloudinary banner upload settings
  BANNER_CLOUDINARY_PRESET: process.env.REACT_APP_BANNER_CLOUDINARY_PRESET,
  BANNER_CLOUDINARY_NAME: process.env.REACT_APP_BANNER_CLOUDINARY_NAME,
  //cloudinary post upload settings
  POST_CLOUDINARY_PRESET: process.env.REACT_APP_POST_CLOUDINARY_PRESET,
  POST_CLOUDINARY_NAME: process.env.REACT_APP_POST_CLOUDINARY_NAME,
};
