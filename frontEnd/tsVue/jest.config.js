module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // or node
  globals: {
    'ts-jest': {
      // babelConfig: true,
      // diagnostics: 
      skipBabel: true,
      tsConfig: './tsconfig.json'
    }
  }
}