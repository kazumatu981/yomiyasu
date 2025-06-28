<script setup lang="ts">
import { defineProps } from 'vue';
import markdownIt from 'markdown-it';

const md =  new markdownIt();

defineProps({
    /**
     * Icon to display in the label
     * @type {string}
     */
    icon: {
        type: String,
        required: true
    },
    /**
     * Label text to display in the card
     * @type {string}
     */
    label: {
        type: String,
        required: true
    },
    /**
     * Description text to display in the card
     * @type {string}
     */
    description: {
        type: String,
        required: true,
    },
    /**
     * Link to navigate to when clicking "see more"
     * @type {string}
     */
    link: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
$corner-radius: 0.5rem;

$labelTextColor: var(--vp-c-white);
$labelBackgroundColor: var(--vp-c-accent);
$contentBackgroundColor: var( --vp-c-bg-alt);

.index-card {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    border-style: solid;
    border-width: 1.5px;
    border-radius: $corner-radius;
    background-color: $contentBackgroundColor;
    box-shadow:none;
    
    &:hover {
        background-color: var(--vp-c-bg-elv);
        box-shadow:5px 5px 10px #b2b2b2;
    }

    
    .index-card__label {
        display: flex;
        align-items: center;
        font-size: 1.5rem;

        border-top-left-radius: $corner-radius;
        border-top-right-radius: $corner-radius;
        padding:  0.5rem 1rem;

        background-color: $labelBackgroundColor;
        color: $labelTextColor;
        i {
            padding-right: 0.5rem;
        }
    }
    
    .index-card__content {
        display: flex;
        flex-direction: column;
        align-items: stretch;

        border-bottom-left-radius: $corner-radius;
        border-bottom-right-radius: $corner-radius;
        padding:  0.5rem 1rem;

        .index-card__content-content {
            flex: 1;
        }
    }
    .index-card__link {
        display: flex;
        margin-top: auto;
        padding-left: 0.5rem;
        padding-bottom: 0.5rem;
        a {
            color: var(--vp-c-accent);
        }
    }
}


</style>

<template>
    <div class="index-card">
        <!-- label -->
        <div class="index-card__label">
            <i class="fa-solid" :class="icon"></i>
            {{ label }}
        </div>
        <!-- body -->
        <div class="index-card__content">
            <div class="index-card__content-content">
                <div v-html="md.render(description)"></div>
            </div>
        </div>
        <!-- link -->
        <div class="index-card__link">
            <a :href="link">
                see more
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
</template>