<script lang="ts" setup>
defineProps<{ title: string, desc?: string }>()
</script>

<template>
  <div class="my-2.5rem">
    <div class="w-content">
      <h1 class="!mb-0 !text-3xl">
        {{ title }}
      </h1>
      <p v-if="desc" class="mt-16px !mb-0 text-base">
        {{ desc }}
      </p>
    </div>
  </div>
</template>
