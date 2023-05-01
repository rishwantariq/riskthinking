const MY_APP_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://my-app.com' : 'http://localhost:3000';

export default MY_APP_BASE_URL;