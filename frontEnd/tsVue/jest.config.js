module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // or node
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  }
}
