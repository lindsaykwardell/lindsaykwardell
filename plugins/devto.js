export default async (context, inject) => {
  const devto = await (
    await fetch('https://dev.to/api/articles?username=lindsaykwardell')
  ).json()

  inject('devto', devto)

  context.$devto = devto
}
