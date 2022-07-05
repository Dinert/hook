
 import _ from 'lodash'
 import {onMounted, onUnmounted} from 'vue'
  
 /**
  *  监听浏览器缩放，使用防抖函数做触发次数太多的处理
  * @param resize 监听完成执行的函数
  * @param delay 
  * @param immediate 
  */
  const useWindowResize = (resize: Function, delay: number, immediate: _.DebounceSettingsLeading) => {
   const onResize = () => {
     resize()
   }
   onMounted(() => {
     onResize()  // 手动触发一次
     window.addEventListener('resize', _.debounce(onResize, delay, immediate))
   })
 
   onUnmounted(() => {
     window.removeEventListener('resize', _.debounce(onResize, delay, immediate))
   })
 }
 
 export default useWindowResize
