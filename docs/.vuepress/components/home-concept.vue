<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
// コンセプト
div.concept {
    display: grid;
    grid-template-columns: 1fr 0.7fr;        
}

</style>

<template>
  <div class="concept">
    <!-- 左ペイン -->
    <div class="concept-text">
      <h2>{{ title }}</h2>
      <div class="concept-content">
          <slot></slot>  
      </div>
    </div>
    <!-- 右ペイン -->
    <div class="concept-image">
        <img alt="concept image" :src="props.image" />
    </div>
  </div>
</template>
