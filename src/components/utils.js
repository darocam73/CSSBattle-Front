export const documentContents = (html, css) => {
  const parseHTMLCode = (code = '') => (
    code.replace(/(?:\r\n|\r|\n)/g, '').replace(/>(.*?)</g, '><')
  );

  return (`
    <!DOCTYPE html>
    <html lang="en" style="height: 100%; margin: 0; padding: 0;">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>${parseHTMLCode(html)}</body>
    <style>
      body {
        background: #FFF;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
    <style>${css}</style>
    <style>
      body {
        overflow: hidden!important;
      }
    </style>
    </html>
  `);
};