<template>
  <van-nav-bar :title="route.name" @click-right="onClickRight"> </van-nav-bar>
  <div>me</div>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const onClickRight = () => {
  console.log("right btn clicked");
};
</script>
