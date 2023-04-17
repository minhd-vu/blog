module.exports = {
  assetPrefix: process.env.CI ? "/blog/" : "",
  images: {
    unoptimized: true,
  },
  basePath: "/blog",
  output: "export",
  distDir: "out",
};
