const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#0094FF",
              "@border-radius-base": "5px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
