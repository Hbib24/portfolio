<script setup>
import { ref, onMounted } from "vue";
import NumberFlow from "@number-flow/vue";
import { IconInfinity } from "@tabler/icons-vue";

const items = [
  { title: "projects completed", value: ref(0), finalValue: 20 },
  {
    title: "years experience",
    value: ref(0),
    finalValue: new Date().getFullYear() - 2021,
  },
  { title: "technologies used", value: ref(0), finalValue: 30 },
];

const counterContainer = ref(null);
const hasAnimated = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true;
          items[0].value.value = items[0].finalValue;
          items[1].value.value = items[1].finalValue;
          items[2].value.value = items[2].finalValue;
        }
      });
    },
    { threshold: 0.5 },
  );

  if (counterContainer.value) {
    observer.observe(counterContainer.value);
  }
});
</script>
<template>
  <div
    ref="counterContainer"
    class="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-y-6"
  >
    <div class="flex justify-center" v-for="(item, i) in items" :key="i">
      <div class="flex flex-col gap-4">
        <NumberFlow
          :value="item.value.value"
          suffix="+"
          :spinTiming="{
            duration: 3000,
            easing: 'ease-out',
          }"
          class="text-6xl text-center sm:text-start emphasize-text font-extrabold text-slate-900 dark:text-gray-200"
        />
        <p
          class="uppercase tracking-wider text-lg font-medium text-slate-700 dark:text-gray-400"
        >
          {{ $t(item.title) }}
        </p>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="flex flex-col gap-4">
        <div class="h-22.5">
          <IconInfinity
            class="w-20 h-20 mx-auto sm:mx-0 text-shadow-lg text-shadow-cyan-600/50 emphasize-text font-extrabold text-slate-900 dark:text-gray-200"
          />
        </div>
        <p
          class="uppercase tracking-wider text-lg font-medium text-slate-700 dark:text-gray-400"
        >
          {{ $t("Coffees Consumed") }}
        </p>
      </div>
    </div>
  </div>
</template>
