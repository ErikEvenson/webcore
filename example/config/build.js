module.exports = {
  source: "./",
  build: "build/",

  miscFiles: [
    "./**",
    "!./build",
    "!./build/**",
    "!./config",
    "!./config/**",
    "!./docs",
    "!./docs/**",
    "!./gulpfile.js",
    "!./node_modules",
    "!./node_modules/**",
    "!./tasks",
    "!./tasks/**",
    "!./README.md",
    "!./temp",
    "!./temp/**"
  ],

  temp: "temp/"
}