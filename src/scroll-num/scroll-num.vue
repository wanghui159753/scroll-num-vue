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
        >{{ item }}</i>
        <span
          v-if="!isNaN(item)"
          class="scroll-num-ten"
          :style="transform_list[item]"
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
  name: 'ScrollNumVue',
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
    get_computed_height () {
      const d = this.$refs.tar.querySelector('.scroll-num-ten').children; const h = parseInt(getComputedStyle(d[0], null).height)
      for (let i = 0; i < d.length; i++) {
        this.transform_list.push({
          transform: 'translateY(-' + (h * i) + 'px)'
        })
      }
      this.h = h
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
    writing-mode: vertical-lr;
    text-orientation: upright;
  }

  .scroll-num-ten {
    //writing-mode: vertical-lr;
    //letter-spacing: 1px;
    transition: all 1s ease-in-out;
    //text-orientation: upright;
    display: block;

    i {
      display: block;
      text-align: center;
      height: 100%;
      font-style: normal;
    }
  }

  .loop(@c,@i:1) when (@i<=@c) {
    @a: @i * 20;
    .scroll@{i} {
      transform: translateY(~'-@{a}px');
    }
    .loop(@c, @i+1);
  }

  .loop(10)

}
</style>
