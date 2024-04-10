<template>
  <div class="page">
    <ContentWrap style="margin-bottom: 20px;">
      <ElRow :gutter="20">
        <ElCol :xl="6" :lg="12" :md="12" :sm="12" :xs="24">
          <ElCard shadow="hover" class="mb-20px">
            <ElSkeleton :loading="false" :rows="2">
              <template #default>
                <div class="production-box-item">
                  <div class="font-size_24"> 当月产能预警</div>
                  <div class="target flex justify-between">
                    <div class="target-name">当月目标产能</div>
                    <CountTo :start-val="0" :end-val="responseData.monthlyTarget" :duration="2600" />
                  </div>
                  <div class="target flex justify-between">
                    <div class="target-name">当月目前实际产能</div>
                    <CountTo :start-val="0" :end-val="responseData.monthlyActual" :duration="2600" />
                  </div>
                  <div class="waring-title" v-if="tip">{{ tip }}</div>
                </div>
              </template>
            </ElSkeleton>
          </ElCard>
        </ElCol>
      </ElRow>
    </ContentWrap>
    <ContentWrap title="产量统计预警">
      <el-table v-loading="loading" :data="responseData.list" height="400">
        <el-table-column prop="time" label="日期"></el-table-column>
        <el-table-column prop="classes" label="班次"></el-table-column>
        <el-table-column prop="groups" label="班组"></el-table-column>
        <el-table-column prop="startTotal" label="始累计数"></el-table-column>
        <el-table-column prop="endTotal" label="终累计数"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="responseData.total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </ContentWrap>
  </div>
</template>
<script setup lang="ts">
import { CountTo } from '@/components/CountTo'
import { ContentWrap } from '@/components/ContentWrap'
import { ElRow, ElCol, ElCard, ElSkeleton } from 'element-plus'
import { reactive, computed, onMounted, ref } from 'vue'
import { getProductionWaringApi } from './api'

const loading = ref(false)
const responseData = reactive({
  monthlyTarget: 0,
  monthlyActual: 0,
  list: [],
  total: 0,
  pagesize: 10,
  pagenum: 1
})
const tip = computed(() => {
  const rate: number = responseData.monthlyActual / responseData.monthlyTarget
  if (rate > 1.2) {
    return '严重超出目标产量'
  }
  if (rate >= 1.1) {
    return '超出目标产量'
  }
  if (rate >= 0.8) {
    return '即将达到目标产量预警'
  }
  return null
})
const handleSizeChange = (val: number) => {
  responseData.pagesize = val
  getResponseData()
}
const handleCurrentChange = (val: number) => {
  responseData.pagenum = val
  getResponseData()
}
const getResponseData = async () => {
  let res = await getProductionWaringApi({
    pagesize: responseData.pagesize,
    pagenum: responseData.pagenum
  })
  if (res.code == 200) {
    const { list, total, waring } = res.data
    responseData.list = list
    responseData.total = total
    responseData.monthlyTarget = waring.monthlyTarget
    responseData.monthlyActual = waring.monthlyActual
  }
}

onMounted(() => {
  getResponseData()
})
</script>
<style lang="less" scoped>
.font-size_24 {
  font-size: 24px;
  font-weight: 500;
}

.target {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  .target-name {
    font-size: 16px;
  }
}

.waring-title {
  margin-top: 10px;
  color: red;
  font-size: 18px;
  font-weight: 500;
}

.el-pagination {
  margin-top: 10px;
}
</style>
