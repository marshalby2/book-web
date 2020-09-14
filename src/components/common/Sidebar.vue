<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in menus">
                <template v-if="item.children.length > 0">
                    <el-submenu :index="item.url" :key="item.url">
                        <template v-slot:title>
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.label }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu
                                v-if="subItem.children.length > 0"
                                :index="subItem.url"
                                :key="subItem.url"
                            >
                              <i :class="subItem.icon"></i>
                                <template v-slot:title>{{ subItem.label }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.url"
                                >{{ threeItem.label }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.url"
                                :key="subItem.url"
                            >{{ subItem.label }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.label }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bus from '../common/bus'
import { getMenuTreeByUserId } from '@/api/menu'
export default {
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    /**
     * 加载菜单
     */
    getMenuTree: function () {
      getMenuTreeByUserId(1).then(response => {
        this.menus = response.data
      })
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    },
    ...mapGetters([
      'menus'
    ])
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
    // this.getMenuTree()
  }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
