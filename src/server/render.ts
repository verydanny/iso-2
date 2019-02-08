import { IManifest } from './server-types'

interface IRender {
  title: string,
  assets: IManifest['assets'],
  body: string
}

export default ({ title, assets, body }: IRender) => {
  return `
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
    </head>
    <body>
      <div id="app-root">${body}</div>
      ${assets.js.map(js => `<script src="${js.url}"></script>`).join('')}
    </body>
  </html>`;
}
