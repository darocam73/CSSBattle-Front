export const documentContents = (html, css) => (`
  <!DOCTYPE html>
  <html lang="en" style="height: 100%; margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>${css}</style>
  </head>
  <body style="background: #FFF; height: 100%; margin: 0; padding: 0;">${html}</body>
  </html>
`);