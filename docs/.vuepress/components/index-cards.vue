<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
    /**
     * Title for the index cards component
     * @type {string}
     */
    title: {
        type: String,
        required: false,
        default: 'Table of Contents'
    },
    /**
     * Array of card objects to display
     * @type {string}
     */
    cards: {
        type: String,
        required: true
    }
});

// cardsが文字列の場合はパースする
const parsedCards = computed(() => {
  if (typeof props.cards === 'string') {
    try {
      return JSON.parse(props.cards);
    } catch {
      return [];
    }
  }
  return props.cards;
});
</script>

<style lang="scss" scoped>
.index-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    justify-content: center;
    margin: 1.5rem 0;
}
</style>

<template>
  <!-- TODO スタイルをちゃんとする -->
    <h2>{{ title }}</h2>
    <div class="index-cards">
        <index-card
            v-for="(card, index) in parsedCards"
            :key="index"
            :icon="card.icon"
            :label="card.label"
            :description="card.description"
            :link="card.link">
        </index-card>
    </div>
</template>