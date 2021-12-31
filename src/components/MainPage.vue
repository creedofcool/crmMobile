<template>
  <van-nav-bar
    title="Title"
    left-text="Back"
    right-text="Button"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <router-view />
  <van-tabbar route v-model="activeTabbar">
    <van-tabbar-item replace to="/customers" icon="user-o" name="customers">customers</van-tabbar-item>
    <van-tabbar-item replace to="/me" icon="setting-o">me</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from "vue";
const activeTabbar = ref("customers");
const onClickLeft = () => {
  console.log("left");
};
const onClickRight = () => {
  console.log("right");
};
</script>
