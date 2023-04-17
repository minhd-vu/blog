module.exports = {
  assetPrefix: process.env.CI ? "/blog/" : "",
  images: {
    unoptimized: true,
  },
  output: "export",
  distDir: "out",
};
