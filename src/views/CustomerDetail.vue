<template>
  <van-nav-bar :title="route.name" @click-left="$router.go(-1)">
    <template #left v-if="route.meta.isBack">
      <van-icon name="arrow-left" size="30" />
    </template>
  </van-nav-bar>
  <van-tabs v-model:active="activeTab" scrollspy sticky>
    <van-tab title="基本信息" name="basicInfo">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="Username"
            label="姓名"
            placeholder="Username"
            :rules="[{ required: true, message: 'required' }]"
          />
          <van-field
            v-model="mobile"
            name="mobile"
            label="手机"
            placeholder="mobile"
            :rules="[{ required: true, message: 'required' }]"
          />
          <van-field
            v-model="gender"
            is-link
            readonly
            name="genderPicker"
            label="性别"
            placeholder="gender"
            @click="genderPicker = true"
          />
          <van-popup v-model:show="genderPicker" position="bottom">
            <van-picker
              :columns="genderColumns"
              @confirm="onGenderConfirm"
              @cancel="genderPicker = false"
            />
          </van-popup>
          <van-field name="age" label="年纪">
            <template #input>
              <van-stepper v-model="age" />
            </template>
          </van-field>
          <van-field name="avatar" label="头像">
            <template #input>
              <van-uploader v-model="avatar" />
            </template>
          </van-field>
          <van-field
            v-model="status"
            is-link
            readonly
            name="statusPicker"
            label="客户状态"
            placeholder="status"
            @click="statusPicker = true"
          />
          <van-popup v-model:show="statusPicker" position="bottom">
            <van-picker
              :columns="statusColumns"
              @confirm="onStatusConfirm"
              @cancel="statusPicker = false"
            />
          </van-popup>
          <van-field
            v-model="center"
            is-link
            readonly
            name="centerPicker"
            label="所在中心"
            placeholder="center"
            @click="centerPicker = true"
          />
          <van-popup v-model:show="centerPicker" position="bottom">
            <van-picker
              :columns="centerColumns"
              @confirm="onCenterConfirm"
              @cancel="centerPicker = false"
            />
          </van-popup>
          <van-field label="所属池" v-model="dept" readonly />
          <!-- <van-field
            v-model="dept"
            is-link
            readonly
            name="deptPicker"
            label="所属池"
            placeholder="center"
            @click="deptPicker = true"
          />
          <van-popup v-model:show="deptPicker" position="bottom">
            <van-picker
              :columns="deptColumns"
              @confirm="onDeptConfirm"
              @cancel="deptPicker = false"
            />
          </van-popup> -->
          <van-field label="所属人" v-model="belongtoWho" readonly />
          <van-field label="创建信息" v-model="channelInfo" readonly />
          <van-field label="客源方式" v-model="firstContactMethod" readonly />
          <van-field
            v-model="noteMsg"
            rows="3"
            autosize
            label="备注"
            type="textarea"
            placeholder="请输入备注"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            Submit
          </van-button>
        </div>
      </van-form>
    </van-tab>
    <van-tab title="跟进信息" name="history">
      <div style="margin: 16px; float: right">
        <van-popup
          v-model:show="addMore"
          closeable
          close-icon-position="top-right"
          position="bottom"
          :style="{ height: '90%' }"
        >
          <template #default>
            <div style="margin-top: 5rem">
              <van-form @submit="onSubmit">
                <van-cell-group inset>
                  <van-field
                    v-model="result"
                    is-link
                    readonly
                    name="actionPicker"
                    label="选择类型"
                    placeholder="type"
                    @click="showPicker = true"
                  />
                  <van-popup v-model:show="showPicker" position="bottom">
                    <van-picker
                      :columns="columns"
                      @confirm="onConfirm"
                      @cancel="showPicker = false"
                    />
                  </van-popup>
                  <van-field
                    v-model="actionMessage"
                    type="textarea"
                    placeholder="请输入留言"
                    rows="10"
                    autosize
                  />
                </van-cell-group>
                <div style="margin: 16px">
                  <van-button round block type="primary" native-type="submit">
                    Submit
                  </van-button>
                </div>
              </van-form>
            </div>
          </template>
        </van-popup>
        <!-- <van-popover
          placement="left" 
          v-model:show="showPopover"
          theme="dark"
          :actions="actions"
          style="margin: 5px"
        >
          <template #reference> -->
        <van-sticky :offset-top="50" style="margin: 1rem">
          <van-button
            type="primary"
            icon="plus"
            hairline
            @click="addMore = true"
          ></van-button>
        </van-sticky>
        <!-- </template>
        </van-popover> -->
      </div>
      <van-steps
        direction="vertical"
        :active="0"
        v-for="history in clientHistory"
        :key="history.id"
      >
        <van-step>
          <p>{{ history.timestamp }}</p>
          <h3>{{ history.type }}</h3>
        </van-step>
      </van-steps>
    </van-tab>
  </van-tabs>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import _ from "lodash";
