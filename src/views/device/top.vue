<template>
    <div class>
        <div class="domin-manage">实时节点资源&nbsp;&nbsp;
            <el-select v-model="toip" placeholder="切换节点" @change="goToIp">
                <el-option v-for="item in ipl" :key="item.ip" :label="`${item.name}_${item.ip}`" :value="item.ip">
                </el-option>
            </el-select> <el-button v-if="t != '5m'" style="width:80px;margin:0px 20px" type="primary"
                @click="sub5m">五分钟</el-button> <el-button v-if="t != '1h'" style="width:80px;margin:0px 20px" type="primary"
                @click="sub1h">按小时</el-button> <el-button v-if="t != '1d'" style="width:80px;margin:0px 20px" type="primary"
                @click="sub1d">按天</el-button>
        </div>
        <el-row :gutter="25">
            <el-col :span="24">
                <el-card class="box-card tab">
                    <div ref="main" style="width: 100%;height:330px;top:10px;"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="25">
            <el-col :span="24">
                <el-card class="box-card tab">
                    <div ref="main1" style="width: 100%;height:330px;top:10px;"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="25">
            <el-col :span="24">
                <el-card class="box-card tab">
                    <div ref="main2" style="width: 100%;height:330px;top:10px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    name: "",
    components: {},
    data() {
        return {
            data: {},
            ipl: {},
            toip: "",
            t: "",
            otimer: null,
        };
    },
    computed: {},
    watch: {},
    methods: {
        sub5m() {
            this.$router.push("/node/chart?ip=" + this.$route.query.ip + "&t=5m");
        },
        sub1h() {
            this.$router.push("/node/chart?ip=" + this.$route.query.ip + "&t=1h");
        },
        sub1d() {
            this.$router.push("/node/chart?ip=" + this.$route.query.ip + "&t=1d");
        },
        goToIp() {
            this.$router.push("/node/top?ip=" + this.toip);
            this.count();
        },
        echart() {
            var myChart = echarts.init(this.$refs.main);
            var option = {
                xAxis: {
                    type: "category",
                    data: []
                },
                grid: {
                    x: 50,
                    x2: 30,
                    y: 50,
                    y2: 38
                },
                yAxis: {
                    type: "value",
                    min: 0,
                    max: this.data.dmi.lmx,
                    interval: this.data.dmi.liv,
                    // minInterval:1,
                    axisLabel: { show: true },
                    axisTick: {
                        //y轴刻度线
                        show: true
                    },
                    axisLine: {
                        //y轴
                        show: true
                    }
                },
                title: {
                    left: "35px",
                    text: "系统负载"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["1min", "5min", "15min"]
                },
                series: [
                    {
                        data: [],
                        name: "1min",
                        type: "line",
                        showSymbol: true,
                        hoverAnimation: true,
                        data: [],
                        symbolSize: 8,
                        showSymbol: true
                    },
                    {
                        data: [],
                        name: "5min",
                        type: "line",
                        showSymbol: true,
                        hoverAnimation: true,
                        data: [],
                        symbolSize: 8,
                        showSymbol: true,
                        itemStyle: {
                            normal: {
                                color: "blue",
                                lineStyle: {
                                    color: "blue"
                                }
                            }
                        }
                    },
                    {
                        data: [],
                        name: "15min",
                        type: "line",
                        showSymbol: true,
                        hoverAnimation: true,
                        data: [],
                        symbolSize: 8,
                        showSymbol: true,
                        itemStyle: {
                            normal: {
                                color: "orange",
                                lineStyle: {
                                    color: "orange"
                                }
                            }
                        }
                    }
                ]
            };
            option.xAxis.data = this.data.load.map(i => {
                return i.time;
            });
            option.series[0].data = this.data.load.map(i => {
                return i.load1;
            });
            option.series[1].data = this.data.load.map(i => {
                return i.load5;
            });
            option.series[2].data = this.data.load.map(i => {
                return i.load15;
            });
            myChart.setOption(option);
        },
        echart1() {
            var myChart = echarts.init(this.$refs.main1);
            var option = {
                xAxis: {
                    type: "category",
                    data: []
                },
                grid: {
                    x: 50,
                    x2: 30,
                    y: 50,
                    y2: 38
                },
                yAxis: {
                    type: "value",
                    //name:"单位（G）",
                    min: 0,
                    max: this.data.dmi.mmx,
                    interval: this.data.dmi.miv,
                    // minInterval:1,
                    axisLabel: { show: true },
                    axisTick: {
                        //y轴刻度线
                        show: true
                    },
                    axisLine: {
                        //y轴
                        show: true
                    }
                },
                title: {
                    left: "35px",
                    text: "实时内存",
                    subtext: "单位（G）"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["使用内存", "空闲内存"]
                },
                series: [
                    {
                        data: [],
                        name: "使用内存",
                        type: "line",
                        showSymbol: true,
                        hoverAnimation: true,
                        data: [],
                        symbolSize: 8,
                        showSymbol: true,
                        itemStyle: {
                            normal: {
                                color: "blue",
                                lineStyle: {
                                    color: "blue"
                                }
                            }
                        }
                    },
                    {
                        data: [],
                        name: "空闲内存",
                        type: "line",
                        showSymbol: true,
                        hoverAnimation: true,
                        data: [],
                        symbolSize: 8,
                        showSymbol: true,
                        itemStyle: {
                            normal: {
                                color: "orange",
                                lineStyle: {
                                    color: "orange"
                                }
                            }
                        }
                    }
                ]
            };
            option.xAxis.data = this.data.mem.map(i => {
                return i.time;
            });
            option.series[0].data = this.data.mem.map(i => {
                return i.used;
            });
            option.series[1].data = this.data.mem.map(i => {
                return i.free;
            });
            myChart.setOption(option);
        },
        echart2() {
            var myChart = echarts.init(this.$refs.main2);
            var option = {
                xAxis: {
                    type: "category",
                    data: []
                },
                grid: {
                    x: 50,
                    x2: 30,
                    y: 50,
                    y2: 38
                },
                yAxis: {
                    type: "value",
                    min: 0,
                    max: this.data.dmi.nmx,
                    interval: this.data.dmi.niv,
                    // minInterval:1,
                    axisLabel: { show: true },
                    axisTick: {
                        //y轴刻度线
                        show: true
                    },
                    axisLine: {
                        //y轴
                        show: true
                    }
                },
                title: {
                    left: "35px",
                    text: "实时流量",
                    subtext: `单位（${this.data.nbit}）`
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["发送流量", "接收流量"]
                },
                series: [
                    {
                        data: [],
                        name: "发送流量",
                        type: "line",
                        showSymbol: true,
                        hoverAnimation: true,
                        data: [],
                        symbolSize: 8,
                        showSymbol: true,
                        itemStyle: {
                            normal: {
                                color: "blue",
                                lineStyle: {
                                    color: "blue"
                                }
                            }
                        }
                    },
                    {
                        data: [],
                        name: "接收流量",
                        type: "line",
                        showSymbol: true,
                        hoverAnimation: true,
                        data: [],
                        symbolSize: 8,
                        showSymbol: true,
                        itemStyle: {
                            normal: {
                                color: "orange",
                                lineStyle: {
                                    color: "orange"
                                }
                            }
                        }
                    }
                ]
            };
            option.xAxis.data = this.data.net.map(i => {
                return i.time;
            });
            option.series[0].data = this.data.net.map(i => {
                return i.bytesSent;
            });
            option.series[1].data = this.data.net.map(i => {
                return i.bytesRecv;
            });
            myChart.setOption(option);
        },
        count() {
            this.$request({
                url: "/sys/reslog",
                params: { ip: this.$route.query.ip, id: this.$route.query.id }
            }).then(res => {
                if (res.data.rec == 0) {
                    var ip = this.$route.query.ip + ':8002'
                    this.data = res.data.data[ip];
                    this.echart();
                    this.echart1();
                    this.echart2();
                } else {
                    this.$message.error(res.data.msg);
                    //this.$router.go(-1);
                    return
                }
            });
            this.otimer = setInterval(() => {
                this.$request({
                    url: "/sys/reslog",
                    params: { ip: this.$route.query.ip, id: this.$route.query.id }
                }).then(res => {
                    if (res.data.rec == 0) {
                        var ip = this.$route.query.ip + ':8002'
                        this.data = res.data.data[ip];
                        this.echart();
                        this.echart1();
                        this.echart2();
                    } else {
                        clearInterval(this.otimer)
                    }
                });
            }, 1000);
        },
        getIpList() {
            this.$request({
                url: "/domain/res/ip/list"
            }).then(res => {
                if (res.data.rec == 0) {
                    this.ipl = res.data.data;
                    //console.log(this.ipl);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        }
    },
    created() { },
    mounted() {
        this.getIpList();
        this.count();
        this.$once('hook:beforeDestroy', () => {//页面关闭
            clearInterval(this.otimer);//停止
        });
    }
};
</script>
<style lang='less' scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #fff;
}

.domin-manage {
    line-height: 60px;
    font-weight: bold;
}

.el-card {
    margin-bottom: 20px;

    .col1 {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-button {
            font-size: 12px;
            padding: 10px 15px;
            border: 1px solid #0164F6;
            color: #0164F6;
        }

        .right-space {
            margin-right: 20px;
        }

        .el-input {
            width: 200px;
            line-height: 34px;
            font-size: 12px;
            padding: 0;

            input {
                line-height: 34px;
            }
        }

        .add {
            color: #fff;
            background: #0164F6;
        }
    }
}</style>