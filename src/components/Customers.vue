<script setup>
import { ref } from "vue";
import { Toast } from "vant";

defineProps({
  msg: String,
});

const count = ref(0);
const active = ref("customers");
const searchValue = ref("");
const onSearch = (val) => Toast(val);
const onCancel = () => Toast("Cancel");
const icon = ref({
  active: "https://img01.yzcdn.cn/vant/user-active.png",
  inactive: "https://img01.yzcdn.cn/vant/user-inactive.png",
});
</script>

<template>
  <van-search
    v-model="searchValue"
    show-action
    background="#4fc08d"
    placeholder="Placeholder"
    @search="onSearch"
  >
    <template #action>
      <van-button
        plain
        size="small"
        type="primary"
        color="#4fc08d"
        @click="onSearch"
        >search</van-button
      >
    </template>
  </van-search>
  <van-cell center is-link value="13511111111" to='customerDetail'>
    <template #title>
      <van-row type="flex">
        <van-col span="8"><van-image
            round
            width="3rem"
            height="3rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
        /></van-col>
        <van-col span="8"><h2>张三</h2></van-col>
      </van-row>
      <van-tag mark type="primary" style="margin-right: 2px">5岁</van-tag>
      <van-tag mark type="primary" style="margin-right: 2px">男</van-tag>
      <van-tag mark type="primary" style="margin-right: 2px">淘气</van-tag>
    </template>
    <template #label>
        <van-tag type="success" plain style="margin-right: 2px">评估已交付</van-tag>
        <van-tag type="success" style="margin-right: 2px">上海长宁</van-tag>
    </template>
  </van-cell>
  <!-- <van-cell center is-link size="large" value="Content" label="Description">
    <template #title>
<van-image
  round
  width="5rem"
  height="5rem"
  src="https://img01.yzcdn.cn/vant/cat.jpeg"
/>
      <h3 style="margin-top:-1px">Cell title</h3>
    </template>
  </van-cell>
  <van-cell-group>
    <van-cell title="URL" is-link url="https://github.com" />
    <van-cell title="Vue Router" is-link to="index" />
  </van-cell-group>
  <van-card num="2" price="2.00" title="Title" desc="Description" />
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <van-tabbar v-model="active">
    <van-tabbar-item name="customers" icon="friends-o" badge="5"
      >customers</van-tabbar-item
    >
    <van-tabbar-item name="create" icon="add-o"></van-tabbar-item>
    <van-tabbar-item name="me" icon="setting-o">me</van-tabbar-item>
  </van-tabbar> -->
</template>

<style scoped>
a {
  margin-left: 1px;
  color: #42b983;
}
</style>
