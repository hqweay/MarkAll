<template>
  <div class="container">
    <div class="card">
      <div class="edit">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4}"
          placeholder="请输入内容"
          v-model="templateString"
          clearable
        ></el-input>
        <button class="btn" @click="addTemplateNow(templateString)">添加</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { checkJson } from '@/utils/checkJson'
import { addTemplate } from '@/../shared/db/mapper/templateMapper'
export default {
  data () {
    return {
      template: {
        name: '书',
        style: {
          书名: '爱的供养',
          作者: 'Hqweay',
          出版社: 'SWPU',
          状态: '未读',
          标记时间: '2019-02-10',
          想法: '不错的一本书哟4'
        }
      },
      templateString: ''
    }
  },
  created: function () {
    this.templateString = checkJson(JSON.stringify(this.template))
  },
  methods: {
    notify (message) {
      const h = this.$createElement
      this.$notify({
        title: '提示',
        message: h('i', { style: 'color: teal' }, message)
      })
    },
    addTemplateNow (templateString) {
      if (templateString == '') {
        this.notify('不能为空啊...')
        return false
      }
      let template = []
      try {
        template = JSON.parse(templateString)
      } catch (e) {
        console.log(e)
        this.notify('保证 json 格式哦亲...')
        return false
      }

      if (addTemplate(template) == false) {
        console.log(template)
        this.notify('添加失败,可能重复了...')
        return false
      }
      // 成功后跳转
      this.$router.push('/template')
      this.notify('添加成功')
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  background-color: #75d8af;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  min-height: 700px;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  .edit {
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    .btn {
      margin-top: 40px;
    }
  }
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  padding: 2px 16px;
}
</style>
