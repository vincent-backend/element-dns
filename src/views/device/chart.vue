<template>
    <div class>
        <div class="domin-manage">{{ this.data.tn }} 节点资源
            <el-select v-model="toip" placeholder="切换节点" @change="goToIp">
                <el-option v-for="item in ipl" :key="item.ip" :label="`${item.name}_${item.ip}`" :value="item.ip">
                </el-option>
            </el-select> <el-button style="width:80px;margin:0px 20px" type="primary" @click="sub00">实时</el-button>
            <el-button v-if="t != '5m'" style="width:80px;margin:0px 20px" type="primary" @click="sub5m">五分钟</el-button>
            <el-button v-if="t != '1h'" style="width:80px;margin:0px 20px" type="primary" @click="sub1h">按小时</el-button>
            <el-button v-if="t != '1d'" style="width:80px;margin:0px 20px" type="primary" @click="sub1d">按天</el-button>
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
                    <div ref="main4" style="width: 100%;height:330px;top:10px;"></div>
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
        <el-row :gutter="25">
            <el-col :span="24">
                <el-card class="box-card tab">
                    <div ref="main5" style="width: 100%;height:330px;top:10px;"></div>
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
            otimer: null
        };
    },
    computed: {},
    watch: {},
    methods: {
        sub00() {
            ///node/top?ip=118.193.37.231&id=2
            this.$router.push("/node/top?ip=" + this.$route.query.ip);
        },
        sub5m() {
            this.$router.push("/node/chart?ip=" + this.$route.query.ip + "&t=5m");
            this.count();
        },
        sub1h() {
            this.$router.push("/node/chart?ip=" + this.$route.query.ip + "&t=1h");
            this.count();
        },
        sub1d() {
            this.$router.push("/node/chart?ip=" + this.$route.query.ip + "&t=1d");
            this.count();
        },
        goToIp() {
            this.$router.push("/node/chart?ip=" + this.toip + "&t=" + this.$route.query.t);
            this.count();
        },
        echart() {
            var myChart = echarts.init(this.$refs.main);
            //myChart.setAttribute('_echarts_instance_', '');
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
                    text: "内存使用",
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
                    text: "流量",
                    subtext: "单位（M）"
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
        echart4() {
            var myChart = echarts.init(this.$refs.main4);
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
                    max: this.data.dmi.dmx,
                    interval: this.data.dmi.div,
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
                    text: "磁盘使用",
                    subtext: "单位（G）"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["使用磁盘", "空闲磁盘"]
                },
                series: [
                    {
                        data: [],
                        name: "使用磁盘",
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
                        name: "空闲磁盘",
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
            option.xAxis.data = this.data.disk.map(i => {
                return i.time;
            });
            option.series[0].data = this.data.disk.map(i => {
                return i.used;
            });
            option.series[1].data = this.data.disk.map(i => {
                return i.free;
            });
            myChart.setOption(option);
        },
        echart5() {
            var myChart = echarts.init(this.$refs.main5);
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
                    max: this.data.dmi.wmx,
                    interval: this.data.dmi.wiv,
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
                    text: "平均带宽",
                    subtext: "单位（M）"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["进带宽", "出带宽"]
                },
                series: [
                    {
                        data: [],
                        name: "进带宽",
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
                        name: "出带宽",
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
                return i.inbw;
            });
            option.series[1].data = this.data.net.map(i => {
                return i.outbw;
            });
            myChart.setOption(option);
        },
        count() {
            this.$request({
                url: "/domain/reslog/get",
                params: { ip: this.$route.query.ip, t: this.$route.query.t }
            }).then(res => {
                if (res.data.rec == 0) {
                    //var ip = this.$route.query.ip + ':8003'
                    //this.data = res.data.data[ip];
                    this.t = this.$route.query.t;
                    this.data = res.data.data;
                    this.echart();
                    this.echart1();
                    this.echart2();
                    this.echart4();
                    this.echart5();
                } else {
                    this.$message.error(res.data.msg);
                    //this.$router.go(-1);
                    //this.$router.push("/node/reslog");
                    return
                }
            });
            this.otimer = setInterval(() => {
                this.$request({
                    url: "/domain/reslog/get",
                    params: { ip: this.$route.query.ip, t: this.$route.query.t }
                }).then(res => {
                    if (res.data.rec == 0) {
                        //var ip = this.$route.query.ip + ':8003'
                        //this.data = res.data.data[ip];
                        this.data = res.data.data;
                        this.echart();
                        this.echart1();
                        this.echart2();
                        this.echart4();
                        this.echart5();
                    } else {
                        clearInterval(this.otimer)
                    }
                });
            }, 300000);
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
        this.t = this.$route.query.t;
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