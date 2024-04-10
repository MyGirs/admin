<template>
  <div class="search-warp">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <ContentWrap title="值班记录表">
    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="columns"
      :data="dataList"
      :loading="loading"
      :pagination="
        canShowPagination
          ? {
              total: total
            }
          : undefined
      "
    />
  </ContentWrap>
  <AddRecord v-model="addDialog" />
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { Table, TableColumn } from '@/components/Table'
import AddRecord from './components/add-record.vue'
import { ref } from 'vue'

const loading = ref(false)
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(0)
const addDialog = ref(false)

const columns: TableColumn[] = [
  {
    field: 'time',
    label: '时间'
  },
  {
    field: 'weather',
    label: '天气'
  },
  {
    field: 'user',
    label: '值班领导'
  },
  {
    field: 'route',
    label: '路线'
  },
  {
    field: 'content',
    label: '内容'
  },
  {
    field: 'handlingMeasures',
    label: '处理措施'
  }
]
let dataList = ref([])
const canShowPagination = ref(true)

const handleAdd = () => {
  addDialog.value = true
}
</script>
<style lang="less" scoped>
.search-warp {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
