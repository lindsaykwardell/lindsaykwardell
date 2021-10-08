<template>
  <div class="flex justify-between w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
    <a
      href="https://twitter.com/lindsaykwardell"
      class="hover:text-lindsay transition duration-150"
    >
      <font-awesome-icon class="text-2xl" :icon="['fab', 'twitter']" />
    </a>
    <a
      href="https://dev.to/lindsaykwardell"
      class="hover:text-lindsay transition duration-150"
    >
      <font-awesome-icon class="text-2xl" :icon="['fab', 'dev']" />
    </a>
    <a
      href="https://linkedin.com/in/lindsaykwardell"
      class="hover:text-lindsay transition duration-150"
    >
      <font-awesome-icon class="text-2xl" :icon="['fab', 'linkedin']" />
    </a>
    <a
      href="https://github.com/lindsaykwardell"
      class="hover:text-lindsay transition duration-150"
    >
      <font-awesome-icon class="text-2xl" :icon="['fab', 'github']" />
    </a>
    <!-- <a href="/rss.xml" class="hover:text-lindsay transition duration-150">
      <font-awesome-icon class="text-2xl" :icon="['fa', 'rss-square']" />
    </a> -->
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faDiscord,
  faTwitter,
  faDev,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

library.add(faGithub, faDiscord, faTwitter, faDev, faLinkedin);

export default {
  components: {
    FontAwesomeIcon,
  },
};
</script>
