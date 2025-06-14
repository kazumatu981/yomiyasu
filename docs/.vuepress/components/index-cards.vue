<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
    /**
     * Array of card objects to display
     * @type {Array<{ icon: string, label: string, description: string, link: string }>}
     */
    cards: {
        type: Array as () => Array<{
            icon: string,
            label: string,
            description: string,
            link: string
        }>,
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
    // display: flex;
    // flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    justify-content: center;
}
</style>

<template>
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