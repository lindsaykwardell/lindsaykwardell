<template>
  <Layout>
    <h1>What I use</h1>
    <h3>Languages, Frameworks, Technologies</h3>
    <ul>
      <li>
        Javascript/Typescript
        <ul>
          <li>Vue</li>
          <li>Gridsome</li>
          <li>Nuxt</li>
          <li>Vuetensils</li>
          <li>React</li>
          <li>Redux</li>
          <li>Gatsby</li>
          <li>Next.js</li>
          <li>Svelte</li>
          <li>Express</li>
          <li>TypeORM</li>
          <li>Socket.io</li>
          <li>Electron</li>
          <li>Type-GraphQL</li>
          <li>Mongoose</li>
          <li>Typegoose</li>
          <li>Google Firebase</li>
        </ul>
      </li>
      <li>
        CSS
        <ul>
          <li>PostCSS</li>
          <li>Tailwind CSS</li>
          <li>PostCSS-Nested</li>
          <li>Sass</li>
          <li>Particle CSS</li>
          <li>Bulma</li>
        </ul>
      </li>
      <li>Elm</li>
      <li>
        Java
        <ul>
          <li>Spring Boot</li>
          <li>JPA</li>
          <li>Hibernate</li>
        </ul>
      </li>
      <li>
        SQL
        <ul>
          <li>MySQL</li>
          <li>IBM DB2</li>
          <li>SQL Server</li>
        </ul>
      </li>
      <li>Docker</li>
      <li>PHP</li>
      <li>
        C#
        <ul>
          <li>Xamarin</li>
          <li>WinForm</li>
        </ul>
      </li>
    </ul>
    <h3>Deployment</h3>
    <ul>
      <li>Netlify</li>
      <li>Heroku</li>
    </ul>
    <h3>Editors</h3>
    <ul>
      <li>VS Code</li>
      <li>Intellij</li>
    </ul>
  </Layout>
</template>

<style lang="postcss" scoped>
li {
  @apply ml-5;

  &:before {
    @apply mr-2;
    content: " - "
  }
}

h3 {
  @apply mt-4;
}
</style>