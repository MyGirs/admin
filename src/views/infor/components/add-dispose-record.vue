<template>
  <ContentWrap :title="title">
    <el-form :model="form" label-width="100">
      <el-col :xl="8" :lg="10" :md="12" :sm="12" :xs="24" v-for="(item, index) in formItemList" :key="index">
        <el-form-item :label="item.label">
          <el-input v-if="item.type == 'input'" :readonly="isDetail" :placeholder="item.tip || '请输入'"
            v-model="form[item.value]"></el-input>
          <el-input type="textarea" v-if="item.type == 'textarea'" :readonly="isDetail" v-model="form[item.value]"
            :placeholder="item.tip || '请输入'"></el-input>

          <el-date-picker style="width: 100%" v-if="item.type == 'time'" :readonly="isDetail" v-model="form[item.value]"
            type="date" :placeholder="item.tip || '请选择时间'" value-format="YYYY-MM-DD" />

          <el-select v-if="item.type == 'select'" v-model="form[item.value]" :placeholder="item.tip || '请选择'"
            style="width: 100%">
            <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <div class="page-button">
        <el-button type="primary" @click="handleAdd" v-if="!isDetail">确定</el-button>
        <el-button @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </ContentWrap>
</template>
<script setup>
import { ElButton, ElForm, ElInput, ElFormItem, ElDatePicker, ElMessage } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addDispose, getOrgList } from '../apis'

const router = useRouter()
const route = useRoute()
let isDetail = ref(false)
let title = ref("新增处置记录")

let form = ref({})
const formItemList = ref([
  {
    type: 'input',
    value: 'type',
    label: '主题或类型',
    tip: '请输入主题或类型'
  },
  {
    type: 'select',
    value: 'dep',
    label: '部门',
    tip: '请选择部门',
    options: []
  },
  {
    type: 'time',
    value: 'time',
    label: '时间',
    tip: '请选时间'
  },
  {
    type: 'input',
    value: 'address',
    label: '地址',
    tip: '请输入地址'
  },
  {
    type: 'input',
    value: 'party',
    label: '当事人',
    tip: '请输入当事人'
  },
  {
    type: 'textarea',
    value: 'recordInfor',
    label: '记录或详情',
    tip: '请输入记录或详情'
  },
  {
    type: 'textarea',
    value: 'opinion',
    label: '处理意见',
    tip: '请输入处理意见'
  },
  {
    type: 'textarea',
    value: 'mark',
    label: '备注',
    tip: '请输入备注'
  }
])

onBeforeMount(() => {
  let query = route.query
  if (query.type == 'detail') {
    isDetail.value = true
    title.value = '处置记录详情'
    let params = JSON.parse(query.row)
    for (var key in params) {
      form.value[key] = params[key]
    }
  }
  getResponseData()
})

const getResponseData = async () => {
  let res = await getOrgList()

  if (res.code == 200) {
    formItemList.value.map(item => {
      if (item.value == 'dep') {
        item.options = res.data.map(ite => {
          return {
            value: ite.name,
            label: ite.name
          }
        })
      }
      return item
    })
  } else {
    formItemList.value.map(item => {
      if (item.value == 'dep') {
        item.options = []
      }
      return item
    })
  }
}

const handleAdd = async () => {
  let res = await addDispose(form.value)
  if (res.code == 200) {
    ElMessage.success('新增成功')
    handleBack()
  }
}

const handleBack = () => {
  router.push({
    path: '/infor/dispose-record'
  })
}
</script>

<style lang="less" scoped>
.el-form {
  display: flex;
  flex-wrap: wrap;
}

.page-button {
  width: 100%;
  text-align: center;

  .el-button {
    width: 100px;
  }
}
</style>
