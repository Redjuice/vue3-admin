<script setup>
import { ref, reactive } from 'vue';
import LayoutEmpty from '@/layout/LayoutEmpty.vue';
import LayoutList from '@/layout/LayoutList.vue';

const form = reactive({
  keyword: ''
});
const onSubmit = () => {
  console.log('submit!');
};
const activeName = 'first';
const handleClick = (tab, event) => {
  console.log(tab, event);
};
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
];
const currentPage = ref(4);
const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};
</script>

<template>
  <layout-list title="列表" back>
    <template #header>
      <el-button type="primary">新增</el-button>
    </template>
    <template #search>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="form.keyword" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #tabs></template>
    <template #content>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="User" name="first">
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="名称" width="180" />
            <el-table-column prop="address" label="地址" />
            <!-- layout-empty -->
            <template #empty>
              <layout-empty
                empty-type="404"
                empty-text="这里一片荒芜"
              ></layout-empty>
            </template>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      </el-tabs>
    </template>
    <template #footer>
      <el-pagination
        v-model:currentPage="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </template>
  </layout-list>
</template>

<style lang="less" scoped></style>
