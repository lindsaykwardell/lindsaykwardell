export class Content {
    #media

    constructor(media) {
      this.#media = media;
    }

    get toList() {
      return this.#media;
    }

    get length() {
      return this.#media.length
    }

    get locations() {
      return this
        .#media
        .filter((post, index) => 
          post.name && this.#media.findIndex(e => e.name === post.name) === index)
        .map(post => post.name)
    }

    get byLocation() {
      return this.#media.reduce((shows, show) => {
        if (show.name) {
          if (!(show.name in shows)) {
            shows[show.name] = []
          }

          shows[show.name].push(show)
        }

        return shows
      }, {})
    }

    get podcasts() {
      return new Content(this.#media.filter(media => media.type === 'podcast'))
    }

    get videos() {
      return new Content(this.#media.filter(media => media.type === 'video'))
    }

    get meetups() {
      return new Content(this.#media.filter(media => media.type === 'meetup'))
    }

    get blogs() {
        return new Content(this.#media.filter(media => media.type === 'blog'))
    }

    get hosted() {
      return new Content(this.#media.filter(media => media.host))
    }

    get guest() {
      return new Content(this.#media.filter(media => !media.host))
    }

    search(query) {
      const results = new Fuse(this.#media, {
        keys: ['title', 'name', 'snippet', 'pubDate']
      }).search(query)

      return new Content(results.map(results => results.item))
    }
  }