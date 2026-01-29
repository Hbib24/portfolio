<template>
  <div
    :class="[
      'flex',
      !asCol ? 'md:justify-start justify-center gap-8' : 'flex-col gap-4',
    ]"
  >
    <a
      href="mailto:habib.bekir@gmail.com"
      class="bg-stone-50 items-center justify-center dark:bg-slate-900 group w-16 h-16 p-4 rounded-2xl hover:w-64 overflow-hidden flex gap-2 duration-150 shadow cursor-pointer border dark:border-none"
    >
      <IconMailFilled
        class="w-8 h-8 text-slate-600 group-hover:text-blue-600"
      />
      <p
        class="group-hover:block text-nowrap hidden dark:text-slate-400 duration-150"
      >
        Habib.bekir@gmail.com
      </p>
    </a>
    <a
      href="https://github.com/hbib24"
      target="_blank"
      rel="noopener noreferrer"
      class="bg-stone-50 items-center justify-center dark:bg-slate-900 group w-16 h-16 p-4 rounded-2xl hover:w-46 overflow-hidden flex gap-2 duration-150 shadow cursor-pointer border dark:border-none"
    >
      <IconBrandGithubFilled
        class="w-8 h-8 text-slate-600 group-hover:text-blue-600"
      />
      <p
        class="group-hover:block text-nowrap hidden dark:text-slate-400 duration-150"
      >
        Github/Hbib24
      </p>
    </a>
    <a
      class="bg-stone-50 items-center justify-center dark:bg-slate-900 group w-16 h-16 p-2 rounded-2xl hover:w-42 overflow-hidden flex gap-2 duration-150 shadow cursor-pointer border dark:border-none"
      href="https://www.linkedin.com/in/hbib-bekir/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconBrandLinkedinFilled
        class="w-8 h-8 text-slate-600 group-hover:text-blue-600"
      />
      <p
        class="group-hover:block text-nowrap hidden dark:text-slate-400 duration-150"
      >
        In/hbib-bekir
      </p>
    </a>
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
  components: {
    IconSend2,
    IconCircleCheckFilled,
    IconBrandGithubFilled,
    IconMailFilled,
    IconBrandLinkedinFilled,
  },
  props: { asCol: { type: Boolean, default: false } },
};
</script>
