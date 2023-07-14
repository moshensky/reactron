export function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',')
  // const mime = arr[0].match(/:(.*?);/)[1]
  const mime = arr[0].split(';')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export function downloadBlobLocally(blob: Blob, name: string): void {
  const url = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.setAttribute('href', url)
  anchor.setAttribute('download', name)
  document.body.appendChild(anchor)
  anchor.click()
  window.URL.revokeObjectURL(url)
  anchor.remove()
}
