<template>
    <div class="pass-container">
        <div class="domin-manage">HttpDNS设置</div>
        <el-card>
            <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="160px"
                    class="demo-ruleForm"
            >
                <el-form-item label="启用HttpDNS" prop="hdis">
                    <el-switch
                            v-model="ruleForm.hdis"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            style="width:160px;margin:0 20px"
                    ></el-switch>
                    <span class="gray">启用HttpDNS功能</span>
                </el-form-item>
                <el-form-item label="使用端口" prop="hdp">
                    <el-input v-model="ruleForm.hdp" style="width:160px;margin:0 20px" autocomplete="off" placeholder="输入自定义端口"></el-input>
                    <span class="gray">使用端口，即监听端口，默认为80，启用HTTPS默认为443，可自定义（需开放防火墙的相应端口访问）</span>
                </el-form-item>
                <el-form-item label="启用HTTPS" prop="hdhis">
                    <el-switch
                            v-model="ruleForm.hdhis"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            style="width:160px;margin:0 20px"
                    ></el-switch>
                    <span class="gray">启用https安全访问</span>
                </el-form-item>
                <el-form-item label="证书上传" prop="cert" v-if="ruleForm.hdhis==true">
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
                    <span class="gray">上传.crt与.key证书文件，<font color="red">如要启用HTTPS访问，请先上传正确的证书</font></span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">提交</el-button>
                </el-form-item>
            </el-form>
            <el-alert
                    title="备注说明"
                    type="success"
                    description="HTTPDNS使用HTTP协议进行域名解析，代替现有基于UDP的DNS协议，域名解析请求直接发送到HTTPDNS服务器，从而绕过运营商的Local DNS，能够避免Local DNS造成的域名劫持或调度不精准问题。"
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
                filelist:[],
                ruleForm: {
                    hdis:false,
                    hdp: "",
                    hdhis:false,
                    cf:'',
                    kf:''
                },
                rules: {
                    cert: [{ required: false, message: "请上传证书文件", trigger: "blur" }]
                }
            };
        },
        computed: {},
        watch: {},
        methods: {
            //   实名
            info(){
                this.$request({
                    url: "/sys/httpdns/view",
                    params: {},
                }).then(res => {
                    if (res.data.rec == 0) {
                        this.ruleForm=res.data.data
                        if (this.ruleForm.hdhis==true) {
                            if (this.ruleForm.hdp==80) {
                                this.ruleForm.hdp=443;
                            }
                        }else{
                            if (this.ruleForm.hdp==443) {
                                this.ruleForm.hdp=80;
                            }
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
                formData.append('hdis', this.ruleForm.hdis);
                formData.append('hdp', this.ruleForm.hdp);
                formData.append('hdhis', this.ruleForm.hdhis);
                if (this.ruleForm.hdhis==true) {
                    if (this.filelist.length==2) {
                        formData.append('cf', this.filelist[0].file);
                        formData.append('kf', this.filelist[1].file);
                    }
                }
                this.$request({
                    url: "/sys/httpdns",
                    data: formData,
                    method:'post',
                    headers:{'Content-Type':"multipart/form-data"}
                }).then(res => {
                    if (res.data.rec == 0) {
                        this.$message.success(res.data.msg);
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