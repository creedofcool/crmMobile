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
const dataListLength = 100;
const lastNames = [
  "张",
  "王",
  "李",
  "赵",
  "陈",
  "谢",
  "孙",
  "朱",
  "黄",
  "欧阳",
];

const searchMore = ref(false);
const genders = ["boy", "girl"];
const getGenderColor = (gender) => {
  return gender === genders[0] ? "#01497c" : "#ff8c61";
};
const childrenAttr = ["淘气", "安坐", "安静", "能聊", "喜欢甜食", "不爱讲话"];
const childrenStatus = [
  "评估已交付",
  "待跟进",
  "已开课",
  "评估未交付",
  "结课",
  "复购",
  "电话n次未接通",
];
const centers = [
  "上海长宁",
  "深圳宝安",
  "深圳福田",
  "上海浦东",
  "北京海淀",
  "重庆",
  "成都",
  "南昌",
  "西安",
];
const belongtoDepts = ["总部", "佛山", "psy事业部"];
const belongtoWho = ["客服1", "佛山客服2", "总部客服3", "区域客服1"];
const leadsTypes = ["客户", "线索", "联系人"];
const getValRandom = (arr, n = 1) => {
  const len = arr.length;
  if (n > 1) {
    const tmp = [...Array(n).keys()].map((elem) => {
      const tmpSeat = Math.floor(Math.random() * len);
      return arr[tmpSeat];
    });
    return tmp;
  }
  const seat = Math.floor(Math.random() * len);
  return arr[seat];
};

const showSearchMore = () => {
  searchMore.value = true;
  console.log("search more");
};
const getRandomNum = (mini, max) => {
  return Math.floor(Math.random() * (max - mini)) + mini;
};
const dataList = [...Array(dataListLength).keys()].map((elem) => {
  const tmp = {
    profile: `id${elem}`,
    name: `${getValRandom(lastNames)}${elem}`,
    age: getRandomNum(1, 12),
    gender: `${getValRandom(genders)}`,
    tags: getValRandom(childrenAttr, getRandomNum(2, childrenAttr.length)),
    mobile: getRandomNum(13000000000, 19999999999),
    status: getValRandom(childrenStatus),
    serviceCenter: getValRandom(centers),
    belongtoWho: getValRandom(belongtoWho),
    belongtoDept: getValRandom(belongtoDepts),
    leadsType: getValRandom(leadsTypes),
  };
  return tmp;
});
const icon = ref({
  active: "https://img01.yzcdn.cn/vant/user-active.png",
  inactive: "https://img01.yzcdn.cn/vant/user-inactive.png",
});
</script>

<template>
  <van-sticky>
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
      <template #left>
        <van-icon name="filter-o" size="30" color="#ffffff"   @click="showSearchMore" />
      </template>
    </van-search>
  </van-sticky>
  <van-swipe-cell v-for="item in dataList" :key="item.profile">
    <template #left>
      <van-row>
        <van-button square type="primary" text="dispatch" />
      </van-row>
      <van-row>
        <van-button square type="danger" text="Delete" />
      </van-row>
    </template>
    <!-- <template #right>
      <van-button square type="danger" text="Delete" />
    </template> -->
    <van-cell center to="customerDetail">
      <template #title>
        <van-row type="flex">
          <van-col span="8"
            ><van-image
              round
              width="3rem"
              height="3rem"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
          /></van-col>
          <van-col span="8">
            <h2>{{ item.name }}</h2>
          </van-col>
        </van-row>
        <van-tag mark color="#7232dd" plain style="margin-right: 2px"
          >{{ item.age }}岁</van-tag
        >
        <van-tag
          mark
          :color="getGenderColor(item.gender)"
          style="margin-right: 2px"
          >{{ item.gender }}</van-tag
        >
        <van-tag
          round
          type="primary"
          style="margin-right: 2px"
          v-for="attr in item.tags"
          :key="attr"
          >{{ attr }}</van-tag
        >
      </template>
      <template #label>
        <van-row>
          <van-tag
            type="success"
            size="large"
            plain
            mark
            style="margin-right: 2px"
            >{{ item.status }}</van-tag
          >
        </van-row>
        <van-row>
          <van-tag type="success" style="margin-right: 2px">{{
            item.serviceCenter
          }}</van-tag>
          <van-tag type="success" style="margin-right: 2px">{{
            item.belongtoDept
          }}</van-tag>
          <van-tag type="success" style="margin-right: 2px">{{
            item.belongtoWho
          }}</van-tag>
          <van-tag
            text-color="#0b2027"
            color="#ffffff"
            style="margin-right: 2px"
            >{{ item.leadsType }}</van-tag
          >
        </van-row>
      </template>
      <template #extra>
        <van-row>
          <div>
            <h4>{{ item.mobile }}</h4>
          </div>
        </van-row>
      </template>
      <template #right-icon>
        <van-icon name="phone-o" />
      </template>
    </van-cell>
  </van-swipe-cell>

<van-popup
  v-model:show="searchMore"
  closeable
  close-icon-position="top-left"
  position="bottom"
  :style="{ height: '80%' }"
/>
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
