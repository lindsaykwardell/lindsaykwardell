export default async (context, inject) => {
  const data = await (await fetch("https://dev.to/api/articles?username=lindsaykwardell")).json()

  inject('devto', data)

  context.$devto = data
}