import naturalOrder from 'natural-order'

const oneOffs = [
  {
    url: 'https://www.youtube.com/watch?v=LPw8ZvEyOnQ',
    title: 'The Retro Week of March 28th, 2021',
    snippet:
      "On this week's \"The Watercooler\", we're talking with Lindsay Wardell, Software Engineer at This Dot Labs.   She talks about what's new with the latest release of Vite, the build tool!",
    pubDate: '2021-03-28T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/LPw8ZvEyOnQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtKe2q1p3B6jcsaQgVz--weqzlTA',
    type: 'video',
    host: false,
    name: 'The Retro'
  },
  {
    url: 'https://www.youtube.com/watch?v=79DWd9RR8Gs',
    title:
      'The Near Future of Node Development with James Snell, Build IT Better Architecture',
    snippet:
      'In this episode, Lindsay Wardell (@lindsaykwardell) talks to James Snell (@jasnell)- member of the Node.JS Technical Steering Committee.  They talk about the near future advancements in the works for Node, the process of making TC39 proposals, and more.',
    pubDate: '2021-09-21T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/79DWd9RR8Gs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCZSpy6LOe0S6gL-7bU1yO7pde8tQ',
    type: 'video',
    host: true,
    name: 'Build IT Better'
  },
  {
    url: 'https://www.youtube.com/watch?v=RKtQOUzOano',
    title: 'JAMstack + GraphQL APIs with StepZen ft. Brian Rinaldi, JAMhack',
    snippet:
      "This week's host is Lindsay Wardell (@lindsaykwardell), Software Engineer at This Dot Labs, and our guest is Brian Rindaldi (@remotesynth), Developer Advocate at StepZen!  In this episode, our participants talk about building JAMstack and GraphQL APIs using StepZen.",
    pubDate: '2021-07-08T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/RKtQOUzOano/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAq4um-6LHJsRv9GEyCjqZVqX9kOA',
    type: 'video',
    host: true,
    name: 'JAMhack'
  },
  {
    url: 'https://www.youtube.com/watch?v=9FsDyDABSso',
    title:
      'Brand New Libraries and Open-Source Projects Dropping with David Khourshid, The Retro',
    snippet:
      'On this week\'s "The Watercooler", we\'re talking to David Khourshid (@DavidKPiano) of Stately.ai.',
    pubDate: '2021-08-16T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/9FsDyDABSso/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBgS7f1wBI1BiZ934SLv9yl1xh6AA',
    type: 'video',
    host: true,
    name: 'The Retro'
  },
  {
    url: 'https://www.youtube.com/watch?v=0DhsIjTeN0c',
    title: 'JavaScript Marathon | Vue Composition API in Action',
    snippet:
      'Vue 3 introduced the Composition API, a new way to write component logic. We will explore the Composition API methods, and then take an existing Vue 3 application and convert it from the Options API to the Composition API.',
    pubDate: '2021-07-22T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/0DhsIjTeN0c/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA1ye92iO-JxE5ZaAYFJ-DzZmNAqw',
    type: 'video',
    host: true,
    name: 'Javascript Marathon'
  },
  {
    url: 'https://www.youtube.com/watch?v=bi0DIJxp178',
    title: 'Progressive Web Apps VS Mobile Apps, Build IT Better: Architecture',
    snippet:
      "In this week's episode, we are joined by a roundtable of This Dot Labs developers, Lindsay Wardell, Walter Kuppens, Jesse Tomchak, Simone Cuomo, + Chandler Baskins in a discussion about Progressive Web App development vs Mobile Apps!",
    pubDate: '2021-07-21T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/bi0DIJxp178/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDy-H6I0jSYuLpq2_Ce93iWnOOEmA',
    type: 'video',
    host: true,
    name: 'Build IT Better'
  },
  {
    url: 'https://www.youtube.com/watch?v=I9chpwvWWNA',
    title: 'JavaScript Marathon: Upgrade to Typescript with Vue 3',
    snippet:
      'With the release of Vue 3, Typescript support is built into the framework. In this session, we go through the upgrade process and integrate Typescript into a Vue 3 application.',
    pubDate: '2021-03-24T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/I9chpwvWWNA/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCBvsQbLF9GdQpMLpytTQrSU1KliQ',
    type: 'video',
    host: false,
    name: 'Javascript Marathon'
  },
  {
    url: 'https://www.youtube.com/watch?v=z4ta7r6yqVU&t=2s',
    title: 'JavaScript After Dark ft. Lindsay Wardell',
    snippet:
      "In this week's episode, we talk with Lindsay Wardell (@lindsaykwardell), Software Engineer from This Dot Labs!  Lindsay shares what she's been interested in lately in the world of Vue, plus we hear about how Lindsay started learning React and even built her own router while creating a turn based strategy game!",
    pubDate: '2021-05-27T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/z4ta7r6yqVU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCjjPp1e5nYVt3pP-RCyJ7JoZL2Ig',
    type: 'video',
    host: false,
    name: 'Javascript After Dark'
  },
  {
    url: 'https://www.youtube.com/watch?v=adkxGYeW97c',
    title: 'VueJS Athens Meetup #7',
    snippet:
      'With Christmas just around the corner, Santa brought us two amazing speakers, and their talks about new APIs introduced in Vue 3. Lindsay will walk us through the script setup API while Ben will tackle the new Composition API. We hope you are ready and as excited as we are.',
    pubDate: '2021-12-09T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/adkxGYeW97c/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCzIhNUHVMCwYm81UKlfxZ8nOKZeg',
    type: 'meetup',
    host: false,
    name: 'VueJS Athens'
  },
  {
    url: 'https://www.youtube.com/watch?v=G1FtGIAN2lo',
    title:
      'Tech Talk with Lindsay Wardell: The Importance of Side Projects and Networking',
    snippet:
      'Lindsay is a software engineer at "This Dot Labs" and a host of the podcast Views on Vue. She graduated from the Tech Academy in 2018 and has since worked at three different companies as a developer.',
    pubDate: '2021-06-25T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/G1FtGIAN2lo/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAdZbqUkrZRSXnJC4kzSWU4yXYJUg',
    type: 'meetup',
    host: false,
    name: 'The Tech Academy'
  },
  {
    url: 'https://www.youtube.com/watch?v=LecYqXHvHfg&t=839s',
    title: 'Wikifunctions and Abstract Wikipedia',
    snippet:
      'Wikifunctions is a collaboratively edited catalog of computer functions that aims to allow the creation, modification, and reuse of source code. It is closely related to Abstract Wikipedia, an extension to Wikidata that aims to create a language-independent version of Wikipedia using its structured data.',
    pubDate: '2021-08-14T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/LecYqXHvHfg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCPwaNDWP5Wgrg4JgIU0pmDDc6qUw',
    type: 'video',
    host: false,
    name: 'Wikimania'
  },
  {
    url: 'https://www.youtube.com/watch?v=flUASpYouEw',
    title: 'Introduction to Elm (with Lindsay Wardell) | Some Antics',
    snippet:
      'Elm is a delightful functional programming language with an emphasis on tooling. Join us as Lindsay Wardell shows us how we can get started with Elm today!',
    pubDate: '2022-01-20T00:00:00.000Z',
    image: 'https://i.ytimg.com/vi/flUASpYouEw/hqdefault.jpg',
    type: 'video',
    host: false,
    name: 'Some Antics'
  },
  {
    url: 'https://javascriptjabber.com/what-s-new-with-elm-ft-lindsay-wardell-jsj-527',
    title: 'What\'s New with Elm? ft. Lindsay Wardell - JSJ 527',
    snippet: 'Elm is a functional language that compiles to JavaScript and runs in the browser. Lindsay Wardell from NoRedInk joins the JavaScript Jabber panel this week to discuss her background with Vue and Elm. The discussion ranges into how Lindsay got into Elm and how it differs and solves some of the issues that crop up when people build apps with JavaScript.',
    pubDate: '2022-04-12T00:00:00.000Z',
    image: 'https://assets.fireside.fm/file/fireside-images/podcasts/images/f/fd93ea0b-a752-4f58-88c6-6ab8e955eae5/cover_medium.jpg?v=0',
    type: 'podcast',
    host: false,
    name: 'Javascript Jabber'
  },
  {
    url: 'https://fsjam.org/episodes/episode-72-elm-with-lindsay-wardell',
    title: 'Episode 72 - Elm with Lindsay Wardell',
    snippet: 'In this episode we discuss NoRedInk\'s experience using Elm in production, the combined power of functional programming and static type systems, building a language for the long term, and the difficulty of explaining the benefits of purely functional languages to developers who have never experienced them.',
    pubDate: '2022-05-06T00:00:00.000Z',
    image: 'https://images.transistor.fm/file/transistor/images/show/15767/medium_1603833407-artwork.jpg',
    type: 'podcast',
    host: false,
    name: 'FSJam'
  },
  {
    url: 'https://www.youtube.com/watch?v=W13X7wjKejs',
    title: 'Side Projects - The Value of Building in Public',
    snippet: 'Tech Academy graduate Lindsay Wardell discussed side projects and building in public! Lindsay shared how she has grown her development knowledge through the creation of an ongoing, engaging side project, and a few ways to think about the purpose of different side projects.',
    pubDate: '2022-05-13T00:00:00.000Z',
    image: 'https://i.ytimg.com/vi/W13X7wjKejs/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLARu_Nr290hur8U9FBBh5iSq6bvFA',
    type: 'meetup',
    host: false,
    name: 'The Tech Academy'
  },
  {
    url: 'https://open.spotify.com/episode/64kMufOBufDspsLgJfskbD',
    title: 'Functional and Object-Oriented Programming with Lindsay Wardell',
    snippet: 'Richard and Lindsay talk about their experiences with FP and OOP, and some less obvious differences they\'ve noticed between the two paradigms.',
    pubDate: '2022-06-06T00:00:00.000Z',
    image: 'https://storage.googleapis.com/com-resonaterecordings-public/cover-art/3yUDSlWimXAlnh7BmozHQ3WkJsGgNR4G74ThyKKT.jpg',
    type: 'podcast',
    host: false,
    name: 'Software Unscripted'
  }
]

function fetchPodcasts() {
  return fetch('https://lindsaykwardell.com/.netlify/functions/podcasts')
    .then((res) => res.json())
    .then((res) => {
      if (Array.isArray(res)) return res
      else throw Error()
    })
    .catch(() => [])
}

export async function getPodcasts() {
  const podcasts = await fetchPodcasts()

  return naturalOrder([...podcasts.map(podcast => ({...podcast, type: 'podcast', host: true})), ...oneOffs])
    .orderBy('desc')
    .sort(['pubDate'])
}
