<template>
  <div></div>
</template>

<script>
  export default{
    data() {
      return {
      }
    },
    created () {
      this.checkApp()
    },
    mounted () {
    },
    beforeDestroy () {

    },
    computed: {

    },
    methods: {
      checkApp(){
        const os = this.getOS()
        if (os == 'iOS'  || os == 'Android') {
            const type = this.$route.query.type;
            const mgmtNmbr = this.$route.query.mgmtNmbr
            const url='hiblocks://hispace/'+type+'/'+mgmtNmbr
            this.goUrl(url)
        }else{
          window.location='/kr'
        }
      },
      getOS() {
        let userAgent = window.navigator.userAgent
        let platform = window.navigator.platform
        let macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
        let windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
        let iosPlatforms = ['iPhone', 'iPad', 'iPod']
        let os = null
        if (macosPlatforms.indexOf(platform) !== -1) {
          os = 'Mac OS'
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          os = 'iOS'
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = 'Windows'
        } else if (/Android/.test(userAgent)) {
          os = 'Android'
        } else if (!os && /Linux/.test(platform)) {
          os = 'Linux'
        } else {
          os = 'other'
        }
        return os
      },
      goUrl(url) {
          window.location = url
          setTimeout(function () {
              window.location='/kr'
            //추후 마켓 주소 확인 후 포워딩
          },100)
      },
    },
    metaInfo () {
      return {
        title : 'hiblocks share',
        meta: [
          {property: 'og:image', content: 'https://userapitest.hiblocks.io/common/imageProc?id='+this.$route.query.thnl+'&size=880'},
        ]
      }
    }
  }
</script>