<template>
    <div class>

    </div>
</template>

<script>
export default {
    name: "",
    data() {
    },
    computed: {},
    watch: {},
    methods: {
    },
    created() {
    },
    mounted() { },
};
</script>
<style lang='less' scoped>
.el-dialog {

    .el-button:active,
    .el-button:focus,
    .el-button:hover {
        color: #0164F6;
        border-color: #0164F6;
    }
}

.add-device {
    background: #0164F6;
    color: #fff;
    padding: 10px 15px !important;
}

.el-card {
    margin-bottom: 20px;
}

.main-title {
    line-height: 60px;
    font-weight: bold;
}

.row1 {
    &>div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .space {
            margin-right: 20px;
        }
    }
}

.head-color {
    color: #fff;
    font-weight: bold;
}

.el-button--text {
    color: #0164F6;
}

.myTable {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    background: #fff;

    tr:first-child {
        background-color: #0164F6 !important;
        color: #fff;
    }

    tr:nth-child(odd) {
        background: #f5f7fa;
    }
}

// .myTable td,
.myTable tr {
    border: 1px solid #f1f1f1;
    color: #666;
    height: 40px;
}

.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
    box-shadow: none;
}

.text {
    line-height: 25px;
}

/deep/.padd .el-card__header {
    padding: 10px 20px;
}

/deep/.padd .el-card__body {
    padding: 15px;
}

/deep/.padd .el-dialog__body {
    padding: 5px 20px;
}</style>