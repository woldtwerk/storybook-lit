import { unsafeStatic } from 'lit/static-html.js'
export { html } from 'lit/static-html.js'

export const attr = (args: any) =>
  unsafeStatic(
    Object.keys(args).reduce(
      (acc, curr) =>
        args[curr] || typeof args[curr] === 'number'
          ? `${acc} ${curr}=${args[curr]}`
          : `${acc}`,
      ''
    )
  )
