import axios from 'axios'

export default async (context, inject) => {
  try {
    const { data: podcasts } = await axios.get('/.netlify/functions/podcasts')

    inject('podcasts', podcasts)

    context.$podcasts = podcasts
  } catch (err) {
    // Do nothing
  }
}
