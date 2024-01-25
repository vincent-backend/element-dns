<template>
    <div class>
        <div class="domin-manage">查询统计</div>
        <div class="header-container">
            <el-select @change="selectNid" v-model="nid" placeholder="选择节点" v-if="gid == 1" filterable allow-create>
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in nidlist" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
            <el-select @change="selectDom" v-model="domain" placeholder="选择域名" filterable allow-create>
                <el-option label="全部(域名)" value=""></el-option>
                <el-option v-for="item in domlist" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
            </el-select>
            <el-button :style='isActive == "30m" ? styCss : ""' @click="t30m">实时</el-button>
            <el-button :style='isActive == "3h" ? styCss : ""' @click="t3h">三小时</el-button>
            <el-button :style='isActive == "1d" ? styCss : ""' @click="t1d">当天</el-button>
            <el-button :style='isActive == "yd" ? styCss : ""' @click="tyd">昨天</el-button>
            <el-button :style='isActive == "1w" ? styCss : ""' @click="t1w">一周</el-button>
            <el-button :style='isActive == "1m" ? styCss : ""' @click="t1m">当月</el-button>
        </div>
        <el-row :gutter="25">
            <el-col :span="24">
                <el-card class="box-card tab">
                    <div ref="main" style="width: 100%;height:330px;top:10px;"></div>
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
            nidlist: [],
            domlist: [],
            gid: 0,
            nid: "",
            domain: "",
            times: "",
            inv: 1000,
            otimer: null,
            isActive: '30m',
            styCss: {
                color: '#fff',
                background: '#0164F6',
                color: '#FFF!important',
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        echart() {
            var myChart = echarts.init(this.$refs.main);
            var option = {
                xAxis: {
                    type: "category",
                    data: []
                },
                grid: {
                    x: 80,
                    x2: 30,
                    y: 50,
                    y2: 38
                },
                yAxis: {
                    type: "value",
                    min: 0,
                    max: this.data.max,
                    interval: this.data.inv,
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
                    text: `查询统计  最大${this.data.max} - 最小${this.data.min}`,
                    subtext: `单位（次）`
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    //data: ["实时流量", "接收流量"]
                    data: ["查询量"]
                },
                series: [
                    {
                        data: [],
                        name: "查询量",
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
                    }
                    // {
                    //     data: [],
                    //     name: "接收流量",
                    //     type: "line",
                    //     showSymbol: true,
                    //     hoverAnimation: true,
                    //     data: [],
                    //     symbolSize: 8,
                    //     showSymbol: true,
                    //     itemStyle: {
                    //         normal: {
                    //             color: "orange",
                    //             lineStyle: {
                    //                 color: "orange"
                    //             }
                    //         }
                    //     }
                    // }
                ]
            };
            option.xAxis.data = this.data.list.map(i => {
                return i.ds;
            });
            option.series[0].data = this.data.list.map(i => {
                return i.dc;
            });
            // option.series[1].data = this.data.flow.list.map(i => {
            //     return i.val;
            // });
            myChart.setOption(option);
        },
        count() {
            // if (this.domain == "" && this.gid == 0) {
            //     return
            // }
            this.$request({
                url: "/domain/flow",
                params: { nid: this.nid, domain: this.domain, ts: this.times }
            }).then(res => {
                if (res.data.rec == 0) {
                    this.data = res.data.data;
                    this.echart();
                } else {
                    this.$message.error(res.data.msg);
                    clearInterval(this.otimer);
                    //this.$router.go(-1);
                    //return
                }
            });
            this.otimer = setInterval(() => {
                this.$request({
                    url: "/domain/flow",
                    params: { nid: this.nid, domain: this.domain, ts: this.times }
                }).then(res => {
                    if (res.data.rec == 0) {
                        this.data = res.data.data;
                        this.echart();
                    } else {
                        clearInterval(this.otimer)
                    }
                });
            }, this.inv);
        },
        getNidDom() {
            this.$request({
                url: "/domain/flow/nid/dom",
                params: {}
            }).then(res => {
                if (res.data.rec == 0) {
                    this.domlist = res.data.data.dom;
                    this.nidlist = res.data.data.nid;
                } else {
                    this.$message.error(res.data.msg);
                    clearInterval(this.otimer);
                }
            });
        },
        selectNid() {
            if (this.isActive == "30m") {
                this.inv = 1000;
            } else {
                this.inv = 600000;
            }
            clearInterval(this.otimer);
            this.count();
        },
        selectDom() {
            if (this.isActive == "30m") {
                this.inv = 1000;
            } else {
                this.inv = 600000;
            }
            clearInterval(this.otimer);
            this.count();
        },
        t30m() {
            this.isActive = "30m"
            clearInterval(this.otimer);
            this.times = "30m";
            this.inv = 1000;
            this.count();
        },
        t3h() {
            this.isActive = "3h"
            clearInterval(this.otimer);
            this.times = "3h";
            this.inv = 600000;
            this.count();
        },
        t1d() {
            this.isActive = "1d"
            clearInterval(this.otimer);
            this.times = "1d";
            this.inv = 600000;
            this.count();
        },
        tyd() {
            this.isActive = "yd"
            clearInterval(this.otimer);
            this.times = "yd";
            this.inv = 600000;
            this.count();
        },
        t1w() {
            this.isActive = "1w"
            clearInterval(this.otimer);
            this.times = "1w";
            this.inv = 600000;
            this.count();
        },
        t1m() {
            this.isActive = "1m"
            clearInterval(this.otimer);
            this.times = "1m";
            this.inv = 600000;
            this.count();
        }
    },
    created() {
        this.gid = localStorage.getItem("gid");
        this.nid = this.$route.query.nid;
    },
    mounted() {
        this.getNidDom();
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
}

.row1 {
    display: flex;
    justify-content: space-between;

    &>div {
        display: flex;
        align-items: left;
    }
}

button {
    padding: 10px 15px;
    border: 1px solid #0164F6;
}

.active {
    color: #fff;
    background: #0164F6;
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    margin-bottom: 20px;

    .el-button {
        margin-left: 0;
    }
}
</style>