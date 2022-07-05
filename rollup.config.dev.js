import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import AutoImport from 'unplugin-auto-import/rollup'
import commonjs from '@rollup/plugin-commonjs'

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
    AutoImport({
      imports: ['vue'],
    }),
    typescript(),
    nodeResolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    livereload(),
    serve({
      port: 3003,
      contentBase: ''
    })],
  external: [  //外部库， 使用'umd'文件时需要先引入这个外部库
    'lodash'
  ],
}