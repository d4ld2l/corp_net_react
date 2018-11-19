export default async function urlToBase64(url) {
  function getImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve
      img.src = url
    })
  }

  const img = await getImage(url)
  const canvas = document.createElement("canvas");
  canvas.width = img.path[0].width;
  canvas.height = img.path[0].height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img.path[0], 0, 0);
  return canvas.toDataURL("image/jpeg");
}
