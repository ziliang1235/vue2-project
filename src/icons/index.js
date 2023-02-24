// 配置svg
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
Vue.component('svg-icon', SvgIcon)

//一次性将所有的svg引用到项目中
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)