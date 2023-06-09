module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
  ],
  plugins: [
    'unused-imports',
  ],
  rules: {
    "unused-imports/no-unused-imports": "error",
    // override/add rules settings here:
  }
}