<template>
    <div class="pass-container">
        <div class="domin-manage">DoT/DoH设置</div>
        <el-card>
            <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
            >
                <el-form-item label="Dot端口" prop="tp">
                    <el-input v-model="ruleForm.tp" placeholder="输入端口号，默认为853" :disabled="sub" style="width:200px"></el-input>
                    <span class="gray">Dot监听端口，默认为853，设置为0或空，则不启用</span>
                </el-form-item>
                <el-form-item label="Doh端口" prop="hp">
                    <el-input v-model="ruleForm.hp" placeholder="输入端口号，默认为443" :disabled="sub" style="width:200px"></el-input>
                    <span class="gray">Doh监听端口，默认为443，设置为0或空，则不启用（如果现有服务已使用443端口，请修改为其它端口或用nginx转发）</span>
                </el-form-item>
                <el-form-item label="证书上传" prop="cert">
                    <el-upload
                            v-if="ruleForm.cf==''"
                            list-type="text"
                            :limit="2"
                            action=""
                            :http-request="upload"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div v-else>
                        <img :src="ruleForm.cf" alt="" style="width:150px;height:150px;margin-right:10px">
                        <img :src="ruleForm.kf" alt="" style="width:150px;height:150px;margin-right:10px">
                    </div>
                    <span class="gray">上传.crt与.key证书文件，<font color="red">请上传正确的证书，否则会导致启动失败</font></span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if="fc==2" @click="submit" :disabled="sub">提交</el-button>
                </el-form-item>
            </el-form>
            <el-alert
                    title="备注说明"
                    type="success"
                    description="DoT,DoH是一个更加安全的解析方式，对于APP应用，HTTPS能提供更稳定与安全的解析"
            ></el-alert>
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
                    tp: "",
                    hp: "",
                    cf:'',
                    kf:''
                },
                rules: {
                    cert: [{ required: true, message: "请上传证书文件", trigger: "blur" }]
                }
            };
        },
        computed: {},
        watch: {},
        methods: {
            //   实名
            info(){
                this.$request({
                    url: "/sys/doth/view",
                    params: {id:0},
                }).then(res => {
                    if (res.data.rec == 0) {
                        this.ruleForm=res.data.data
                        if (this.ruleForm.hp==0) {
                            this.ruleForm.hp="";
                        }
                        if (this.ruleForm.tp==0) {
                            this.ruleForm.tp="";
                        }
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
                formData.append('tp', this.ruleForm.tp);
                formData.append('hp', this.ruleForm.hp);
                formData.append('cf', this.filelist[0].file);
                formData.append('kf', this.filelist[1].file);
                this.$request({
                    url: "/sys/doth",
                    data: formData,
                    method:'post',
                    headers:{'Content-Type':"multipart/form-data"}
                }).then(res => {
                    if (res.data.rec == 0) {
                        this.$message.success("提交成功");
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
    .gray {
        color: #999;
        margin-left: 20px;
    }
</style>