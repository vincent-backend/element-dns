<template>
    <div class="pass-container">
        <div class="domin-manage">在线充值</div>
        <el-card>
            <div class="qrcode" id="qrcodeDom">扫码支付</div>
            <el-form v-if="qurl==''"
                     :model="form"
                     status-icon
                     ref="ruleForm"
                     label-width="100px"
                     class="demo-ruleForm"
            >
                <el-form-item label="支付商" prop="pt">
                    <el-radio-group v-model="form.pt" clearable class="shurua">
                        <el-radio :label="1">支付宝</el-radio>
                        <el-radio :label="2">微信</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="金额:" prop="amount">
                    <el-input placeholder="金额" v-model="form.amount" style="width:160px;margin: 0 0px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2';
    components:{
        QRCode
    }
    export default {
        name: "",
        components: {},
        data() {
            return {
                form:{
                    pt:1,
                    amount:""
                },
                qurl:"",
            };
        },
        computed: {},
        watch: {},
        methods: {
            transQrcode(){
                let qrcode=new QRCode('qrcodeDom',{
                    width: 160,
                    height:160,
                    text: this.qurl,  //需要转换的链接
                    // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f',   // 背景色
                    // foreground: '#ff0'    // 前景色
                })
            },
            getQrcode(){
                document.getElementById("qrcodeDom").innerHTML=''  //先清空之前生成的二维码
                this.$nextTick(()=>{
                    this.transQrcode()
                })
            },
            submit() {
                this.$request({
                    url: "/pay/order",
                    params: {
                        pt:this.form.pt,
                        amount:this.form.amount
                    }
                }).then(res => {
                    if (res.data.rec == 2) {
                        this.$message.success(res.data.msg);
                        this.qurl=res.data.data;
                        this.getQrcode();
                    }else if (res.data.rec == 0) {
                        this.$message.success(res.data.msg);
                        //this.$router.push(res.data.data);
                        this.goUrl(res.data.data);
                        this.$router.push("/user/paylog");
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            },
            goUrl(to) {
                window.open(to,'_blank')
            }
        },
        created() {},
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
    .qrcode{
        display: inline-block;
        img {
            width: 180px;
            height: 180px;
            background-color: #fff; //设置白色背景色
            padding: 6px; // 利用padding的特性，挤出白边
            box-sizing: border-box;
        }
    }
</style>