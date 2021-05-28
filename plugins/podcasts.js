import axios from 'axios'

let podcasts = []

export default async (context, inject) => {
  const fetchPodcasts = async () => {
    if (podcasts.length) return podcasts

    try {
      podcasts = await axios
        .get('/.netlify/functions/podcasts')
        .then((res) => res.data)

      return podcasts
    } catch {
      return podcasts
    }
  }

  inject('podcasts', fetchPodcasts)

  context.$podcasts = fetchPodcasts
}