import { getRandomDate } from "../utils";

const route = useRoute();
const showPopover = ref(false);
const actions = [
  { text: "Option 1" },
  { text: "Option 2" },
  { text: "Option 3" },
];
console.log(route.query);
const customerDetail = route.query;
const username = ref(customerDetail.name);
const avatar = ref([{ url: customerDetail.avatar }]);
const age = ref(customerDetail.age);
const mobile = ref(customerDetail.mobile);
const gender = ref(customerDetail.gender);
const center = ref(customerDetail.serviceCenter);
const dept = ref(customerDetail.belongtoDept);
const belongtoWho = ref(customerDetail.belongtoWho);
const channelInfo = ref(
  `${customerDetail.createdBy}@${customerDetail.createdAt} <${customerDetail.leadsChannel}>`
);
const firstContactMethod = ref(customerDetail.firstContactMethod);

const onSubmit = () => {};
const addMore = ref(false);
const actionMessage = ref("");
const activeStep = ref(0);
const activeTab = ref(0);
const noteMsg = ref("");

// const createRandomDate = () => {
//   const year = _.random(2005, 2021);
//   const month = _.random(1, 12);
//   const date =
// }

// console.log();

const result = ref("");
const showPicker = ref(false);
const columns = ["changeStatus", "phone", "evaluation"];
const genderColumns = ["boy", "girl"];
const status = ref(customerDetail.status);
const statusColumns = [
  "评估已交付",
  "待跟进",
  "已开课",
  "评估未交付",
  "结课",
  "复购",
  "电话n次未接通",
];
const centerColumns = [
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
const deptColumns = ["总部", "佛山", "psy事业部"];
const whoColumns = ["客服1", "佛山客服2", "总部客服3", "区域客服1"];
const statusPicker = ref(false);
const genderPicker = ref(false);
const centerPicker = ref(false);
const deptPicker = ref(false);
const onConfirm = (value) => {
  result.value = value;
  showPicker.value = false;
};
const dataListLength = 100;
const actionTypes = ["phone", "changeStatus", "evaluation"];
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
const tmpHistory = [...Array(dataListLength).keys()].map((elem) => {
  return {
    id: `history${elem}`,
    type: getValRandom(actionTypes),
    timestamp: getRandomDate(),
  };
});
// [
//   {
//     id: "history01",
//     type: "phone",
//     timestamp: getRandomDate(),
//   },
//   { id: "history02", type: "changeStatus", timestamp: getRandomDate() },

//   { id: "history03", type: "evaluation", timestamp: getRandomDate() },
// ];

// const tmpHistory = _.orderBy(
//   [

//   ],
//   ["timestamp"],
//   ["desc"]
// );
const clientHistory = ref(_.orderBy(tmpHistory, ["timestamp"], ["desc"]));

const onGenderConfirm = (val) => {
  gender.value = val;
  genderPicker.value = false;
};
const onStatusConfirm = (val) => {
  status.value = val;
  statusPicker.value = false;
};
const onCenterConfirm = (val) => {
  center.value = val;
  centerPicker.value = false;
};
const onDeptConfirm = (val) => {
  dept.value = val;
  deptPicker.value = false;
};
</script>
