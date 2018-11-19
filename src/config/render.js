import { renderToString } from 'react-dom/server'

export default (renderMe, state) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SHR</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;subset=cyrillic" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/dist/css/style.css">
  </head>
  <body>
    <div id="root">${renderToString(renderMe)}</div>

    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)};
    </script>
    
    <script src="/dist/vendor.bundle.js"></script>
    <script src="/dist/bundle.js"></script>
</body>
</html>`
