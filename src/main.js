import Vue from 'vue'
import App from './App.vue'
import router from './router'
import request from '@/utils/request.js'
import '@/style/reset.css'
import Clipboard from 'clipboard';
Vue.config.productionTip = false
import {
  button,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Card,
  scrollbar,
  Progress,
  Tooltip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Descriptions,
  DescriptionsItem,
  Table,
  TableColumn,
  Dialog,
  Select,
  Option,
  Tabs,
  TabPane, alert, Switch, Step, Steps, Pagination, Checkbox, Tag, Radio, Message, MessageBox, DatePicker, Cascader, Drawer, RadioGroup, Popover, Autocomplete, Upload
} from 'element-ui'
Vue.use(Container).use(Header).use(Aside).use(Main).use(button).use(Menu).use(Submenu).use(MenuItem).use(MenuItemGroup).use(Form).use(FormItem).use(Input).use(Row).use(Col).use(Card).use(scrollbar).use(Progress).use(Tooltip).use(Dropdown).use(DropdownItem).use(DropdownMenu).use(Table).use(TableColumn).use(Dialog).use(Select).use(Option).use(Tabs).use(TabPane).use(alert).use(Switch).use(Step).use(Steps).use(Pagination).use(Checkbox).use(Tag).use(Radio).use(DatePicker).use(Tag).use(Cascader).use(Drawer).use(RadioGroup).use(Popover).use(Autocomplete).use(Upload).use(Descriptions).use(DescriptionsItem)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$request = request;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
