import { IManifest } from './server'

interface IRender {
  title: string,
  assets: IManifest['assets']
}

export default ({ title, assets }: IRender) => {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title></head><body><h1>Shit ballss</h1>${assets.js.map(js => `<script src="${js.url}"></script>`).join('')}</body></html>`;
}
