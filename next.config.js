module.exports = {
  assetPrefix: process.env.CI ? "/blog/" : "",
  images: {
    unoptimized: true,
  },
  basePath: process.env.CI ? "/blog" : "",
  output: "export",
  distDir: "out",
};
