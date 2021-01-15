const path = require("path")

module.exports = {
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'json'
    ],
    transform: {
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    setupFiles: [
        '<rootDir>/jest.setup.ts'
    ],
    globals: {
        'ts-jest': {
            babelConfig: true,
            tsConfig: path.resolve(__dirname, "tsconfig.json")
        }
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules'
    }
}