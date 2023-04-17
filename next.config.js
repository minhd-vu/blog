const isProd = process.env.NODE_ENV === "production";

module.exports = {
  assetPrefix: isProd ? "/blog/" : "",
  images: {
    unoptimized: true,
  },
  output: "export",
  distDir: "out",
};
