<script>
export default {
  data() {
    return {
      visibleSections: [],
      skills: {
        languages: [
          { name: "Javscript", icon: "javascript-original" },
          { name: "Typescript", icon: "typescript-original" },
          { name: "Dart", icon: "dart-original" },
          { name: "php", icon: "php-original" },
          { name: "Python", icon: "python-original" },
        ],
        technologies: [
          { name: "Angular", icon: "angular-original" },
          { name: "Vue", icon: "vuejs-original" },
          { name: "React", icon: "react-original" },
          { name: "Nest js", icon: "nestjs-original" },
          { name: "php Symfony", icon: "symfony-original" },
          { name: "Express", icon: "express-original" },
          { name: "Flutter", icon: "flutter-original" },
          { name: "Socket.io", icon: "socketio-original" },
        ],
        designAndTools: [
          { name: "Figma", icon: "figma-original" },
          { name: "Postman", icon: "postman-original" },
          { name: "Ant Design", icon: "antdesign-original" },
          {
            name: "PrimeNg",
            icon: "https://www.primefaces.org/wp-content/uploads/2018/05/primeng-logo.png",
          },
          { name: "Tailwind", icon: "tailwindcss-original" },
          { name: "Material UI", icon: "materialui-original" },
          { name: "Vuetify", icon: "vuetify-original" },
          { name: "Bootstrap", icon: "bootstrap-original" },
        ],
        databases: [
          { name: "MySql", icon: "mysql-original" },
          { name: "Microsoft Sql Server", icon: "microsoftsqlserver-original" },
          { name: "MongoDB", icon: "mongodb-original" },
        ],
        // others: [
        //   { name: "Blender", icon: "blender-original" },
        //   { name: "Godot", icon: "godot-original" },
        //   { name: "Unreal Engine", icon: "unrealengine-original" },
        //   { name: "Unity", icon: "unity-original" },
        // ],
      },
    };
  },
  mounted() {
    this.checkVisibility();
    window.addEventListener("scroll", this.checkVisibility);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.checkVisibility);
  },
  methods: {
    checkVisibility() {
      const skillsDivs = document.querySelectorAll(".skill-div");
      const windowHeight = window.innerHeight;

      skillsDivs.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        // Element is visible when it's between 20% and 100% of viewport height
        const isVisible = elementTop < windowHeight * 0.8 && elementBottom > 0;

        if (isVisible && !this.visibleSections.includes(index)) {
          this.visibleSections.push(index);
        }
      });
    },
    isVisible(index) {
      return this.visibleSections.includes(index);
    },
  },
};
</script>

<template>
  <div class="max-w-(--breakpoint-xl) mx-auto px-6">
    <div
      v-for="(skillCategory, index) in Object.keys(skills)"
      :key="index"
      class="mb-24 skill-div animate__animated"
      :class="{
        animate__fadeInUp: isVisible(index),
        'opacity-0': !isVisible(index),
      }"
      :style="{
        'animation-delay': isVisible(index) ? index * 150 + 'ms' : '0ms',
      }"
    >
      <div
        class="w-full border-b border-gray-400 dark:border-gray-700 mb-4 pb-4"
      >
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ $t(skillCategory) }}
        </h1>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <a
          :href="`https://www.google.com/search?q=${skill.name}`"
          target="_blank"
          v-for="skill in skills[skillCategory]"
          class="bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center flex-col gap-4 p-6 w-40 h-40 duration-300 shadow hover:shadow-2xl hover:-translate-y-1"
        >
          <img
            class="w-1/2"
            :src="
              skill.name == 'PrimeNg'
                ? skill.icon
                : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${
                    skill.icon.split('-')[0]
                  }/${skill.icon}.svg`
            "
          />
          <h2
            class="text-2xl font-bold text-gray-900 lg:text-xl dark:text-gray-400 text-center"
          >
            {{ skill.name }}
          </h2>
        </a>
      </div>
    </div>
    <div
      class="mb-24 mt-54 skill-div animate__animated text-2xl md:text-4xl font-semibold text-gray-500 dark:text-slate-500 text-center"
      :class="{
        animate__fadeInUp: isVisible(4),
        'opacity-0': !isVisible(4),
      }"
      :style="{
        'animation-delay': isVisible(4) ? 4 * 150 + 'ms' : '0ms',
      }"
    >
      {{ $t("Just to name a few...") }}
    </div>
  </div>
</template>
