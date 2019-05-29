module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 0
    }
  },
  displayName: {
    name: "ip2d-test",
    color: "grey"
  }
};
