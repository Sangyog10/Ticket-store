module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};

//manually delete the client pod after making this config and make new one(automatically  happens). With this in place,
//browser will automatically detect the changes in code every 300ms
