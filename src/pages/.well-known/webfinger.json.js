export async function get() {
  return {
    body: JSON.stringify({
      subject: 'acct:lindsaykwardell@mastodon.social',
      aliases: [
        'https://mastodon.social/@lindsaykwardell',
        'https://mastodon.social/users/lindsaykwardell',
      ],
      links: [
        {
          rel: 'http://webfinger.net/rel/profile-page',
          type: 'text/html',
          href: 'https://mastodon.social/@lindsaykwardell',
        },
        {
          rel: 'self',
          type: 'application/activity+json',
          href: 'https://mastodon.social/users/lindsaykwardell',
        },
        {
          rel: 'http://ostatus.org/schema/1.0/subscribe',
          template: 'https://mastodon.social/authorize_interaction?uri={uri}',
        },
      ],
    }),
  }
}
