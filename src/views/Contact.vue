<template>
  <div
    class="dark:bg-slate-950 md:bg-slate-100 bg-white md:dark:bg-slate-900 md:overflow-hidden h-full"
  >
    <div class="relative">
      <section class="md:h-dvh md:p-6 md:overflow-hidden">
        <div
          class="md:rounded-2xl h-full md:pt-0 pt-16 w-full bg-white dark:bg-slate-950 shadow-inner flex md:flex-row flex-col items-center justify-center gap-6 md:gap-12 md:overflow-hidden"
        >
          <div class="flex flex-col gap-6 md:max-w-1/3 p-6">
            <h1 class="text-3xl md:text-4xl font-extrabold text-blue-600">
              Let's Get in Touch
            </h1>
            <p class="text-xl md:text-3xl text-pretty dark:text-slate-500">
              I'm always available for new opportunities or collaborations. Feel
              free to reach out!
            </p>
            <div class="flex md:justify-start justify-center gap-8">
              <a
                href="mailto:habib.bekir@gmail.com"
                class="bg-stone-50 items-center justify-center dark:bg-slate-800 group w-16 h-16 p-4 rounded-2xl hover:w-64 overflow-hidden flex gap-2 duration-150 shadow cursor-pointer border dark:border-none"
              >
                <IconMailFilled
                  class="w-8 h-8 text-slate-600 group-hover:text-blue-600"
                />
                <p
                  class="group-hover:block text-nowrap hidden dark:text-slate-500 duration-150"
                >
                  Habib.bekir@gmail.com
                </p>
              </a>
              <a
                href="https://github.com/hbib24"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-stone-50 items-center justify-center dark:bg-slate-800 group w-16 h-16 p-4 rounded-2xl hover:w-46 overflow-hidden flex gap-2 duration-150 shadow cursor-pointer border dark:border-none"
              >
                <IconBrandGithubFilled
                  class="w-8 h-8 text-slate-600 group-hover:text-blue-600"
                />
                <p
                  class="group-hover:block text-nowrap hidden dark:text-slate-500 duration-150"
                >
                  Github/Hbib24
                </p>
              </a>
              <a
                class="bg-stone-50 items-center justify-center dark:bg-slate-800 group w-16 h-16 p-2 rounded-2xl hover:w-42 overflow-hidden flex gap-2 duration-150 shadow cursor-pointer border dark:border-none"
                href="https://www.linkedin.com/in/hbib-bekir/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandLinkedinFilled
                  class="w-8 h-8 text-slate-600 group-hover:text-blue-600"
                />
                <p
                  class="group-hover:block text-nowrap hidden dark:text-slate-500 duration-150"
                >
                  In/hbib-bekir
                </p>
              </a>
            </div>
          </div>
          <form
            class="dark:bg-slate-800 p-8 min-w-[360px] max-w-[400px] md:w-1/3 w-full md:rounded-xl bg-stone-50 md:shadow-lg border dark:border-none flex flex-col gap-8"
            @submit.prevent="handleSubmit"
          >
            <div>
              <label
                for="email"
                class="block mb-2.5 text-sm font-bold text-heading dark:text-slate-500 tracking-wider uppercase"
                >Your Email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-transparent border-x-0 border-t-0 dark:text-white border-slate-300 focus:!border-blue-700 focus:border-b-2 dark:border-slate-700 placeholder:text-slate-300 dark:placeholder:text-slate-600 text-heading block w-full py-2.5 placeholder:text-body"
                placeholder="John@example.com"
                required
              />
            </div>
            <div>
              <label
                for="message"
                class="block mb-2.5 text-sm font-bold text-heading dark:text-slate-500 tracking-wider uppercase"
                >Message</label
              >
              <textarea
                id="message"
                name="message"
                rows="4"
                class="bg-transparent max-h-52 min-h-14 border-x-0 border-t-0 dark:text-white border-slate-300 focus:!border-blue-700 focus:border-b-2 dark:border-slate-700 placeholder:text-slate-300 dark:placeholder:text-slate-600 text-heading block w-full py-2.5 placeholder:text-body"
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
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconCircleCheckFilled,
  IconMailFilled,
  IconSend2,
} from "@tabler/icons-vue";

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
    IconBrandGithubFilled,
    IconMailFilled,
    IconBrandLinkedinFilled,
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
