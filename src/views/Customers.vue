<script setup>
import { ref, watch } from "vue";
import { CheckboxGroup, Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import _ from "lodash";

defineProps({
  msg: String,
});
const router = useRouter();
const count = ref(0);
const active = ref("customers");
const searchValue = ref("");
const onSearch = (val) => Toast(val);
const onCancel = () => Toast("Cancel");
const dataListLength = 100;
const groupChecked = ref([]);
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

const route = useRoute();

const option1 = [
  { text: "all client type", value: 0 },
  { text: "客户", value: 1 },
  { text: "线索", value: 2 },
  { text: "联系人", value: 3 },
];
const option2 = [
  { text: "all client status", value: 0 },
  { text: "评估已交付", value: 1 },
  { text: "待跟进", value: 2 },
  { text: "已开课", value: 3 },
  { text: "评估未交付", value: 4 },
  { text: "结课", value: 5 },
  { text: "复购", value: 6 },
  { text: "电话n次未接通", value: 6 },
];

const addNew = ref(false);
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
    return _.uniq(tmp, function (e) {
      return e;
    });
  }
  const seat = Math.floor(Math.random() * len);
  return arr[seat];
};

const onClickRight = () => {
  console.log("add new customers");
};

const showAddNew = () => {
  addNew.value = true;
  console.log("search more");
};
const getRandomNum = (mini, max) => {
  return _.random(mini, max);
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
    avatar: "https://img01.yzcdn.cn/vant/cat.jpeg",
  };
  return tmp;
});
const icon = ref({
  active: "https://img01.yzcdn.cn/vant/user-active.png",
  inactive: "https://img01.yzcdn.cn/vant/user-inactive.png",
});
// "客户", "线索", "联系人"
// "评估已交付",
//   "待跟进",
//   "已开课",
//   "评估未交付",
//   "结课",
//   "复购",
//   "电话n次未接通",

const value1 = ref(0);
const value2 = ref(0);
const getText = (arr, key) => {
  const selected = arr.find((elem) => elem.value === key);
  return selected ? selected.text : "NONE";
};
const gotoDetail = (item) => {
  router.push({ path: "/customerDetail", query: item });
};
const editEnable = ref(false);
const editIcon = ref("records");
const onClickLeft = () => {
  editEnable.value = !editEnable.value;

  editIcon.value = editEnable.value ? "close" : "records";
  if (!editEnable.value) {
    groupChecked.value = {};
  }
  console.log(groupChecked.value);
};
// groupChecked.value
const showRightPopover = ref(false);
const rightActions = ref([
  { text: "add new", icon: "add-o", id: "addNew" },
  {
    text: `dispatch(${Object.values(groupChecked.value).length})`,
    icon: "revoke",
    disabled: !Object.values(groupChecked.value).length,
    id: "dispatch",
  },
  {
    text: `delete(${Object.values(groupChecked.value).length})`,
    icon: "delete-o",
    disabled: !Object.values(groupChecked.value).length,
    id: "delete",
  },
]);
watch(
  () => groupChecked.value,
  () => {
    console.log(Object.values(groupChecked.value));
    rightActions.value = [
      { text: "add new", icon: "add-o", id: "addNew" },
      {
        text: `dispatch(${Object.values(groupChecked.value).length})`,
        icon: "revoke",
        disabled: !Object.values(groupChecked.value).length,
        d: "dispatch",
      },
      {
        text: `delete(${Object.values(groupChecked.value).length})`,
        icon: "delete-o",
        disabled: !Object.values(groupChecked.value).length,
        id: "delete",
      },
    ];
    // console.debug(`- watch route.name changed to ${route.meta.isBack}`);
    // Do something here...

    // Optionally you can set immediate: true config for the watcher to run on init
    //}, { immediate: true });
  }
);
const onRightSelect = (action) => {
  switch (action.id) {
    case "addNew":
      showAddNew();
      break;
    default:
      Toast(action.id);
  }
};
</script>

<template>
  <van-sticky>
    <van-nav-bar :title="route.name" @click-left="onClickLeft">
      <template #right>
        <van-popover
          placement="left-start"
          v-model:show="showRightPopover"
          :actions="rightActions"
          @select="onRightSelect"
        >
          <template #reference>
            <van-icon name="add" size="30" color="#4fc08d"></van-icon>
          </template>
        </van-popover>
        <!-- <van-icon
          name="add"
          size="30"
          color="#4fc08d"
          @click="showAddNew"
        ></van-icon> -->
      </template>
      <template #left>
        <van-icon :name="editIcon" size="2rem" color="#4fc08d" />
      </template>
    </van-nav-bar>
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
      <!-- <template #left>
        <van-icon
          name="ellipsis" 
          size="25"
          color="#ffffff"
          @click="showSearchMore"
          style="margin: 15;"
        />
      </template> -->
    </van-search>

    <van-dropdown-menu>
      <van-dropdown-item
        v-model="value1"
        :title="getText(option1, value1)"
        :options="option1"
      />
      <van-dropdown-item
        v-model="value2"
        :title="getText(option2, value2)"
        :options="option2"
      />
    </van-dropdown-menu>
  </van-sticky>
  <van-swipe-cell v-for="item in dataList" :key="item.profile">
    <template #left>
      <van-row>
        <van-button square type="danger" size="small" text="Delete" />
      </van-row>
      <van-row>
        <van-button square type="primary" size="small" text="dispatch" />
      </van-row>
      <van-row>
        <van-button square type="info" size="small" text="add Note" />
      </van-row>
    </template>
    <!-- <template #right>
      <van-button square type="danger" text="Delete" />
    </template> -->
    <van-cell center border>
      <!-- <van-cell center> -->
      <template #title>
        <van-row type="flex">
          <van-col span="4" v-if="editEnable">
            <van-checkbox-group v-model="groupChecked" direction="horizontal">
              <van-checkbox :name="item.profile" shape="square"></van-checkbox>
            </van-checkbox-group>
          </van-col>
          <van-col span="8"
            ><van-image round width="3rem" height="3rem" :src="item.avatar"
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
          <div @click="gotoDetail(item)">
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
    v-model:show="addNew"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '90%' }"
  />
  <!-- <van-sticky :offset-bottom="50" position="bottom">
  <div style="float:right;margin:10px">
  <van-button type="primary" icon="plus" round ></van-button>
</div>
</van-sticky> -->
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
