module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-underscore-dangle": 0,
    "no-console": 0,
    camelcase: "off",
    "no-shadow": "off",
    "consistent-return": "off",
  },
};
