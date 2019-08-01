<template>
  <div class="tw-total-menu-panel">
    <tw-icon
      class="tw-total-menu-close"
      icon="icon-shut-down"
      font-size="14px"
      @click.native="handleTotalMenuCloseClick"
    ></tw-icon>
    <div class="tw-total-menu-query-bar">
      <tw-icon class="tw-prefix-icon" icon="icon-search" font-size="18px"></tw-icon>
      <input type="text" class="tw-total-menu-query-box" v-model="query">
      <tw-icon
        class="tw-suffix-icon"
        icon="icon-shut-down"
        font-size="12px"
        v-if="query.length > 0"
        @click.native="handleTotalMenuQueryClearClick"
      ></tw-icon>
      <div class="tw-total-menu-query-prompt" v-if="query.length > 0">
        {{totalMenuTextPromptBefore}}
        "
        <span class="tw-total-menu-query-text" v-text="query"></span>
        "
        {{totalMenuTextPromptAfter}}
      </div>
    </div>
    <div class="tw-total-menu-box" :class="{filter: query.length > 0}">
      <el-scrollbar class="tw-scrollbar tw-y" ref="totalMenuScrollbar">
        <div class="tw-total-menu-group">
          <div
            class="tw-total-menu-group-item"
            v-for="(item, index) in filterSystemMenuColumnOne"
            :key="'tw-total-menu-group-1_' + index"
            :index="item.id"
          >
            <div class="tw-total-menu-group-item-header" v-text="item.title"></div>
            <ul class="tw-total-menu-group-item-body">
              <li
                class="tw-total-menu-group-item-body-item"
                v-for="secondaryItem in filterSecondaryMenu(item.id)"
                :key="secondaryItem.id"
              >
                <router-link
                  tag="div"
                  class="tw-menu-link"
                  :to="secondaryItem.href || ''"
                  @click.native="handleTotalMenuGroupItemClick(secondaryItem)"
                >{{secondaryItem.title}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="tw-total-menu-group">
          <div
            class="tw-total-menu-group-item"
            v-for="(item, index) in filterSystemMenuColumnTwo"
            :key="'tw-total-menu-group-2_' + index"
            :index="item.id"
          >
            <div class="tw-total-menu-group-item-header" v-text="item.title"></div>
            <ul class="tw-total-menu-group-item-body">
              <li
                class="tw-total-menu-group-item-body-item"
                v-for="secondaryItem in filterSecondaryMenu(item.id)"
                :key="secondaryItem.id"
              >
                <router-link
                  tag="div"
                  class="tw-menu-link"
                  :to="secondaryItem.href || ''"
                  @click.native="handleTotalMenuGroupItemClick(secondaryItem)"
                >{{secondaryItem.title}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="tw-total-menu-group">
          <div
            class="tw-total-menu-group-item"
            v-for="(item, index) in filterSystemMenuColumnThree"
            :key="'tw-total-menu-group-3_' + index"
            :index="item.id"
          >
            <div class="tw-total-menu-group-item-header" v-text="item.title"></div>
            <ul class="tw-total-menu-group-item-body">
              <li
                class="tw-total-menu-group-item-body-item"
                v-for="secondaryItem in filterSecondaryMenu(item.id)"
                :key="secondaryItem.id"
              >
                <router-link
                  tag="div"
                  class="tw-menu-link"
                  :to="secondaryItem.href || ''"
                  @click.native="handleTotalMenuGroupItemClick(secondaryItem)"
                >{{secondaryItem.title}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="tw-total-menu-system-bar">
      <div
        class="tw-total-menu-system-item"
        v-for="item in filterSystemMenu"
        :key="item.id"
        v-text="item.title"
        @click="handleTotalSystemMenuClick(item)"
      ></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "underscore";
import TWIcon from "../TWIcon";

export default {
  name: "TWTotalMenu",
  data() {
    return {
      query: ""
    };
  },
  props: {
    systemMenu: Array,
    secondaryMenu: Object
  },
  mounted() {
    this.$nextTick(() => {
      this.filterSystemMenuColumnOne;
    });
  },
  computed: {
    filterSystemMenu() {
      const menuList = this.systemMenu;
      return _.filter(
        menuList,
        item => this.filterSecondaryMenu(item.id).length > 0
      );
      // this.filterMenuList(menuList)
      /*return _.filter(menuList, item => {
					let list = this.filterSecondaryMenu(item.id);
					if (list)
					console.info('filterSystemMenu:', list)
					return list.length > 0
				});*/
    },
    filterSystemMenuColumnOne() {
      return _.filter(this.filterSystemMenu, (item, index) => index % 3 === 0);
    },
    filterSystemMenuColumnTwo() {
      return _.filter(this.filterSystemMenu, (item, index) => index % 3 === 1);
    },
    filterSystemMenuColumnThree() {
      return _.filter(this.filterSystemMenu, (item, index) => index % 3 === 2);
    },
    totalSystemMenu() {
      return this.filterSystemMenu.length > 0;
    },
    totalMenuTextPromptBefore() {
      return this.totalSystemMenu ? "以下是与" : "未找到与";
    },
    totalMenuTextPromptAfter() {
      return "相关的模块" + (this.totalSystemMenu ? "：" : "。");
    }
  },
  methods: {
    filterSecondaryMenu(number) {
      const menuList = this.secondaryMenu[number];
      // return _.filter(menuList, item => (item.title.indexOf(this.query) >= 0 || this.query.length === 0));
      return this.filterSecondaryMenuList(menuList);
    },
    filterSecondaryMenuList(menuList) {
      let newMenuList = [];
      _.each(menuList, item => {
        if (item.children)
          newMenuList.push(...this.filterSecondaryMenuList(item.children));
        else if (item.title.indexOf(this.query) >= 0 || this.query.length === 0)
          newMenuList.push(item);
      });
      return newMenuList;
    },
    handleTotalMenuCloseClick() {
      this.$emit("close");
    },
    handleTotalMenuQueryClearClick() {
      this.query = "";
    },
    handleTotalMenuGroupItemClick(item) {
      this.handleTotalMenuCloseClick();
      const systemId = item.href.split("/")[1];
      const systemMenu = _.filter(
        this.systemMenu,
        item => item.id === systemId
      )[0];
      this.$emit("total-menu-change", {
        systemMenuItem: { ...systemMenu },
        secondaryMenuItem: { ...item }
      });
    },
    handleTotalSystemMenuClick(item) {
      let jump = document.querySelectorAll(".tw-total-menu-group-item");
      let total = _.filter(
        jump,
        _item => _item.getAttribute("index") === item.id
      );
      let length = total[0].offsetTop;
      $(this.$refs.totalMenuScrollbar.wrap).animate({ scrollTop: length }, 500);
    }
  },
  components: {
    "tw-icon": TWIcon
  }
};
</script>

<style lang="scss" scoped>
.tw-total-menu {
  &-panel {
    position: absolute;
    top: 0;
    width: 960px;
    height: 100%;
    padding: 40px 30px;
    border-right: 1px solid #eeeeee;
    box-sizing: border-box;
    background-color: #ffffff;
    z-index: 20;
  }
  &-close {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 7px;
    font-size: 12px;
    font-weight: bold;
    color: #595959;
    cursor: pointer;
    &:hover {
      text-shadow: 1px 1px 4px #aaaaaa;
      color: #000000;
    }
  }
  &-query {
    $color: #408ab4;
    &-bar {
      position: relative;
      width: 710px;
      .tw-prefix-icon,
      .tw-suffix-icon {
        position: absolute;
        top: 15px;
        transform: translate(-50%, -50%);
      }
      .tw-prefix-icon {
        left: 15px;
        color: #d9d9d9;
      }
      .tw-suffix-icon {
        border-radius: 50%;
        right: 15px;
        padding: 2px;
        color: #ffffff;
        background-color: #d9d9d9;
        transform: translate(50%, -50%);
        cursor: pointer;
        &:hover {
          background-color: #aaaaaa;
        }
      }
    }
    &-box {
      width: 100%;
      height: 31px;
      padding: 0 30px;
      border: none;
      border-bottom: 1px solid #666666;
      box-sizing: border-box;
      outline: none;
      line-height: 31px;
      font-size: 16px;
      color: #999;
      transition: all 0.4s ease;
      &:focus {
        border-bottom: 1px solid $color;
        color: #333333;
      }
    }
    &-text {
      font-size: 16px;
      color: $color;
    }
    &-prompt {
      padding-top: 20px;
      font-size: 12px;
    }
  }
  &-box {
    overflow-y: hidden;
    width: 730px;
    height: calc(100% - 31px);
    padding-top: 20px;

    &.filter {
      height: calc(100% - 67px);
    }
  }
  &-group {
    float: left;
    width: calc(33.333333% - 10px);
    margin-right: 10px;
    &-item {
      margin-bottom: 30px;
      &-header {
        height: 40px;
        padding: 0 10px;
        /*border-bottom: 1px solid #e5e5e5;*/
        line-height: 40px;
        font-size: 14px;
        font-weight: 600;
        color: #000000;
      }
      &-body {
        &-item {
          cursor: pointer;
          &:hover {
            background-color: #f0f0f0;
            background-color: rgba(0, 0, 0, 0.06);
          }
          .tw-menu-link {
            display: block;
            overflow: hidden;
            height: 30px;
            padding: 0 10px;
            line-height: 30px;
            font-size: 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #000;
            opacity: 0.65;
          }
        }
      }
    }
  }
  &-system {
    &-bar {
      position: absolute;
      top: 120px;
      left: 770px;
      border-left: 2px solid rgba(229, 229, 229, 0.03);
      border-left: 2px solid rgba(0, 0, 0, 0.1);
    }
    &-item {
      overflow: hidden;
      max-width: 160px;
      height: 32px;
      padding-left: 10px;
      line-height: 32px;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      transition: color 0.2s ease;
      &:hover {
        margin-left: -2px;
        border-left: 2px solid #408ab4;
        font-weight: 700;
        color: #408ab4;
      }
    }
  }
}
</style>