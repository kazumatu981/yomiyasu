<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    userName: {
        type: String,
        required: true
    }
})
</script>


<style lang="scss" scoped>

// チャットの背景色
$messageBackgroundColor: var( --vp-c-bg-alt);
// チャットのボーダー色
$messageBorderColor: var(--accent5-color);

// チャットテキストの角の半径
$corner-radius: 0.5rem;

// 吹き出し三角のサイズ
$triangle-size: 8px;

@mixin left-triangle(
    $size,
    $color,
    $offsetFromLeft: 0px,
    $verticalOffset: 0px
) {
    content: "";
    position: absolute;
    border: $size solid transparent;
    border-right: $size solid $color;
    top: 50%;
    left: -$size * 2 + $offsetFromLeft;
    margin-top: $verticalOffset;
}
.chat {
    display: flex;
    flex-direction: row;
    margin: 1rem;

    .chat_user {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 1rem;
        .chat_user_icon {
            color: var(--accent1-color);
            font-size: 2rem;
        }
        .chat_user_name {
            font-size: 0.5rem;
            font-weight: bold;
        }       
    }

    .chat_message {
        font-size: 1.2rem;
        border: solid 1px $messageBorderColor;
        border-radius: $corner-radius;
        
        position: relative;
        display: inline-block;
        padding: 7px 10px;
        color: #555;
        background:$messageBackgroundColor;
        box-sizing: border-box;

        &::before {
            @include left-triangle($triangle-size, $messageBackgroundColor, 1px, -1.25rem);
            z-index: 2;
        }
        &::after {
            @include left-triangle($triangle-size, $messageBorderColor, 0px, -1.25rem);
            z-index: 1;
        }
    }

}

</style>

<template>
    <div class="chat">
        <div class="chat_user">
            <div class="chat_user_icon">
                <i class="fa-solid fa-user-tie"></i>
            </div>
            <div class="chat_user_name">
                {{ userName }}
            </div>
        </div>
        <div class="chat_message">
            <slot></slot>
        </div>
    </div>
</template>