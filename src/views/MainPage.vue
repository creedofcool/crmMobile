<template>
  <van-nav-bar
    :title="route.name"
    @click-left="$router.go(-1)"
    @click-right="onClickRight"
  >
    <template #left v-if="route.meta.isBack">
      <van-icon name="arrow-left" size="30" />
    </template>
  </van-nav-bar>
  <router-view />
  <van-tabbar route v-model="activeTabbar" v-if="!route.meta.isBack">
    <van-tabbar-item replace to="/customers" icon="friends-o" name="customers"
      >customers</van-tabbar-item
    >
    <van-tabbar-item replace to="/me" icon="setting-o">me</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

// console.log(`current route name on component setup init: ${route.name}`);
// onMounted(() => {
//   console.log("this is main page");
// });
// onUpdated(() => {
//   console.log("updated!");
//   console.log(`current route name on component setup init: ${route.name}`);
// });
// watch(
//   () => route.name,
//   () => {
//     console.debug(`- watch route.name changed to ${route.meta.isBack}`);
//     // Do something here...

//     // Optionally you can set immediate: true config for the watcher to run on init
//     //}, { immediate: true });
//   }
// );
const activeTabbar = ref("customers");
const vm = this;
function onClickLeft() {
  $router.go(-1);
}
const onClickRight = () => {
  console.log("right");
};
</script>
