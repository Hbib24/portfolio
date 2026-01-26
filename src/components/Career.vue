<script>
import rbk1 from "../assets/projects/rbk-1.jpg";
import rbk2 from "../assets/projects/rbk-2.jpg";
import ataa from "../assets/projects/ATAA.png";
import insight from "../assets/projects/insight.png";
import euromedi from "../assets/projects/euromedi.png";

import moment from "moment/dist/moment";
import "moment/dist/locale/fr";

export default {
  mounted() {
    moment.locale(this.$i18n.locale);
  },
  watch: {
    "$i18n.locale"(lang) {
      moment.locale(lang);
    },
  },
  data() {
    return {
      $moment: moment,
      projects: [
        {
          id: "rbk",
          date: new Date("08-01-2021"),
          title: "RBK Reboot camp",
          subtitle: "Fullstack Javascript certification",
          icons: [
            "javascript-original",
            "typescript-original",
            "html5-original",
            "css3-original",
          ],
          images: [rbk2, rbk1],
          text: "projects.rbk",
        },
        {
          id: "adrissa",
          date: new Date("02-01-2022"),
          title: "Adrissa",
          videos: [
            {
              url: "https://www.youtube.com/embed/mcAz0q1xKPU?si=ks6nonII_oedXymO",
            },
          ],
          subtitle: "Freelance project | Fullstack",
          icons: ["vuejs-original", "express-original"],
          images: [],
          text: "projects.adrissa",
        },
        {
          id: "euromedi",
          date: new Date("02-01-2022"),
          title: "Euromedi - Auditor",
          subtitle: "Freelance project | Front-end manager",
          icons: ["vuejs-original"],
          images: [euromedi],
          text: "projects.euromedi",
        },
        {
          id: "insight",
          date: new Date("06-01-2022"),
          title: "Full-Stack developer at Insight Plus",
          subtitle: "Indeterminate contract",
          icons: [
            "react-original",
            "angular-original",
            "figma-original",
            "symfony-original",
          ],
          images: [insight],
          text: "projects.insight",
        },
        {
          id: "ataa",
          date: new Date("03-01-2023"),
          title: "ATAA",
          subtitle: "Freelance project | Fullstack",
          icons: ["flutter-original", "nestjs-original"],
          images: [ataa],
          text: "projects.ataa",
        },
      ],
    };
  },
};
</script>

<template>
  <div
    class="w-full bg-gray-100 md:bg-white dark:bg-slate-900 md:dark:bg-slate-950 dark:shadow-inner py-6 md:p-6"
  >
    <div class="max-w-(--breakpoint-lg) mx-auto p-6">
      <ol class="relative md:border-s border-slate-400 dark:border-gray-700">
        <li v-for="project in projects" class="md:ms-4 mb-16">
          <div
            class="absolute hidden border-4 dark:border-slate-950 md:block w-6 h-6 bg-slate-800 rounded-full -start-3 border-white dark:bg-gray-700"
          ></div>
          <time
            class="mx-3 hidden md:block text-xl font-normal leading-none text-slate-800 dark:text-gray-500"
            >{{
              $moment(project.date).locale($i18n.locale).format("MMMM Y")
            }}</time
          >
          <div
            class="rounded-2xl hover:shadow-xl shadow hover:scale-103 duration-300 border border-slate-200 dark:border-slate-800 bg-white md:bg-white dark:bg-slate-950 dark:md:bg-slate-900 w-full md:m-6 md:flex-row flex flex-col"
          >
            <div
              :class="
                'flex relative justify-center items-center object-cover rounded-t-2xl md:w-[350px] h-40 md:h-auto md:rounded-none md:rounded-s-2xl overflow-hidden' +
                `${!project.images[0] ? 'dark:bg-slate-800 bg-slate-200' : ''}`
              "
            >
              <img
                v-if="project.images[0]"
                class="md:w-[90%] absolute"
                :src="project.images[0]"
                alt=""
              />
              <svg
                v-else
                class="w-10 h-10 text-slate-500 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path
                  d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
                />
              </svg>
            </div>
            <div
              class="md:w-3/5 flex flex-col gap-8 p-4 border-l dark:border-none border-gray-200"
            >
              <div>
                <h5
                  class="text-3xl font-bold text-slate-950 dark:text-white mb-2"
                >
                  {{ project.title }}
                </h5>
                <div
                  class="rounded-sm dark:bg-white bg-slate-800 dark:text-inherit text-white w-fit px-1"
                >
                  {{ project.subtitle }}
                </div>
              </div>
              <p class="text-slate-500 dark:text-gray-400">
                {{ $t(`projects.${project.id}`) }}
              </p>
              <div class="flex flex-wrap gap-4">
                <div
                  v-for="icon in project.icons"
                  class="rounded-sm bg-gray-100 dark:bg-slate-950 text-slate-950 dark:text-white p-2 flex gap-2 items-center"
                >
                  <img
                    class="w-6"
                    :src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${
                      icon.split('-')[0]
                    }/${icon}.svg`"
                  />
                  <div class="">
                    {{
                      icon.split("-")[0][0].toUpperCase() +
                      icon.split("-")[0].slice(1)
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
