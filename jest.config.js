module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    testEnvironment: "node",
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
