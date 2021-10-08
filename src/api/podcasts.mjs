import fetch from 'node-fetch'

export async function getPodcasts() {
  return (await fetch('https://lindsaykwardell.com/.netlify/functions/podcasts')).json()
}
