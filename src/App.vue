<script>
import Navbar from "./components/Navbar.vue";
import Landing from "./views/Landing.vue";
export default {
  components: { Navbar, Landing },
  data: () => ({
    darkMode: false,
    statsMode: false,
  }),
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("stats")) {
      this.statsMode = true;
    }
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.darkMode = true;
    }
  },
};
</script>

<template>
  <div v-if="!statsMode" :class="{ dark: darkMode }">
    <Navbar :darkMode="darkMode" :toggleDarkMode="toggleDarkMode" />
    <Landing />
  </div>
  <div v-else class="flex justify-center items-center min-h-dvh">
    <a href="https://info.flagcounter.com/DSwk"
      ><img
        src="https://s01.flagcounter.com/count2/DSwk/bg_FFFFFF/txt_000000/border_CCCCCC/columns_5/maxflags_250/viewers_3/labels_0/pageviews_0/flags_0/percent_0/"
        alt="Flag Counter"
    /></a>
  </div>
</template>
