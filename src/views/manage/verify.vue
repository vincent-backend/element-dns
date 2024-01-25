<template>
  <div class="pass-container">
    <div class="domin-manage">实名认证</div>
    <el-card>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="xm">
          <el-input v-model="ruleForm.xm" placeholder="请输入真实姓名" :disabled="sub"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="sfz">
          <el-input v-model="ruleForm.sfz" placeholder="请输入身份证号" :disabled="sub"></el-input>
        </el-form-item>
        <el-form-item label="身份证上传" prop="sfz1">
          <el-upload
          v-if="ruleForm.pic1==''"
          list-type="picture-card"
          :limit="2"
          action=""
          :http-request="upload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div v-else>
              <img :src="ruleForm.pic1" alt="" style="width:150px;height:150px;margin-right:10px">
              <img :src="ruleForm.pic2" alt="" style="width:150px;height:150px">
          </div>
        </el-form-item>
                <el-form-item>
          <el-button type="primary" v-if="fc==2" @click="submit" :disabled="sub">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
        sub:false,
        fc:0,
        filelist:[],
      ruleForm: {
        xm: "",
        sfz: "",
        pic1:'',
        pic2:''
      },
      rules: {
        xm: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sfz: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
         sfz1: [{ required: true, message: "请上传身份证", trigger: "blur" }]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    //   实名
    info(){
        this.$request({
            url: "/user/verify/view",
            params: {id:0},
          }).then(res => {
            if (res.data.rec == 0) {
                this.ruleForm=res.data.data
                this.sub=true
            } else {
            }
          });
    },
      upload(file){
          this.filelist.push(file)
          this.fc++;
      },
    // 提交数据
    submit(){
         var formData = new FormData;
         formData.append('xm', this.ruleForm.xm);
         formData.append('sfz', this.ruleForm.sfz);
         formData.append('pic1', this.filelist[0].file);
         formData.append('pic2', this.filelist[1].file);
        if(this.$router.history.current.query.sfz==1){
          var url='/user/sfz/verify'
        }else{
          var url='/user/verify'
        }
         this.$request({
           url,
            data: formData,
            method:'post',
            headers:{'Content-Type':"multipart/form-data"}
          }).then(res => {
            if (res.data.rec == 0) {
                this.$message.success("提交成功");
                                this.sub=true
            } else {
                this.$message.error(res.data.msg);
            }
          });
    }
  },
  created() {
      this.info()
  },
  mounted() {}
};
</script>
<style lang='less'>
.pass-container {
  .domin-manage {
    line-height: 60px;
    font-weight: bold;
  }
  .el-input {
    width: 50%;
    .el-input__inner {
      line-height: 45px;
      height: 45px;
    }
    .el-form-item__label {
      line-height: 45px;
    }
  }
}
</style>