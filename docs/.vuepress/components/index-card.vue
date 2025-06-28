<script setup lang="ts">
import { defineProps } from 'vue';
import markdownIt from 'markdown-it';
import { useRouter } from 'vue-router';

const md =  new markdownIt();
const router = useRouter?.();

const props = defineProps({
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

function goToLink() {
    if (props.link) {
        if (router) {
            router.push(props.link);
        } else {
            window.location.href = props.link;
        }
    }
}
</script>

<style lang="scss" scoped>
$corner-radius: 0.5rem;

$labelTextColor: var(--vp-c-white);
$labelBackgroundColor: var(--vp-c-accent);
$contentBackgroundColor: var( --vp-c-bg-alt);
$cardBorderColor: var(--vp-c-accent);
$borderWidth: 2px;

.index-card {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    border-style: solid;
    border-width: $borderWidth;
    border-radius: $corner-radius;
    border-color: $cardBorderColor;

    background-color: $contentBackgroundColor;
    box-shadow:none;
    
    &:hover {
        background-color: var(--vp-c-bg-elv);
        box-shadow:5px 5px 10px var(--vp-c-shadow);
    }

    
    .index-card__label {
        display: flex;
        align-items: center;
        
        margin-top: -$borderWidth;
        margin-left: -$borderWidth;
        margin-right: -$borderWidth;
        padding:  0.5rem 1rem;

        font-size: 1.5rem;

        border-top-left-radius: $corner-radius;
        border-top-right-radius: $corner-radius;

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
    <div class="index-card"
         @click="goToLink"
         tabindex="0"
         role="link"
         @keydown.enter="goToLink"
    >
        <!-- label -->
        <div class="index-card__label">
            <i class="fa-solid" :class="icon"></i>
            <span class="index-card__label_text">{{ label }}</span>
        </div>
        <!-- body -->
        <div class="index-card__content">
            <div class="index-card__content-content">
                <div v-html="md.render(description)"></div>
            </div>
        </div>
        <!-- link -->
        <div class="index-card__link">
            <a :href="link" @click.stop>
                see more
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
</template>