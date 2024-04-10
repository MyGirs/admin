<template>
  <div class="page">
    <ContentWrap class="mb-20">
      <el-form class="page-query">
        <el-row>
          <el-col :xl="24" :lg="12" :md="12" :sm="12" :xs="24">
            <el-form-item label="风险/隐患类型">
              <el-select v-model="responseData.type" placeholder="Select" style="width: 240px">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="24" :lg="12" :md="12" :sm="12" :xs="24">
            <div class="page-button">
              <el-button type="primary" @click="getResponseData">查询</el-button>
              <el-button type="success" @click="handleAdd">新增</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ContentWrap>
    <ContentWrap>
      <el-table v-loading="loading" :data="responseData.list" height="400">
        <el-table-column prop="points" label="监测点位"></el-table-column>
        <el-table-column prop="position" label="监测位置"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="status" label="处理状态"></el-table-column>
        <el-table-column prop="deviceNum" label="设备型号"></el-table-column>
        <el-table-column
          prop="deviceModel"
          width="100"
          show-overflow-tooltip
          label="设备编号"
        ></el-table-column>
        <el-table-column prop="versionNum" label="版本编号"></el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="grade" label="等级"></el-table-column>
        <el-table-column prop="head" label="负责人"></el-table-column>
        <el-table-column
          prop="handlingOpinions"
          width="100"
          show-overflow-tooltip
          label="处理意见"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click.prevent="openDialog(row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="sizes,prev, pager, next"
        :total="responseData.total"
        :page-sizes="[10, 20, 30, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </ContentWrap>

    <el-dialog v-model="dialogVisible" title="详情" width="90%" modal-class="riskDialog">
      <el-form label-width="80" class="dialog-form">
        <!-- <el-row > -->
        <el-col
          :xl="8"
          :lg="10"
          :md="12"
          :sm="12"
          :xs="24"
          v-for="(item, index) in formItemList"
          :key="index"
        >
          <el-form-item :label="item.label">
            <el-input
              v-if="item.type == 'input'"
              :placeholder="item.tip || '请输入'"
              v-model="form[item.value]"
            ></el-input>
            <el-input
              type="textarea"
              v-if="item.type == 'textarea'"
              v-model="form[item.value]"
              :placeholder="item.tip || '请输入'"
            ></el-input>

            <el-date-picker
              style="width: 100%"
              v-if="item.type == 'time'"
              v-model="form[item.value]"
              type="dates"
              :placeholder="item.tip || '请选择时间'"
            />
            <el-select
              v-if="item.type == 'select'"
              v-model="form[item.value]"
              :placeholder="item.tip || '请选择'"
              style="width: 100%"
            >
              <el-option
                v-for="item in item.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- </el-row> -->
      </el-form>
      <div class="dialog-button">
        <el-button type="primary" @click="handleAdd">确定</el-button>
        <el-button @click="handleBack">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRiskHazardsApi } from './api'
const loading = ref(false)
const types = [
  {
    name: '风险',
    value: 1
  },
  {
    name: '隐患',
    value: 2
  }
]
const responseData = reactive({
  list: [],
  total: 0,
  pagesize: 10,
  pagenum: 1,
  type: 1
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
  let res = await getRiskHazardsApi({
    pagesize: responseData.pagesize,
    pagenum: responseData.pagenum,
    type: responseData.type
  })
  if (res.code == 200) {
    responseData.list = res.data
    responseData.total = res.total
  } else {
    responseData.list = []
    responseData.total = 0
  }
}
const dialogVisible = ref(false)
const formItemList = [
  {
    type: 'input',
    value: 'points',
    label: '监测点位',
    tip: '请选择风险/隐患监测点位'
  },
  {
    type: 'input',
    value: 'position',
    label: '位置',
    tip: '请选择风险/隐患设备位置'
  },
  {
    type: 'time',
    value: 'time',
    label: '时间'
  },
  {
    type: 'select',
    value: 'type',
    label: '类型',
    tip: '请选择风险/隐患设备类型',
    options: [
      {
        label: '风险',
        value: 1
      },
      {
        label: '隐患',
        value: 2
      }
    ]
  },
  {
    type: 'input',
    value: 'status',
    label: '状态',
    tip: '请选择风险/隐患设备状态'
  },
  {
    type: 'input',
    value: 'deviceNum',
    label: '设备编号',
    tip: '请输入风险/隐患设备型号'
  },
  {
    type: 'input',
    value: 'deviceModel',
    label: '设备型号',
    tip: '请输入风险/隐患设备型号'
  },
  {
    type: 'input',
    value: 'versionNum',
    label: '版本编号',
    tip: '请输入风险/隐患版本编号'
  },
  {
    type: 'textarea',
    value: 'content',
    label: '内容',
    tip: '请输入风险/隐患内容'
  },
  {
    type: 'input',
    value: 'grade',
    label: '等级',
    tip: '请输入风险/隐患等级'
  },
  {
    type: 'input',
    value: 'head',
    label: '负责人',
    tip: '请输入负责人'
  },
  {
    type: 'textarea',
    value: 'handlingOpinions',
    label: '处理意见',
    tip: '请输入处理意见'
  }
]
const form = reactive({
  points: '',
  position: '',
  time: '',
  type: '',
  status: '',
  deviceNum: '',
  deviceModel: '',
  versionNum: '',
  content: '',
  grade: '',
  head: '',
  handlingOpinions: ''
})
const openDialog = (row) => {
  for (var key in row) {
    form[key] = row[key]
  }
  dialogVisible.value = true
}

const Router = useRouter()
const handleAdd = () => {
  Router.push({
    path: '/riskHazards/add'
  })
}
onMounted(getResponseData)
</script>
<style lang="less" scoped>
.mb-20 {
  margin-bottom: 20px;
}
.page-query {
  .el-form-item {
    margin-bottom: 10px;
  }
  .page-button {
    text-align: end;
  }
}
.el-pagination {
  margin-top: 10px;
}
.dialog-form {
  max-height: 500px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
}
.dialog-button {
  text-align: center;
  width: 100%;
}
</style>
