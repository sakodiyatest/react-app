module.exports = {
  icon: true,
  typescript: true,
  ignoreExisting: true,
  outDir: "src/ui-kit/IconComponent",
  indexTemplate: function (paths) {
    const exportEntries = paths.map(({ path: filePath }) => {
      const [basename] = filePath.split("/").pop().split(".");
      const exportName = 'Icon' + basename;
      return `export { default as ${exportName} } from './${basename}'`
    })
    return exportEntries.join('\n')
  }
}
