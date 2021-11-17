export const download = (source: string, filename: string) => {
  const a = document.createElement('a')
  a.href = source
  a.download = filename
  a.click()
}
