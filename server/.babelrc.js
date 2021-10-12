const path = require("path");
const jsconfig = require("./jsconfig.json");

module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-runtime"],
    [
      "module-resolver",
      {
        root: [path.resolve(jsconfig.compilerOptions.baseUrl)],
      },
    ],
  ],
};
