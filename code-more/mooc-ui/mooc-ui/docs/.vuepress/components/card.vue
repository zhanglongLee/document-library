<template>
    <div class="m-card" :style="width ? {width: width + 'px'} : {}">
        <img  class="m-card-img" :style="imgHeight ? {height: imgHeight + 'px'} : {}" :src="imgSrc" alt="img" />
        <div class="m-card-summary" v-if="summary">{{summary}}</div>
        <div class="m-card-summary" v-else>
          <slot></slot>
        </div>
        <slot name="footer"></slot>
    </div>
</template>

<script>
export default {
    name: "m-card",
    data() {
        return {};
    },
    props: {
        width: {
            // 卡片宽度
            type: Number,
            default: 0,
        },
        imgSrc: {
            // 卡片图片资源地址
            type: String,
            default: "",
        },
        imgHeight: {
            // 卡片图片高度
            type: Number,
            default: 0,
        },
        summary: {
            // 卡片的概要
            type: String,
            default: "",
        },
    },
};
</script>

<style scoped>

</style>
