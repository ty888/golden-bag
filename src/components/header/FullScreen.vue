<template>
  <div @click="handleChange" v-if="showFullScreenBtn">
    <el-tooltip effect="dark" :content="value ? '退出全屏' : '全屏'" placement="bottom">
      <icon :type="value ? 'contract' : 'expand'" size="26"/>
    </el-tooltip>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'fullScreen',
  components: {
    Icon,
  },
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed: {
    showFullScreenBtn() {
      return window.navigator.userAgent.indexOf('MSIE') < 0;
    },
  },
  methods: {
    handleFullscreen() {
      const main = document.body;
      if (this.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else if (main.requestFullscreen) {
        main.requestFullscreen();
      } else if (main.mozRequestFullScreen) {
        main.mozRequestFullScreen();
      } else if (main.webkitRequestFullScreen) {
        main.webkitRequestFullScreen();
      } else if (main.msRequestFullscreen) {
        main.msRequestFullscreen();
      }
    },
    handleChange() {
      this.handleFullscreen();
    },
  },
  created() {
    let isFullscreen =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;
    isFullscreen = !!isFullscreen;
    document.addEventListener('fullscreenchange', () => {
      this.$emit('input', !this.value);
      this.$emit('on-change', !this.value);
    });
    document.addEventListener('mozfullscreenchange', () => {
      this.$emit('input', !this.value);
      this.$emit('on-change', !this.value);
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.$emit('input', !this.value);
      this.$emit('on-change', !this.value);
    });
    document.addEventListener('msfullscreenchange', () => {
      this.$emit('input', !this.value);
      this.$emit('on-change', !this.value);
    });
    this.$emit('input', isFullscreen);
  },
};
</script>
