<template>
  <div
    class="dark:bg-slate-950 bg-white md:dark:bg-slate-950 overflow-hidden h-full"
  >
    <div class="relative">
      <section
        class="h-dvh overflow-hidden max-w-(--breakpoint-xl) mx-auto flex justify-around items-center"
      >
        <div>
          <h1 class="text-4xl font-extrabold text-blue-600">
            Let's Get in Touch
          </h1>
        </div>
        <form
          class="dark:bg-slate-900 md:p-8 md:w-1/3 rounded-xl bg-white shadow-lg border dark:border-none flex flex-col gap-8"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label
              for="email"
              class="block mb-2.5 text-sm font-bold text-heading dark:text-slate-600 tracking-wider uppercase"
              >Your Email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="dark:bg-slate-900 border-x-0 border-t-0 dark:text-white border-slate-300 focus:!border-blue-700 focus:border-b-2 dark:border-slate-700 placeholder:text-slate-300 dark:placeholder:text-slate-700 text-heading block w-full py-2.5 placeholder:text-body"
              placeholder="John@example.com"
              required
            />
          </div>
          <div>
            <label
              for="message"
              class="block mb-2.5 text-sm font-bold text-heading dark:text-slate-600 tracking-wider uppercase"
              >Message</label
            >
            <textarea
              id="message"
              name="message"
              rows="4"
              class="dark:bg-slate-900 max-h-52 min-h-14 border-x-0 border-t-0 dark:text-white border-slate-300 focus:!border-blue-700 focus:border-b-2 dark:border-slate-700 placeholder:text-slate-300 dark:placeholder:text-slate-700 text-heading block w-full py-2.5 placeholder:text-body"
              required
              placeholder="Your message..."
            ></textarea>
          </div>
          <div
            v-if="success"
            class="bg-green-200 dark:bg-green-400 text-green-600 dark:text-green-800 py-4 p-2 rounded-lg flex items-center justify-center"
          >
            <IconCircleCheckFilled class="mr-2" stroke="{2}" />
            <p class="font-medium">Message successfully sent</p>
          </div>
          <div
            v-else-if="failed"
            class="bg-red-200 py-4 p-2 rounded-lg flex items-center justify-center"
          >
            <p class="text-red-600 font-medium">
              Failed to send message. Please try again.
            </p>
          </div>
          <button
            v-else
            :class="[
              'flex items-center justify-center gap-1 p-2 py-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow hover:cursor-pointer',
              { 'opacity-50 cursor-not-allowed': loading },
            ]"
            type="submit"
            :disabled="loading"
          >
            Send Message
            <IconSend2 stroke="{2}" />
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import { IconCircleCheckFilled, IconSend2 } from "@tabler/icons-vue";

export default {
  data() {
    return {
      loading: false,
      success: false,
      failed: false,
      message: "",
    };
  },
  components: {
    IconSend2,
    IconCircleCheckFilled,
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.message = "";

      try {
        const formData = new FormData(e.target);
        const response = await fetch("https://formspree.io/f/mgokpkyd", {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        this.message = "Message sent successfully!";
        this.success = true;
      }
    },
  },
};
</script>
