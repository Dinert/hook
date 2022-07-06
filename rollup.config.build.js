import typescript from '@rollup/plugin-typescript'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import AutoImport from 'unplugin-auto-import/rollup'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'



const env = process.env.NODE_ENV

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'dinert-hook',
      sourcemap: true,
      globals: {
        vue: 'Vue',
        _: 'lodash'
      }
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    typescript(),
    nodeResolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    terser()
  ],
  external: [  //外部库， 使用'umd'文件时需要先引入这个外部库
    'vue',
    'lodash'
  ],
}