<script>
import Career from "../components/Career.vue";
import Skills from "../components/Skills.vue";

import resumeFr from "../assets/resume-fr.pdf";
import resumeEn from "../assets/resume-en.pdf";
import { IconBrandGithubFilled, IconDownload } from "@tabler/icons-vue";

export default {
  components: { Skills, Career, IconBrandGithubFilled, IconDownload },
  computed: {
    age() {
      const birthDate = new Date(1998, 3, 24); // Months are 0-indexed: 3 = April
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
  data() {
    return {
      scroll: 0,
      resumeFr,
      resumeEn,
    };
  },
  methods: {
    handleScroll() {
      this.scroll = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<template>
  <div
    class="dark:bg-slate-950 md:bg-slate-100 bg-white md:dark:bg-slate-900 overflow-hidden h-full"
  >
    <div class="relative">
      <section class="h-dvh md:p-6 overflow-hidden">
        <div
          class="md:rounded-2xl h-full w-full bg-white dark:bg-slate-950 shadow-inner p-6 overflow-hidden"
        >
          <div
            :style="{ transform: `translateY(${scroll * 0.5}px)` }"
            class="flex flex-col h-full items-center justify-center"
          >
            <h1
              class="mb-4 text-4xl tracking-widest font-extrabold leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white animate__animated animate__fadeIn"
            >
              Habib Bekir
            </h1>
            <div
              class="flex flex-wrap justify-center items-center gap-6 animate__animated animate__fadeInDown"
              style="animation-delay: 500ms"
            >
              <p
                class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
              >
                Fullstack
              </p>
              <div
                class="h-2 w-2 rounded-full bg-gray-500 dark:bg-gray-400"
              ></div>
              <p
                class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
              >
                Web
              </p>
              <div
                class="h-2 w-2 rounded-full bg-gray-500 dark:bg-gray-400"
              ></div>
              <p
                class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
              >
                Mobile
              </p>
            </div>
          </div>
        </div>
        <!-----------------------
              Devices 
      ------------------------->
        <div
          id="devices"
          :style="{ transform: `translateY(${scroll * 0.7}px)` }"
          class="absolute z-10 flex md:gap-16 gap-8 mx-auto items-center justify-center -bottom-20 md:-bottom-60 -left-1/2 -right-1/2"
        >
          <div
            class="animate__animated animate__fadeInUp z-10"
            style="animation-delay: 600ms"
          >
            <div
              class="relative mx-auto border-slate-900 dark:border-slate-900 bg-slate-900 border-16 rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]"
            >
              <div class="rounded-lg overflow-hidden h-[140px] md:h-[262px]">
                <img
                  src="/images/dash-desktop-light.png"
                  class="dark:hidden h-[140px] md:h-[262px] w-full"
                  alt=""
                />
                <img
                  src="/images/dash-desktop-dark.png"
                  class="hidden dark:block h-[140px] md:h-[262px] w-full"
                  alt=""
                />
              </div>
            </div>
            <div
              class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]"
            ></div>
            <div
              class="relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"
            ></div>
          </div>
          <div
            style="animation-delay: 300ms"
            class="relative animate__animated animate__fadeInUp border-slate-900 dark:border-slate-900 bg-slate-900 border-8 md:border-14 rounded-4xl md:rounded-[2.5rem] md:h-[600px] md:max-w-[300px] h-[300px] max-w-[150px]"
          >
            <div
              class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[10px] md:-start-[17px] top-[72px] rounded-s-lg"
            ></div>
            <div
              class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[10px] md:-start-[17px] top-[124px] rounded-s-lg"
            ></div>
            <div
              class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[10px] md:-start-[17px] top-[178px] rounded-s-lg"
            ></div>
            <div
              class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[10px] md:-end-[17px] top-[142px] rounded-e-lg"
            ></div>
            <div
              class="rounded-[1.7rem] md:rounded-4xl overflow-hidden w-[125px] md:w-[272px] md:h-[572px] w-full h-[285px] bg-white dark:bg-gray-800"
            >
              <img
                src="/images/dash-phone-light.png"
                class="dark:hidden md:w-[272px] md:h-[572px] h-[285px]"
                alt=""
              />
              <img
                src="/images/dash-phone-dark.png"
                class="hidden dark:block md:w-[272px] md:h-[572px] h-[285px]"
                alt=""
              />
            </div>
          </div>
          <div
            class="animate__animated animate__fadeInUp"
            style="animation-delay: 600ms"
          >
            <div
              class="relative mx-auto border-slate-900 dark:border-slate-900 bg-slate-900 border-8 rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]"
            >
              <div
                class="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800"
              >
                <img
                  src="/images/dash-desktop-light.png"
                  class="dark:hidden h-[156px] md:h-[278px] w-full rounded-lg"
                  alt=""
                />
                <img
                  src="/images/dash-desktop-dark.png"
                  class="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg"
                  alt=""
                />
              </div>
            </div>
            <div
              class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]"
            >
              <div
                class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section
      id="about"
      class="w-full relative pt-6 z-20 bg-gray-100 md:bg-white dark:bg-slate-900 md:dark:bg-slate-950"
    >
      <div class="overflow-hidden w-full p-6">
        <div class="flex justify-center">
          <div
            class="max-w-screen-md text-lg font-normal text-pretty text-gray-900 lg:text-2xl dark:text-gray-400 py-10 md:py-20"
            v-html="$t('bio', [age])"
          ></div>
        </div>
      </div>

      <div
        class="flex flex-wrap justify-center items-center w-full gap-18 intro:gap-32 intro:my-20 relative"
      >
        <div
          class="!scale-110 border-slate-900 dark:border-slate-950 md:dark:border-slate-900 md:dark:bg-slate-900 bg-slate-950 border-[8px] md:border-[14px] rounded-[2rem] md:rounded-[2.5rem] md:h-[600px] md:max-w-[300px] h-[300px] max-w-[150px]"
        >
          <div
            class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[10px] md:-start-[17px] top-[72px] rounded-s-lg"
          ></div>
          <div
            class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[10px] md:-start-[17px] top-[124px] rounded-s-lg"
          ></div>
          <div
            class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[10px] md:-start-[17px] top-[178px] rounded-s-lg"
          ></div>
          <div
            class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[10px] md:-end-[17px] top-[142px] rounded-e-lg"
          ></div>
          <div
            class="rounded-[1.7rem] relative z-10 md:rounded-[2rem] overflow-hidden md:w-[272px] md:h-[572px] w-full h-[285px] bg-white dark:bg-gray-800"
          >
            <video
              autoplay
              muted
              loop
              style="pointer-events: none"
              src="/phone-demo.webm"
            ></video>
          </div>
        </div>
        <div
          class="lg:max-w-md text-lg py-6 intro:py-0 font-normal -z-10 flex flex-col md:block justify-end h-64 md:h-fit md:top-0 top-60 text-gray-900 md:text-2xl absolute md:relative dark:text-gray-400 text-pretty px-6 intro:px-0 dark:bg-slate-800 bg-white intro:dark:bg-transparent intro:bg-transparent w-dvw intro:w-auto"
        >
          <div class="max-w-md mx-auto" v-html="$t('intro.1')"></div>
        </div>
      </div>

      <div
        class="flex flex-wrap-reverse md:flex-row justify-center items-center w-full intro:gap-64 mt-72"
      >
        <div
          class="lg:max-w-md text-lg font-normal z-10 text-gray-900 md:text-2xl dark:text-gray-400 text-pretty px-6 intro:px-0 dark:bg-slate-800 bg-white intro:dark:bg-transparent intro:bg-transparent w-dvw lg:w-auto py-12 lg:py-0"
        >
          <div class="max-w-md mx-auto" v-html="$t('intro.2')"></div>
        </div>
        <div class="md:!scale-150 scale-110">
          <div
            class="mx-auto border-slate-900 dark:border-slate-950 bg-slate-950 dark:md:border-slate-900 md:bg-slate-900 border-8 md:border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]"
          >
            <div class="rounded-lg overflow-hidden h-[140px] md:h-[262px]">
              <video
                autoplay
                muted
                loop
                style="pointer-events: none"
                src="/desktop-demo.webm"
              ></video>
            </div>
          </div>
          <div
            class="mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]"
          ></div>
          <div
            class="mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"
          ></div>
        </div>
      </div>

      <div
        class="hidden lg:block relative bg-gray-900 dark:bg-gray-700 mt-24 !z-20 h-12 mx-auto rounded-full desk"
      ></div>

      <div
        class="flex flex-wrap justify-center items-center w-full intro:pb-20 lg:pb-0 intro:gap-32 mt-20 intro:mt-60"
      >
        <div class="dark:bg-gray-700 bg-gray-800 p-4 rounded-t-xl">
          <div class="flex flex-col gap-2">
            <div
              v-for="i of [1, 2, 3, 4, 5]"
              class="bg-gray-900 flex items-center justify-between px-4 w-[60vw] h-12 md:w-96 md:h-20 rounded-lg"
            >
              <div
                class="w-6 h-6 md:h-8 md:w-8 rounded-full bg-blue-500 border-4 border-gray-700"
              ></div>
              <div class="h-1 md:h-2 w-2/3 bg-gray-700 rounded-full"></div>
              <div
                class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400 hdd-light"
              ></div>
              <div
                class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400 hdd-light"
                style="animation-delay: 200ms"
              ></div>
              <div
                class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400 hdd-light"
                style="animation-delay: 400ms"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="lg:max-w-2xl text-lg font-normal text-gray-900 md:text-2xl dark:text-gray-400 text-pretty px-6 intro:px-0 dark:bg-slate-800 bg-white intro:dark:bg-transparent intro:bg-transparent w-dvw intro:w-auto py-12 lg:py-0"
        >
          <div class="max-w-md mx-auto" v-html="$t('intro.3')"></div>
        </div>
      </div>
    </section>

    <section
      id="skills"
      class="w-full py-10 md:py-20 relative z-20 dark:bg-slate-950 md:bg-slate-100 bg-white md:dark:bg-slate-900"
    >
      <Skills />
    </section>

    <section id="career" class="w-full z-20 relative">
      <Career />
    </section>

    <section
      id="contact"
      class="w-full z-20 relative text-lg dark:text-gray-200 dark:bg-slate-950 md:bg-gray-100 bg-white md:dark:bg-slate-900"
    >
      <div
        class="flex md:flex-row flex-col gap-8 md:gap-0 justify-around items-center mt-12 mb-12 max-w-(--breakpoint-xl) mx-auto p-6"
      >
        <div class="flex flex-col gap-3">
          <a
            class="flex items-center gap-2 group"
            href="mailto:habib.bekir@gmail.com"
            ><span class="material-symbols-outlined"> mail </span>
            <span class="group-hover:underline">Habib.bekir@gmail.com</span>
          </a>
          <a class="flex items-center gap-2 group" href="tel:+21624440222">
            <span class="material-symbols-outlined"> call </span>
            <span class="rounded-sm bg-gray-200 dark:bg-slate-700 px-1"
              >+216</span
            >
            <span class="group-hover:underline"> 24 440 222</span>
          </a>
          <a class="flex items-center gap-2 group" href="tel:+21699760334">
            <span class="material-symbols-outlined"> call </span>
            <span class="rounded-sm bg-gray-200 dark:bg-slate-700 px-1"
              >+216</span
            >
            <span class="group-hover:underline">99 760 334</span>
          </a>
        </div>

        <div class="flex flex-col gap-3 *:hover:underline">
          <a href="https://github.com/hbib24" target="_blank"
            ><i class="devicon-github-original" /> <span>Github/Hbib24</span></a
          >
          <a href="https://linkedin.com/in/hbib-bekir" target="_blank"
            ><i class="devicon-linkedin-plain colored" /> In/hbib-bekir</a
          >
        </div>

        <div class="flex flex-col gap-3">
          <a
            download="Hbib Bekir Resume.pdf"
            :href="resumeFr"
            class="flex items-center gap-1 p-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow"
            ><span class="material-symbols-outlined">download</span> Resume
            FR</a
          >
          <a
            download="Hbib Bekir Resume.pdf"
            :href="resumeEn"
            class="flex items-center gap-1 p-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow"
            ><span class="material-symbols-outlined">download</span> Resume
            EN</a
          >
        </div>
      </div>

      <div
        class="text-center text-sm text-white flex items-center gap-1 justify-between bg-gray-950 h-8"
      >
        <div></div>
        <span class="flex items-center gap-1">
          This website was made with
          <span class="material-symbols-outlined text-red-500">favorite</span>
          by yours truly
        </span>
        <a
          href="https://github.com/Hbib24/portfolio/tree/v2"
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer flex items-center px-1 hover:bg-gray-800 h-full"
          ><IconBrandGithubFilled
        /></a>
      </div>
    </section>
  </div>
</template>
