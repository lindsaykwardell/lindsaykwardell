import naturalOrder from 'natural-order'

const oneOffs = [
  {
    title: 'All About Vite with Matias Capeletto - VUE 181',
    snippet:
      'Lindsay and Steve get to talk with Matias Capaletto (also known as Patak) about the explosive growth of the Vite ecosystem. They talk about how he got into Vite, and the work that’s gone into making it such a compelling ecosystem for a number of frameworks. They also discuss the origins of Vitest, the first-class test runner for Vite, and Matias’ recent hire by Stackblitz to work full time on Vite.',
    pubDate: 'Tue, 08 Mar 2022 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Tools that Inspire us with Subha Chanda - VUE 180',
    snippet:
      'Lindsay and Steve talk with Subha Chanda, freelance developer, about a number of topics related to building and managing your own sites. They discuss Subha’s work as a writer, and his work writing for LogRocket (and others), focusing on his article on using ImageKit and Vue. They also discuss the current state of using Nuxt, integrating with a CMS, and what tools Subha reaches for when doing freelance work.',
    pubDate: 'Tue, 22 Feb 2022 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Going 3D with Alvaro Saburido - VUE 179',
    snippet:
      'Lindsay and Steve talk with Alvaro Saburido about TroisJS, the ThreeJS wrapper for Vue. They talk about Alvaro’s work with Vue at work and creating public content, and then dive into what Three.js is, what it does, and why it’s so exciting.',
    pubDate: 'Tue, 15 Feb 2022 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Writing Good Tests for Vue with Markus Oberlehner - VUE 176',
    snippet:
      'Lindsay and Steve talk with Markus about his project, “Writing Good Tests for Vue Applications.” They discuss how Markus got into programming with PHP, and then later moved into Vue development, as well as how he got into testing. Markus explains how testing “clicked” for him, and that he felt there weren’t enough good resources on writing Vue tests. They then dive into testing with Vue, including component testing, integration testing, and some key concepts for how to write tests.',
    pubDate: 'Wed, 12 Jan 2022 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Tech to Follow in 2022 - VUE 175',
    snippet:
      '2022 is here to stay, but do you know what tech will? In this episode, Lindsay and Steve run through their top tech choices for this upcoming year. They agree on why Vite is here to stay, Lindsay’s favorite Vite features that’ll change the game, and tech that you NEED to watch closely this year.',
    pubDate: 'Wed, 05 Jan 2022 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Exploring PWAs with John Lim - VUE 174',
    snippet:
      'Lindsay talks with John Lim about Progressive Web Apps - what they are, and how to utilize them in a Vue application. They talk about John’s work in the construction industry with Vue, and how he started working with Vue applications and writing articles at Vue Mastery. They then dive into PWAs, how best to implement one, and what drawbacks exist in the ecosystem today. They also discuss using Firebase with PWAs for real-time features like notifications.',
    pubDate: 'Wed, 22 Dec 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Modern Package Development - VUE 172',
    snippet:
      'Lindsay and Luke discuss their recent projects to build new NPM packages, and the approaches that they use. Luke dives into building authentication composables for Laravel, Firebase, and others, while Lindsay explores the Elm programming language and how to build interoperability with Vue. They also discuss which tools they’re building, what their process looks like, and how to test a library in 2021.',
    pubDate: 'Tue, 30 Nov 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title:
      'Building a Global State Management Library with Andrew Courtice - VUE 171',
    snippet:
      'Lindsay and Steve sit down with Andrew Courtice, head of front-end engineering at Fathom, do discuss his global state management library Harlem. They talk about how Andrew got started in programming during university, and his move from building desktop applications to the web, as well as his initial start with Vue before it reached 1.0. They then discuss Harlem: what it is, how it works, and what problems it solves. They also discuss the state of global state management in the Vue ecosystem, and how to get started building your own library for Vue (including devtool integration!)',
    pubDate: 'Tue, 16 Nov 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Islands Architecture in Vue with Máximo Mussini - VUE 170',
    snippet:
      'Lindsay and Steve talk with Máximo Mussini, avid Vite user and plugin creator, about his recent work on Îles, a new static site generation framework built on Vite and Vue. They discuss Máximo’s journey into web development, and his work on the plugin ecosystem in Vite (such as Vite Ruby). They then dive into Îles: what it is, what problems it solves, and what it compares with. They also discuss the concept of “Islands Architecture” that was popularized by tools like Astro.',
    pubDate: 'Tue, 09 Nov 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Building Performant Vue Apps with Martin Malinda - VUE 169',
    snippet:
      'Lindsay and Steve talk with Martin Malinda about building performant Vue apps. They discuss his article on building a lazy loading component, and explore browser APIs like requestIdleCallback and intersectionObserver. They end with some general guidance on how to build performant websites.',
    pubDate: 'Tue, 02 Nov 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Alternative Ways to Build Vue Apps - VUE 168',
    snippet:
      'Lindsay and Steve talk about other ways to build Vue applications than Vue CLI or Vite templates. Lindsay talks about her experience migrating her personal site from Nuxt to Astro, a new static site generator that provides islands of reactivity in a framework agnostic way. ',
    pubDate: 'Tue, 19 Oct 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title:
      "How to get Involved in the Tech Community with Shruti Kapoor - She's in Tech 019",
    snippet: 'Sponsors',
    pubDate: 'Tue, 05 Oct 2021 04:00:00 -0600',
    image: '/shesintech.png',
    type: 'podcast',
    host: true,
    name: "She's In Tech",
  },
  {
    title: 'S08E018 Modern Web Podcast - Staying Curious with Michael Chan',
    snippet:
      "In this episode, Lindsay and Michael talk about Michael's perspective on building communities, and how to stay curious and growing as a developer. They talk about how Michael and Lindsay both started in tech by taking small bits of time to grow and learn, and how that has served them in their tech careers. Michael also talks about his time on React Podcast, and what brought him to hosting the show. They end by discussing curiosity, and how specifically to stay curious in life and in a development career. ",
    pubDate: 'Fri, 24 Sep 2021 15:45:29 +0000',
    image: '/modernweb.webp',
    type: 'podcast',
    host: true,
    name: 'Modern Web',
  },
  {
    title: 'Adoping Vue at Wikimedia with Eric Gardner - VUE 165',
    snippet:
      'Lindsay and Steve talk with Eric Gardner, Senior Software Engineer at the Wikimedia Foundation, about his journey from graphic design to Vue and the adoption of Vue at the Wikimedia Foundation. They discuss the challenges faced in MediaWiki, the core application behind Wikipedia, and how and why the foundation moved to adopt Vue as its frontend framework of choice. They also discuss some of the future developments at the Foundation, as well as some of the challenges that they still face.',
    pubDate: 'Tue, 21 Sep 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Deep Dive into Nuxt with Mike Gallagher - VUE 164',
    snippet:
      "Lindsay and Steve talk to Mike Gallagher, Software Architect at Hip eCommerce, about his blog post exploring server-side rendering and how Nuxt functions under the hood. They explore Mike's specific use case of needing to manage routing on the client, rather than the server, and how he was able to find a solution. ",
    pubDate: 'Tue, 14 Sep 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Exploring Code Design - VUE 163',
    snippet:
      'Lindsay, Luke, and Steve talk about different ways to organize Vue code. They discuss the Composition API, comparing it to the Options API, and the available options for abstracting code from components to be reusable. They also discuss Evan You’s comments about the Composition API becoming the recommended path for using Vue in the future.',
    pubDate: 'Tue, 07 Sep 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Scaling Vue Up and Down with Shawn Wildermuth - VUE 162',
    snippet:
      'In this episode, Lindsay and Steve talk with Shawn Wildermuth, author and teacher, about how he sees Vue as a tool for building applications both large and small. We talk about his start giving talks at conferences, and pivoting into education as his primary focus in the developer community, and why he prefers to use Vue for his personal projects. We discuss his recently article on different state management techniques, and explore the Composition API and the new features of Vue 3.2.',
    pubDate: 'Tue, 31 Aug 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: "Tech Journeys from Different Perspectives - She's in Tech 017",
    snippet: 'Sponsors',
    pubDate: 'Tue, 31 Aug 2021 04:00:00 -0600',
    image: '/shesintech.png',
    type: 'podcast',
    host: true,
    name: "She's In Tech",
  },
  {
    title: 'S08E016 Modern Web Podcast - Quasar with Luke Diebold',
    snippet:
      'In this episode, Lindsay talks with Luke Diebold, web developer and creator of QuasarCast.com, about Quasar, the amazingly flexible framework for building applications using Vue. They talk about how Luke got into programming from his interest in music, and how he got started using Quasar for personal and professional projects. They discuss what Quasar is, and discuss where it fits into the web ecosystem. They explore some of the basics of using Quasar, including its CLI and the ability to make web, mobile, and desktop apps. They wrap up the discussion talking about how Quasar is one of the first major frameworks to support Vue 3, and what that looks like from the framework.',
    pubDate: 'Wed, 25 Aug 2021 17:14:06 +0000',
    image: '/modernweb.webp',
    type: 'podcast',
    host: true,
    name: 'Modern Web',
  },
  {
    title: 'Building a Real-Time Game with Steffen Baumgart - VUE 161',
    snippet:
      'Lindsay and Steve talk with Steffen Baumgart, developer of the “Blood on the Clocktower” virtual town square, about how he developed the online interface for this social deduction game. ',
    pubDate: 'Tue, 24 Aug 2021 02:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Building Micro Frontends with Lawrence Almeida – VUE 160',
    snippet:
      'Lindsay meets with Lawrence Almeida, Lead Developer at Unbabel, to discuss building web applications with a micro frontend architecture. ',
    pubDate: 'Tue, 17 Aug 2021 02:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Using Vue without an SPA with Ariel from Maison Futari - VUE 159',
    snippet:
      'Lindsay, Steve, Luke, and Solomon talk with Ariel from Maison Futari about using Vue without building a full single-page application. We talk about using Vue with Wordpress and other backend frameworks to build widgets, as well as using Vue to build web components. We also explore libraries like Livewire and Inertia to integrate with a Laravel backend.',
    pubDate: 'Tue, 10 Aug 2021 02:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Product Design and Authentication with David Atanda - VUE 158',
    snippet:
      'In this episode, Lindsay, Steve, and Luke talk with David Atanda, product designer and developer. We talk about his path from building products into development, and some of the products he has built. We also talk about how David looks at products and determines what to build next. After that, we discuss his blog post on authentication in Vue, and some of the decisions that need to be made for authenticating an SPA.',
    pubDate: 'Tue, 03 Aug 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title:
      "Turning a Side Project into Business with Ire Aderinokun - She's in Tech 015",
    snippet:
      'Lindsay and Lyndsey talk with Ire Aderinokun about her journey into tech, and how she founded Buycoins, a cryptocurrency exchange based in Nigeria. They talk about how Ire got involved with Web3 and blockchain development, and how a side project became a business. They also talk about The Feminist Coalition, a group based in Nigeria to champion equality for women in Nigeria, and how Ire became comfortable giving tech talks to large audiences.',
    pubDate: 'Tue, 03 Aug 2021 02:00:00 -0600',
    image: '/shesintech.png',
    type: 'podcast',
    host: true,
    name: "She's In Tech",
  },
  {
    title: 'Developing Desktop Apps With Vue - VUE 157',
    snippet:
      'The panel talks with prolific JS developer The Jared Wilcurt about developing cross-platform desktop apps using nw.js and vuejs. Jared covers the history of tools to create cross-platform apps, how they all work, and then dives into his GitHub repo that provides the boilerplate to start and create a new app using Vue',
    pubDate: 'Tue, 27 Jul 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'S08E014 Modern Web Podcast - Elm with Richard Feldman',
    snippet:
      'In this episode, Lindsay Wardell talks with Richard Feldman about Elm, the delightful functional programming language for creating web applications. They discuss how Richard got into programming and his first experiences with Elm, then dive into some of the key features of Elm such as no runtime exceptions and its helpful compiler. They then discuss where Elm is going, and some of the great community tools that exist in the Elm ecosystem.',
    pubDate: 'Fri, 23 Jul 2021 17:24:37 +0000',
    image: '/modernweb.webp',
    type: 'podcast',
    host: true,
    name: 'Modern Web',
  },
  {
    title:
      'Developing Vuetify with John Leider and Kael Watts-Deuchar - VUE 156',
    snippet:
      'Luke and Lindsay talk with John Leider and Kael Watts-Deuchar from the Vuetify team. We discuss the history of Vuetify development, and the experience of writing Vuetify 3 with Vue 3. We also talk about some of the technical hurdles experienced in the past and present, and how the Vuetify team overcame them.',
    pubDate: 'Tue, 20 Jul 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Diving into StackBlitz with Eric Simons - VUE 155',
    snippet:
      'Lindsay, Solomon, and Luke get to talk with Eric Simons, CEO of StackBlitz about their recent release of WebContainers and the future of Vue in StackBlitz. We talk about how Eric came to tackle the impossible task of running Node in the browser, what to expect for Vue support in StackBlitz, and upcoming developments for the browser-based IDE.',
    pubDate: 'Tue, 13 Jul 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'A Tale of Refactoring with Mariana Picolo - VUE 154',
    snippet:
      'In this episode, Lindsay, Steve, Luke, and Solomon talk with Mariana Picolo about her experience refactoring a large Vue application. They discuss the problems developers face with ever-growing applications, actionable steps to discuss these issues with management, and solutions for large bundle sizes, coding best practices, and reducing duplicated code in your codebase.',
    pubDate: 'Tue, 06 Jul 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title:
      'Localize Any Vue App in Less than an Hour with Titus Decali - VUE 153',
    snippet:
      'Luke and Lindsay discuss localization with Titus Decali, developer and UI/UX product designer. We discuss his journey from design to development, and dive into his workflow for localizing Vue applications. We talk about tools that Titus uses to improve the localization workflow, reducing the time it takes to set up a translation pipeline. We also discuss handling currencies and SEO.',
    pubDate: 'Tue, 29 Jun 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Panelist Career Retrospective - VUE 152',
    snippet:
      "In this episode, Steve, Lindsay, and Luke discuss things they wish they'd known earlier in their careers, and things newer developers could benefit from today. They talk about their early days in programming, and the lessons they learned along the way about being developers.",
    pubDate: 'Tue, 22 Jun 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Reactivity in Vue with Timi Omoyeni - VUE 150',
    snippet:
      "Timi Omoyeni joins the podcast to discuss reactivity in Vue. Timi and the panel discuss the react and the ref methods and how they fit into a reactive paradigm within Vue and wander through Timi's story and the use cases for reactive programming within Vue apps.",
    pubDate: 'Tue, 08 Jun 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title:
      'S08E012 Modern Web Podcast - Modern CSS & Accessibility with Stephanie Eckles',
    snippet:
      "In this episode, Lindsay Wardell talks with Stephanie Eckles about her work with Modern CSS and accessibility. They discuss how Stephanie got into programming, and what drew her to start writing ModernCSS.dev, an excellent resource for learning the latest supported concepts in CSS. They also talk about some of the features in CSS that developers may not be aware of, as well as, some upcoming features that aren't released yet. Stephanie also talks about accessibility, and how CSS can be impacting your site's users' ability to use it. We end talking about Stephanie's upcoming workshop, and how she uses 11ty to build her sites and projects.",
    pubDate: 'Fri, 04 Jun 2021 13:51:21 +0000',
    image: '/modernweb.webp',
    type: 'podcast',
    host: true,
    name: 'Modern Web',
  },
  {
    title: 'Talking SEO in Nuxt with Anamol Soman - VUE 149',
    snippet:
      "Lindsay, Steve, and Luke Diebold discuss SEO in Nuxt with Anamol Soman. We talk about how he got started with Vue, and his initial blog posts on Nuxt. We dive into SEO, what it is and why it's important, and how to integrate plugins with Nuxt to improve search engine optimization. We also discuss some of the difficulties developers run into with optimizing their sites.",
    pubDate: 'Tue, 01 Jun 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Ecstatic for XState with Maya Shavin - VUE 147',
    snippet:
      "Lindsay and Steve talk with Maya Shavin about XState, a library for building finite state machines. We talk about what XState is, how it compares to global state management tools like Vuex, and how to integrates it with Vue. We also discuss XState's visualizer, which helps developers see how their state machines work.",
    pubDate: 'Tue, 11 May 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'Building Scalable Applications with Quasar - VUE 146',
    snippet:
      "In this episode, Lindsay and Steve talk with Luke Diebold and Paolo Caleffi (Callo) about Quasar, a Vue framework that provides a path to build applications for web, desktop, and mobile platforms, while providing a highly customizable Material Design component library. We talk about what it is, how it works, and how to get started, as well as integration with a backend such as Laravel. We also discuss the pain points developers may run into, and what's coming next with Quasar 2.",
    pubDate: 'Tue, 27 Apr 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'S08E09 Modern Web Podcast - Sides Projects with Shawn Wang',
    snippet:
      'In this episode, Lindsay Wardell and Hunter Miller talk side projects with Shawn Wang. We discuss the projects they do on the side, and what kind of side projects they enjoy working on. Shawn also talks about his book, "The Coding Career Handbook", and how it started as a side project as well. We also talk about the importance of writing your own blog posts, and sharing your experience and learning in public to help both yourself and others, rather than blogging for numbers. We wrap up with a discussion on being a part-time creator, and finding a company that supports their employees and match what you\'re looking to do.',
    pubDate: 'Wed, 21 Apr 2021 19:57:08 +0000',
    image: '/modernweb.webp',
    type: 'podcast',
    host: true,
    name: 'Modern Web',
  },
  {
    title: 'VUE 145: Vue 3 and Socket.io with Solomon Eseme',
    snippet:
      "Lindsay and Steve talk with Solomon Eseme, Software Engineer and Technical Writer. They discuss how Solomon got into web development, his journey from the frontend to the backend (and back again), and how he came to use Vue. They dive into Solomon's blog post on building a chat app with Socket.io and Vue 3, and its impact at an enterprise that read it. We also talk about Solomon's upcoming project, Profaily.",
    pubDate: 'Tue, 20 Apr 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 144: Web Workers in Vue with Martins Onuoha',
    snippet:
      "Lindsay and Steve discuss Web Workers with Martins Onuoha. They talk about Martins' start in programming, and how he came to love Vue for its simplicity. Martins explains what Web Workers are, when they are useful, and how to integrate them with a Vue application.",
    pubDate: 'Tue, 13 Apr 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 143: What to do when you want to blog with Vue',
    snippet:
      'Lindsay and Steve discuss building and hosting a blog using Vue. They discuss their own blogs, and dive into options for managing content with markdown or headless CMS, building the site with Vue or Nuxt (and others), and where to host',
    pubDate: 'Tue, 30 Mar 2021 16:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: "VUE 142: From Nuxt to React - Catching up with Debbie O'Brien",
    snippet:
      "Lindsay and Steve talk with Debbie O'Brien, Head Developer Advocate at Bit and former Head of Learning at Nuxt about her new position. We talk about what Bit is, and how they are bringing a new approach to component development. We also talk about how Debbie is having to learn React, what that looks like for an experienced Vue developer, and ways we learn new frameworks and libraries.",
    pubDate: 'Tue, 23 Mar 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'S08E06 Modern Web Podcast - Tailwind JIT and Utility CSS',
    snippet:
      "In this episode, Rob Ocel discusses the recent release of Tailwind's Just-In-Time (JIT) CSS compiler with Hunter Miller and Lindsay Wardell. They discuss the new features the JIT compiler provides, as well as, the performance boost developers can expect on their own projects. They also talk about the benefits of utility CSS compared to other methods, and how Tailwind can be used to build out many types of design systems. They also explore other utility CSS frameworks, including Windi CSS, and discuss the future of utility CSS in the development world.",
    pubDate: 'Fri, 19 Mar 2021 16:34:37 +0000',
    image: '/modernweb.webp',
    type: 'podcast',
    host: true,
    name: 'Modern Web',
  },
  {
    title: 'VUE 141: Diving into Nuxt 3 with Daniel Roe',
    snippet:
      'In this episode, Lindsay and Steve talk Nuxt 3 with Daniel Roe, Framework Engineer at Nuxt. We talk about upcoming features, including Nitro (the new server-side renderer for Nuxt), serverless deployment with Netlify or Vercel, Nuxt Kit, and an upcoming Nuxt CLI. We also dive into deployment options, and how to deploy you application in Nuxt 2 and 3. We end with a discussion on release date, and how you can participate in the private alpha for Nuxt 3.',
    pubDate: 'Tue, 16 Mar 2021 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 140: Exploring Vitesse with Anthony Fu',
    snippet:
      "In this episode, Lindsay talks with Anthony Fu, full-time open source contributor and author of Vitesse, an opinionated template for using Vite. We explore some of Anthony's work in open source, and what inspired him to use Vite to rebuild his site.",
    pubDate: 'Tue, 02 Mar 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 139: Exploring Inkline with Alex Grozav',
    snippet:
      "In this episode, Lindsay and Steve talk to Alex Grozav, creator of the Inkline UI framework. We discuss how he came to web development, and what led him to creating his own UI framework. We talk about the differences between Inkline and other common frameworks, as well as the driving principles behind Inkline's design. Alex also shared his advice for anyone looking to build a UI framework or library.",
    pubDate: 'Tue, 23 Feb 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 138: Vue and Ruby with Austin Story',
    snippet:
      'In this episode, Lindsay talks with Austin Story, Technical Lead at Doximity, about their adoption of Vue server-side rendering and eventually Nuxt. We talk about the challenges the team faced, and how they reacted to the shift. We also discuss the difference between the Ruby and JavaScript ecosystems, and how those languages impact development choices.',
    pubDate: 'Tue, 16 Feb 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 137: Using Laravel and VueJS in an Enterprise Application',
    snippet:
      'The panel talks with Jay Hariani, CTO of GovTribe. GovTribe is an enterprise application built with Laravel and VueJS that provides government contractors with a centralized location for available government contract and grant information that is easily searchable and customizable. The discussion covers why GovTribe went with Laravel and Vue, what their strengths are, and other tools that GovTribe uses to get very good SEO results and customer satisfaction.',
    pubDate: 'Tue, 09 Feb 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 136: Ionic and Vue with Michael Tintiuc',
    snippet:
      "In this episode, Lindsay, Steve, and Raymond talk with Michael Tintiuc, tech lead at Modus Create and author of the Ionic Vue library. We discuss what Ionic is, how Michael integrated it with Vue, and how everything works together for building mobile applications. We also discuss Michael's experience as a designer and using multiple languages, and how that impacts his work as a developer.",
    pubDate: 'Tue, 02 Feb 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 135: Netlify CMS and Nuxt with Daniel Kelly',
    snippet:
      "In this episode, Lindsay and Steve talk to Daniel Kelly about his theme for Nuxt, Awake, and his experience building it. We discuss Daniel's experience with Laravel, then compare PHP and JavaScript development. We talk about building the theme, integrating it with Netlify CMS, and the benefits of this approach. We also discuss the plugins Daniel is using in Awake to make it as fast as possible.",
    pubDate: 'Tue, 26 Jan 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 133: Teach VueJS with Erik Hanchett',
    snippet:
      'Steve and Lindsay talk with Erik Hanchett about his experience teaching VueJS. Erik is a published author, prolific Youtube video creator, and has created multiple online courses all for the purpose of teaching Vue. The discussion ranges from how he creates runs his courses, to the benefits of writing for an established publisher, to developer job interviews, and finally certifications for developers.',
    pubDate: 'Tue, 12 Jan 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 132: Vue Reactivity with Oscar Spencer',
    snippet:
      "In this episode, Lindsay, Steve, and Raymond talk with Oscar Spencer, developer at Tidelift and creator of the Grain programming language. We discuss Vue's reactivity engine, both how it worked in Vue 2 and how it's changed for Vue 3. We also talk about some use cases, both within Vue and outside of it. Finally, we talk a bit about Grain, a strongly-typed functional language that compiles to WASM.",
    pubDate: 'Tue, 05 Jan 2021 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 131: Creating Content with Mitchell Romney',
    snippet:
      "In this episode, Lindsay talks with Mitchell Romney about his journey into programming and video content creation. They discuss how Mitchell got started with IT, and found a passion for writing code. They also explore Mitchell's streaming and YouTube content, and his free course on Vue 3 for beginners. They discuss the importance of giving back to the community, working together, and having fun while programming.",
    pubDate: 'Tue, 29 Dec 2020 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 129: GraphQL and Vue with Anjolaoluwa Adebayo-Oyetoro',
    snippet:
      'In this episode, Lindsay, Steve, and Raymond talk with Anjolaoluwa Adebayo-Oyetoro (Jola), lead front-end developer at RevelFinance and technical writer at LogRocket. We discuss how his team found itself making too many API calls, and decided to move to GraphQL. We talk about what GraphQL is, its strengths, and how to solve common problems like usage in Vue and authentication. Jola also gives his tips on learning GraphQL, and where to go to learn it.',
    pubDate: 'Tue, 22 Dec 2020 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 130: Nuxt and Storyblok with Alba Silvente Fuentes',
    snippet:
      'Lindsay and Steve talk with Alba Silvente, senior frontend developer at Blue Harvest and ambassador for Nuxt and Storyblok. We talk about how she came to use Vue, and some of the technologies that she loves to use. We discuss her blog series on building a dashboard with Tailwind, Nuxt, and Storyblok. We also explore how to integrate Storyblok into a Nuxt app.',
    pubDate: 'Tue, 01 Dec 2020 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title:
      'VUE 128: Templates to Scoped Slots - Reusable Components with Michael Thiessen',
    snippet:
      'In this episode of Views on Vue, Lindsay and Raymond talk with Michael Thiessen about his new course, Reusable Components. We discuss Michael’s six levels of reusability, and his process in building the course to help developers have their own ‘aha’ moments with these concepts. We also talk about the tools Michael used to build the course, from coding in Vue 3 to hosting and authentication to video editing. We also gets Michael’s tips for someone wanting to build their own course.',
    pubDate: 'Tue, 17 Nov 2020 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VUE 127: Introduction to Svelte with Mark Volkmann',
    snippet:
      'In this episode of Views on Vue, Lindsay, Steve, and Raymond explore Svelte with Mark Volkmann, the author of Svelte in Action. We talk about what Svelte is, and how it compares to Vue. We also talk about Sapper, and all that it can do for a server-side generated application.',
    pubDate: 'Tue, 10 Nov 2020 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 126: Vue Composition API and Nuxt with Daniel Roe',
    snippet:
      'In this episode of Views on Vue, Lindsay and Steve talk with Daniel Roe, CTO of Parent Scheme, about the Vue 3 Composition API. They discuss what the composition API is, and how it simplifies development of features in Vue. Daniel is also working on composition API hooks for Nuxt, and we dive into how these hooks work to enable SSR with Vue 3. We then talk about Vuex and the composition API, and whether you can (or should) replace it.',
    pubDate: 'Tue, 27 Oct 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title:
      'VoV 125: React and Typescript for a Vue developer with John Datserakis',
    snippet:
      'In this episode of Views on Vue, Lindsay and Steve talk with John Datserakis, software engineer at Indigo Ag. We catch up on what John’s been doing since his last appearance on the show, and discuss his experience working with React and Typescript in production. We talk about React hooks, and how they compare to Vue 3 Composition API. We also talk about how React is closer to plain Javascript compared to Vue’s ‘batteries included’ approach.',
    pubDate: 'Tue, 20 Oct 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 124: Why End-To-End Test using Cypress with Gleb Bahmutov',
    snippet:
      'In this episode of Views on Vue, we talk with Gleb Bahmutov, VP of Engineering at Cypress, about the importance of end-to-end testing, and why to use Cypress for your tests. We discuss how to write tests that cover a majority of your codebase, as well as new features such as component testing. We also talk about code coverage, and generating reports to determine how well your tests work to validate your application.',
    pubDate: 'Tue, 06 Oct 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title:
      "VoV 123: What To Expect When You're Expecting Vue 3 with Raymond Camden",
    snippet:
      'In this episode of Views on Vue, Lindsay and Steve talk with Raymond Camden about the upcoming Vue 3 release, and how it’s important for open source in general to communicate well with developers. We discuss the needs of developers who just want to get work done, and the need to not break the expectations around a library or framework. We talk about the Composition API, as well as new features like Teleport and Suspense.',
    pubDate: 'Tue, 29 Sep 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 121: Reusable Components with Michael Thiessen',
    snippet:
      'In this episode of Views on Vue, Lindsay talks with Michael Thiessen, who is working on a new course about Reusable Components. We dive into the six levels of reusability, and talk about how to make your components more flexible across your application. We also discuss when is a good time to start abstracting your components, and some ideas on handling large numbers of props.',
    pubDate: 'Tue, 15 Sep 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 120: Vue Formulate with Justin Schroeder',
    snippet:
      'Lindsay talks with Justin Schroeder about Vue Formulate, a form library with some new ideas. We discuss how to build forms, the straightforward API for creating inputs, and how to customize the form. We also discuss how developers can bind directly to the form, rather than each component, and how validation is layered in at every step. Finally, we discuss form generation from JSON or objects, and how to create form groups.',
    pubDate: 'Tue, 08 Sep 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 119: Climate Change and the Tech Community with Callum Macrae',
    snippet:
      'In this episode of Views on Vue, Lindsay talks with Callum Macrae about the impact of the tech community on climate change. We discuss the impact of data centers and data transmission over the internet, some of the tech industry’s support of carbon emissions, and how we as individuals can make a difference.',
    pubDate: 'Tue, 01 Sep 2020 14:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: "VoV 118: Nuxtify Everything with Debbie O'Brien",
    snippet:
      'In this episode of Views on Vue, Lindsay and Steve talk with Debbie O’Brien, Head of Learning at Nuxt. We discuss Nuxt becoming a company, the new component and content modules, and the static module. We also talk about enhancements to the Nuxt documentation, providing new ways to learn Nuxt and ways to integrate it with other technologies.',
    pubDate: 'Tue, 25 Aug 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 117: Building Vue Storefront with Filip Rakowski',
    snippet:
      "In this episode, Lindsay talks with Filip Rakowski, co-founder and CTO of Vue Storefront. They discuss how Filip got into programming, frontend development for eCommerce, and what led to the development of Vue Storefront. They also discuss what's coming in Vue Storefront Next, and Filip's experience with the Composition API. Filip also discusses launching open source projects early, and how he build a community around Vue Storefront.",
    pubDate: 'Tue, 11 Aug 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 115: Vue, Vapper, Vite - Frameworks Built Using Vue',
    snippet:
      'This week the Views of Vue panelists discuss the frameworks built using Vue. We start with the Vue CLI, then go into Gridsome and static site pros and cons, Nuxt and server side rendering, and Vuepress for simple setup and development. We also discuss other frameworks like Quasar, Vapper, and the experimental Vite.',
    pubDate: 'Tue, 21 Jul 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 114: Pro Tips on Building Vue Applications',
    snippet: 'Join the 30-DAY CHALLENGE: "You Don\'t Know JS Yet"',
    pubDate: 'Tue, 14 Jul 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 113: CSS and Components with Maya Shavin',
    snippet:
      'In this episode of Views on Vue, we talk with Maya Shavin, a Senior Frontend Developer at Cloudinary. We talk about CSS component libraries, CSS-in-JS with Vue, and pros and cons with using libraries like Tailwind CSS. We also discuss Storefront UI, a component library focused on eConmerce.',
    pubDate: 'Tue, 07 Jul 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 112: Build Moblie Apps with Nativescript-Vue with Tiago Alves',
    snippet: 'Vue Remote Conf 2020',
    pubDate: 'Tue, 30 Jun 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 111: Educating about VueJS with Erik Hanchett',
    snippet: 'Vue Remote Conf 2020',
    pubDate: 'Tue, 23 Jun 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 110: Vuetify Next with John Leider',
    snippet: 'Vue Remote Conf 2020',
    pubDate: 'Tue, 16 Jun 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 109: Migrating from Backbone to Vue with Brad Balfour',
    snippet:
      'In this episode, we talk to Brad Balfour, senior developer at Bloomberg, about how his team began to implement Vue in their existing applications. We also discuss how Vue let their team move faster, and how the Vue component ecosystem allows for quick development using existing solutions. We also talk about the experience of learning and implementing Vue on a large project with an existing team.',
    pubDate: 'Tue, 09 Jun 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 108: Inside Vue 3 with Gregg Pollack',
    snippet:
      'In this episode, Lindsay, Steve, and Austin talk with Gregg Pollack of Vue Mastery about his course with Evan You on the new reactivity model in Vue 3. We also discuss the Composition API, and whether it is the right decision to use. At the end, we discuss marketing and building up an audience for your own video courses.',
    pubDate: 'Tue, 02 Jun 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 107: Cypress Testing with Amir Rustamzadeh',
    snippet:
      "In this episode, we talk to Amir Rustamzadeh about the end-to-end testing framework Cypress. We discuss what it is, what it's useful for, and how to test a Vue application. We also discuss mocking APIs, and how easy it is to get started with Cypress.",
    pubDate: 'Tue, 19 May 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 106: Component Communication ',
    snippet: 'JavaScript Remote Conf 2020',
    pubDate: 'Tue, 28 Apr 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 105: The Vue Component Libraries with Gwendolyn Faraday',
    snippet: 'JavaScript Remote Conf 2020',
    pubDate: 'Tue, 21 Apr 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 104: Exploring GraphQL in Vue with Vladimir Novick',
    snippet: 'JavaScript Remote Conf 2020',
    pubDate: 'Tue, 07 Apr 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title:
      'VoV 103: Progressive Form Validation & Instance Aware Vuex Modules with Matt Brophy',
    snippet: 'JavaScript Remote Conf 2020',
    pubDate: 'Tue, 24 Mar 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 102: Components from the Ground Up',
    snippet:
      'The Views on Vue panelists discuss components: They delve into what is it, when to create a new one, data management between components and their favorites.',
    pubDate: 'Tue, 17 Mar 2020 04:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 101: Real Life Projects Using Vue',
    snippet:
      "Dean and Lindsay talk about the projects they're working on and the technologies they're using. Dean talks about using Apache Cordova and Firebase to build mobile apps. Lindsay is working on building his own card game and short circuited the physical design process by building an electron app. Keep listening to see what else they're working on.",
    pubDate: 'Tue, 10 Mar 2020 05:00:00 -0600',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: ' VoV 100: Views on Vue Celebrates 100th Episode',
    snippet: 'Panel:',
    pubDate: 'Tue, 03 Mar 2020 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 098: Gridsome and Gridsome Plugins',
    snippet:
      'Lindsay has been working with Gridsome for a while and leads the discussion about what Gridsome is and how it works. A bit of time is spent comparing it to Gatsby from the React Ecosystem. Lindsay also walks the panel through the process of building a Gridsome plugin.',
    pubDate: 'Tue, 18 Feb 2020 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 096: Cordova and Vue with Daniel Purcell',
    snippet:
      'In this episode of Views on Vue the panel interviews Daniel Purcell, asking him about using Cordova with Vue. He starts by explaining what Cordova is and how to get started with Cordova. The panel discusses using VueCLI with Cordova. Daniel explains how to make your app look like a mobile app and recommends some tools to help your app look more native. ',
    pubDate: 'Tue, 21 Jan 2020 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 095: New to Vue with Mirjam Bäuerlein',
    snippet:
      'In this episode of Views on Vue the panel interviews Mirjam Bäuerlein, a developer who is new to Vue. Mirjam starts by explaining her coding journey. She has been coding as a hobby since she was 11 and about 3 years ago decided to make it a career. Her work at the time moved her to frontend development in React; giving her the shot that she needed to get a jump on her new career path. Her newest job is using Vue and is the reason she switched to Vue. ',
    pubDate: 'Tue, 14 Jan 2020 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 094: Head to Toe Development Set Up',
    snippet:
      'In this episode of Views on Vue the panel shares what their set-ups look like. They start by discussing IDE and text editors. Most of them use VScode for their setups but they like to use others when they need them. The panelist list some of their favorite plugins, Vetur, Prettier, Vue peeks, NPM, word counters, and spell checkers. They talk about Vue CLI and other CLIs they use. ',
    pubDate: 'Tue, 07 Jan 2020 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 093: Vuetensils with Austin Gil',
    snippet:
      'In this episode, the panel interviews Austin Gil, author of Vuetensils. Austin begins by explaining that Vuetensils is and why he wrote it. Vuetensils is a UI library filled with naked components that make it easy to build accessible apps. The panel explains that it is not as opinionated as other libraries making it easy to style yourself. ',
    pubDate: 'Tue, 31 Dec 2019 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    title: 'VoV 091: Meet Our New Panel',
    snippet:
      'In this episode of Views on Vue the new panel is introduced. Lindsay Wardell is a full-stack developer from Portland, Oregon. Steve Edwards was in tech support for 20 years and is a self-taught programmer who is now working full time in Vue. Devlin was a registered nurse, who studied development by night. Charles Max Wood, CEO of Devchat.tv, got a degree from BYU and has been in development and podcasting for about 13 years. ',
    pubDate: 'Tue, 10 Dec 2019 04:00:00 -0700',
    image: '/viewsonvue.jpeg',
    type: 'podcast',
    host: true,
    name: 'Views on Vue',
  },
  {
    url: 'https://www.youtube.com/watch?v=LPw8ZvEyOnQ',
    title: 'The Retro Week of March 28th, 2021',
    snippet:
      "On this week's \"The Watercooler\", we're talking with Lindsay Wardell, Software Engineer at This Dot Labs. She talks about what's new with the latest release of Vite, the build tool!",
    pubDate: '2021-03-28T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/LPw8ZvEyOnQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtKe2q1p3B6jcsaQgVz--weqzlTA',
    type: 'video',
    host: false,
    name: 'The Retro',
  },
  {
    url: 'https://www.youtube.com/watch?v=79DWd9RR8Gs',
    title:
      'The Near Future of Node Development with James Snell, Build IT Better Architecture',
    snippet:
      'In this episode, Lindsay Wardell (@lindsaykwardell) talks to James Snell (@jasnell)- member of the Node.JS Technical Steering Committee. They talk about the near future advancements in the works for Node, the process of making TC39 proposals, and more.',
    pubDate: '2021-09-21T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/79DWd9RR8Gs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCZSpy6LOe0S6gL-7bU1yO7pde8tQ',
    type: 'video',
    host: true,
    name: 'Build IT Better',
  },
  {
    url: 'https://www.youtube.com/watch?v=RKtQOUzOano',
    title: 'JAMstack + GraphQL APIs with StepZen ft. Brian Rinaldi, JAMhack',
    snippet:
      "This week's host is Lindsay Wardell (@lindsaykwardell), Software Engineer at This Dot Labs, and our guest is Brian Rindaldi (@remotesynth), Developer Advocate at StepZen! In this episode, our participants talk about building JAMstack and GraphQL APIs using StepZen.",
    pubDate: '2021-07-08T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/RKtQOUzOano/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAq4um-6LHJsRv9GEyCjqZVqX9kOA',
    type: 'video',
    host: true,
    name: 'JAMhack',
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
    name: 'The Retro',
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
    name: 'Javascript Marathon',
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
    name: 'Build IT Better',
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
    name: 'Javascript Marathon',
  },
  {
    url: 'https://www.youtube.com/watch?v=z4ta7r6yqVU&t=2s',
    title: 'JavaScript After Dark ft. Lindsay Wardell',
    snippet:
      "In this week's episode, we talk with Lindsay Wardell (@lindsaykwardell), Software Engineer from This Dot Labs! Lindsay shares what she's been interested in lately in the world of Vue, plus we hear about how Lindsay started learning React and even built her own router while creating a turn based strategy game!",
    pubDate: '2021-05-27T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/z4ta7r6yqVU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCjjPp1e5nYVt3pP-RCyJ7JoZL2Ig',
    type: 'video',
    host: false,
    name: 'Javascript After Dark',
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
    name: 'VueJS Athens',
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
    name: 'The Tech Academy',
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
    name: 'Wikimania',
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
    name: 'Some Antics',
  },
  {
    url: 'https://javascriptjabber.com/what-s-new-with-elm-ft-lindsay-wardell-jsj-527',
    title: "What's New with Elm? ft. Lindsay Wardell - JSJ 527",
    snippet:
      'Elm is a functional language that compiles to JavaScript and runs in the browser. Lindsay Wardell from NoRedInk joins the JavaScript Jabber panel this week to discuss her background with Vue and Elm. The discussion ranges into how Lindsay got into Elm and how it differs and solves some of the issues that crop up when people build apps with JavaScript.',
    pubDate: '2022-04-12T00:00:00.000Z',
    image: '/jsj.jpeg',
    type: 'podcast',
    host: false,
    name: 'Javascript Jabber',
  },
  {
    url: 'https://fsjam.org/episodes/episode-72-elm-with-lindsay-wardell',
    title: 'Episode 72 - Elm with Lindsay Wardell',
    snippet:
      "In this episode we discuss NoRedInk's experience using Elm in production, the combined power of functional programming and static type systems, building a language for the long term, and the difficulty of explaining the benefits of purely functional languages to developers who have never experienced them.",
    pubDate: '2022-05-06T00:00:00.000Z',
    image:
      'https://images.transistor.fm/file/transistor/images/show/15767/medium_1603833407-artwork.jpg',
    type: 'podcast',
    host: false,
    name: 'FSJam',
  },
  {
    url: 'https://www.youtube.com/watch?v=W13X7wjKejs',
    title: 'Side Projects - The Value of Building in Public',
    snippet:
      'Tech Academy graduate Lindsay Wardell discussed side projects and building in public! Lindsay shared how she has grown her development knowledge through the creation of an ongoing, engaging side project, and a few ways to think about the purpose of different side projects.',
    pubDate: '2022-05-13T00:00:00.000Z',
    image:
      'https://i.ytimg.com/vi/W13X7wjKejs/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLARu_Nr290hur8U9FBBh5iSq6bvFA',
    type: 'meetup',
    host: false,
    name: 'The Tech Academy',
  },
  {
    url: 'https://open.spotify.com/episode/64kMufOBufDspsLgJfskbD',
    title: 'Functional and Object-Oriented Programming with Lindsay Wardell',
    snippet:
      "Richard and Lindsay talk about their experiences with FP and OOP, and some less obvious differences they've noticed between the two paradigms.",
    pubDate: '2022-06-06T00:00:00.000Z',
    image:
      'https://storage.googleapis.com/com-resonaterecordings-public/cover-art/3yUDSlWimXAlnh7BmozHQ3WkJsGgNR4G74ThyKKT.jpg',
    type: 'podcast',
    host: false,
    name: 'Software Unscripted',
  },
  {
    url: 'https://www.youtube.com/watch?v=crUrv2-Uq8s',
    title: 'Build Elm Apps with Lindsay Wardell',
    snippet:
      "Previously on Some Antics, we dove into the syntax for Elm, a functional programming language that compiles down to JavaScript, with friend of the show Lindsay Wardell — but we weren't able to get to application development in time. Join us as Lindsay returns to the stream for a sequel on building Elm apps!",
    pubDate: '2022-07-15T00:00:00.000Z',
    image: '/blog/someantics-elm-apps.png',
    type: 'video',
    host: false,
    name: 'Some Antics',
  },
]

// function fetchPodcasts() {
//   return fetch('https://lindsaykwardell.com/.netlify/functions/podcasts')
//     .then((res) => res.json())
//     .then((res) => {
//       if (Array.isArray(res)) return res
//       else throw Error()
//     })
//     .catch(() => [])
// }

export async function getPodcasts() {
  // const podcasts = await fetchPodcasts()

  return naturalOrder([
    // ...podcasts.map((podcast) => ({ ...podcast, type: 'podcast', host: true })),
    ...oneOffs,
  ])
    .orderBy('desc')
    .sort(['pubDate'])
}
