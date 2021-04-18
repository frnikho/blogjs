module.exports = {
    preset: 'ts-jest',
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.jest.json"
        }
    },
    collectCoverage: true,
    testResultsProcessor: "jest-sonar-reporter",
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/tests/",
        "/.next/",
        "/jest.config.js",
        "/pages/"
    ],
};
