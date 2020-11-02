export default {
  jwt: {
    secret: process.env.APP_SECRET || '8beba2da3a6b680f05b8fa0bcc24cf4e',
    expireIn: '1d',
  },
};
