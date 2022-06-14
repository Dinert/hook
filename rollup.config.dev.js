import typescript from '@rollup/plugin-typescript'
import pak from './package.json'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pak.module,
      format: 'esm',
      name: 'dinertHook',

    },
    {
      file: pak.main,
      format: 'cjs',
      name: 'dinertHook'
    },
    {
      file: pak.browser,
      format: 'umd',
      name: 'dinertHook',
      globals: {
        _: 'lodash',
        vue: 'Vue'
      }
    },
  ],
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
    livereload(), 
    serve({
      port: 3003,
      contentBase: ''
  }),],
  external: [  //外部库， 使用'umd'文件时需要先引入这个外部库
  'lodash'
  ],
}