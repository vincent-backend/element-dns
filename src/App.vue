<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
.el-button {
  padding: 8px 21px;
  font-size: 12px;

  &.el-button--default {
    background: #FFFFFF;
    box-shadow: 0px 4px 10px 0px rgba(0, 60, 179, 0.06);
    border-radius: 4px;
    border: none;
    color: #001734 !important;
  }

  &.el-button--primary {
    background: linear-gradient(270deg, #3097FF 0%, #005AFF 100%) !important;
    color: #FFF !important;
    border: none !important;
  }
}

.el-input {
  background: #FFFFFF;
  box-shadow: 0px 4px 10px 0px rgba(0, 60, 179, 0.06);
  border-radius: 4px;
  border: none !important;
}

.el-table {
  thead {
    th {
      background: #FFFFFF !important;

      .cell,
      .el-button {
        font-size: 16px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        color: #001734 !important;
        line-height: 22px;
        padding: 0;
      }
    }
  }

  tbody {
    .el-button {
      padding: 0;
      color: #1575FF;
    }
  }
}

.el-pager {
  .number {
    background: #FFFFFF !important;
    border-radius: 4px !important;
    border: 1px solid #EDEFF5 !important;

    font-size: 14px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #001734;

    &.active {
      background: linear-gradient(270deg, rgba(48, 151, 255, .2) 0%, rgba(0, 90, 255, .2) 100%) !important;
      color: #1575FF !important;
    }
  }
}

.el-pagination__total {
  font-size: 14px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #001734;
  line-height: 14px;
  opacity: .6;
}
</style>
