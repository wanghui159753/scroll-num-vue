<!--
 * @Author: your name
 * @Date: 2021-07-16 16:28:14
 * @LastEditTime: 2021-07-19 15:25:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scroll-num-vue/README.md
-->
# scroll-num

> '数字翻滚效果'

# 效果图

![Image](https://raw.githubusercontent.com/wanghui159753/scroll-num-vue/master/img/link.gif)


## npm 引入

``` bash
npm install scroll-num-vue

yarn add scroll-num-vue
```

## npm使用
```
import scroll from 'scroll-num-vue';

app.use(scroll);
```

### props

<table>
  <tr>
    <td>num</td>
    <td>dot</td>
  </tr>
  <tr>
    <td>需要显示的数字</td>
    <td>是否显示逗号</td>
  </tr>
</table>

### 适合大屏使用的 直接上代码，懒得在弄了

```vue
<template>
  <div
    ref="tar"
    class="c"
  >
    <ul class="scroll-num-box">
      <li
        v-for="(item,i) in num_list"
        :key="i"
        class="scroll-num-one"
        :style="{height:h+'px'}"
      >
        <i
          v-if="isNaN(item)"
          class="scroll-num-dot"
        >{{ item||'' }}</i>
        <span
          v-if="!isNaN(item)"
          :class="'scroll-num-ten '+transform_list[item]"
        >
          <i
            v-for="item1 in 10"
            :key="item1"
          >{{ item1 - 1 }}</i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 请手动修改
 * num  需要显示的数字
 *
 * dot  是否显示，
 *
 */
export default {
  name: 'ScrollNum',
  props: {
    num: {
      type: Number,
      default: 0
    },
    dot: { type: Boolean, default: false }
  },
  data () {
    return {
      num_list: [],
      ten_num: 12345678910,
      transform_list: [],
      h: 0
    }
  },
  watch: {
    num (val) {
      this.num_list = this.get_str_num_ar(val)
    }
  },
  created () {
    this.num_list = this.get_str_num_ar(this.num)
  },
  mounted () {
    this.get_computed_height()
    setTimeout(() => {
      this.transform_list = ['scroll0', 'scroll1', 'scroll2', 'scroll3', 'scroll4', 'scroll5', 'scroll6', 'scroll7', 'scroll8', 'scroll9']
    }, 100)
    window.addEventListener('resize', this.get_computed_height)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.get_computed_height)
  },
  methods: {
    // 把数字转化为字符串数组
    get_str_num_ar (val) {
      val = String(val)
      if (this.dot) {
        const len = val.length; const start = len % 3; let sal = parseInt(len / 3); let newstr = ''
        sal = !start ? sal - 1 : sal
        for (let i = sal; i >= 0; i--) {
          const l = val.length
          const s = val.slice(l - 3 < 0 ? 0 : l - 3, l)
          val = val.slice(0, -3)
          newstr = (i === 0 ? '' : ',') + s + newstr
        }
        return newstr.split('')
      } else {
        return val.split('')
      }
    },

    // 获取需要动画的几个关键帧

    get_computed_height (e) {
      setTimeout(() => {
        const d = this.$refs.tar.querySelector('.scroll-num-ten').children; const h = parseInt(getComputedStyle(d[0], null).height)
        this.h = h
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.c{
  display: inline-block;
}
.scroll-num-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  .scroll-num-one {
    overflow: hidden;
    height: 20px;
  }

  .scroll-num-dot {
    text-align: center;
    //writing-mode: vertical-lr;
    //text-orientation: upright;
  }

  .scroll-num-ten {
    //writing-mode: vertical-lr;
    //letter-spacing: 1px;
    transition: all 1s ease-in-out;
    //text-orientation: upright;
    display: block;
    transform: translateY(0);
    i {
      display: block;
      text-align: center;
      height: 100%;
      font-style: normal;
    }
  }

  .loop(@c,@i:0) when (@i<=@c) {
    @a: @i  * 10;
    .scroll@{i} {
      transform: translateY(~'-@{a}%');
    }
    .loop(@c, @i+1);
  }

  .loop(10)

}
</style>

```
