

### 常用的图片格式

#### 光栅图

光栅图也叫做位图、点阵图、像素图，简单的说，就是最小单位由像素构成的图,只有点的信息.缩放时会失真。



**jpg**：有损压缩，压缩算法不会对图片所有的数据进行编码压缩，而是在压缩的时候，去除了人眼无法识别的图片细节。压缩率高，压缩后会失真，比png体积要小，兼容性好，色彩丰富，适合做中大图片

**png**   :支持透明，无损压缩，能在保证图片质量的同时尽可能压缩图像文件的大小。尺寸体积要比jpg的大，适合做小图标

**gif**：一般做动图

**webp**：同时支持有损压缩和无损压缩，相同质量的图片，webp具有更小的体积，且支持动画和透明，存在兼容性问题







#### 矢量图

存储的是一幅图的结构数据，即图形的绘制方式，包含点，线，面，位置等等，缩小放大会保持原先的比例进行调整



**svg**

矢量图片，放大不影响质量，显示效果好，不存在锯齿等情况，可以支持动画效果，SVG文件比那些GIF和JPEG格式的文件要小很多，不适合表示复杂图形，适合做logo、图标

不是所有浏览器都支持



### svg图片的使用

```
1.下载加载器

    npm install svg-sprite-loader --save-dev

2.配置加载器
    在项目根路径下，创建vue.config.js文件
```

```
	const path = require('path')
    function resolve (dir) {
        return path.join(__dirname, './', dir)
    }

    module.exports = {
        chainWebpack(config) {
            config.module
                .rule('svg')
                .exclude.add(resolve('src/icons'))
                .end()
            config.module
                .rule('icons')
                .test(/\.svg$/)
                .include.add(resolve('src/icons'))
                .end()
                .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({
                    symbolId: 'icon-[name]'
                })
                .end()
        }
    }
```

3. **在src下创建一个svg文件的存储目录，以及配置文件**
   src
       icons
           svg(存放svg图片目录)
           index.js（内容如下）

```
// 配置svg
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
Vue.component('svg-icon', SvgIcon)

//一次性将所有的svg引用到项目中
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
```

4.**需要在src/components目录下创建一个组件**
    src
        components
            SvgIcon
                index.vue(内容如下)

```
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.18em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

5.**在main.js中引用src/icons/index.js配置**

6.**直接使用即可**
    <svg-icon iconClass="svg的图片的名字"></svg-icon>



### 阿里巴巴iconfont

1、font class引用

```
第一步：在main.js引入 fontclass 代码：
import '@/assets/iconfont/iconfont.css'

第二步：挑选相应图标并获取类名，应用于页面：
<span class="iconfont icon-xxx"></span>
```

2、Symbol 引用

```
第一步：在main.js引入 symbol 代码：
import '@/assets/iconfont/iconfont.js'

第二步：在app.vue加入通用 CSS 代码（引入一次就行）：
<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

第三步：挑选相应图标并获取类名，应用于页面：
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-xxx"></use>
</svg>
```

