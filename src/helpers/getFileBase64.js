export default (async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = resolve
    fr.readAsDataURL(file)
  })
})
