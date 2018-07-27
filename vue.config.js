if (process.env.NODE_ENV === 'production') {
  module.exports = {
    devServer: {
      proxy: 'http://dev.hn-zm.com:8080/',
    },
  };
} else {
  module.exports = {};
}