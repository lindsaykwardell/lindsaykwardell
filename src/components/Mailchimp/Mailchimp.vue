<template>
  <div class="bg-gray-200 p-6 shadow-md mt-16">
    <h4 class="px-4 py-2">Subscribe via Email</h4>
    <form name="subscribe" @submit.prevent="subscribe">
        <label class="text-lg flex-grow block my-5"
          >Email
          <input
            class="p-1"
            type="email"
            v-model="email"
            aria-label="email"
            :disabled="sending"
        /></label>
        <input
          type="submit"
          value="Subscribe"
          aria-label="subscribe"
          class="button p-2 bg-blue-400 hover:bg-blue-600 transition duration-300 rounded-lg text-white shadow-md cursor-pointer"
        />
    </form>
    <div class="mt-4 text-sm">
      <template v-if="sending">Sending...</template>
      <div v-else-if="hasError" v-html="msg" />
      <template v-else>{{ msg }}</template>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data: () => ({
    email: "",
    sending: false,
    hasError: false,
    msg: "",
  }),
  methods: {
    async subscribe() {
      this.sending = true
      this.hasError = false
      try {
        const { data } = await axios.get(
          `/.netlify/functions/mailchimpRegistration?EMAIL=${this.email}`
        )

        this.msg = data

        this.sending = false
      } catch (e) {
        this.hasError = true
        this.msg = e.response.data
      }
    },
  },
}
</script>
