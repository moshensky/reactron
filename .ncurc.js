const ignoredPackages = [
  // Keep this list in sync with dependabot.yml
]

module.exports = {
  upgrade: true,
  reject: ignoredPackages,
  packageManager: 'npm',
}
