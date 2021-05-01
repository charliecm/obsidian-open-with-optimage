import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const isProd = (process.env.BUILD === 'production');

export default {
  input: 'main.ts',
  output: {
    dir: '.',
    sourcemap: isProd ? false : 'inline',
    sourcemapExcludeSources: isProd,
    format: 'cjs',
    exports: 'default',
  },
  external: ['obsidian', 'path', 'fs', 'os', 'child_process'],
  plugins: [
    typescript(),
    nodeResolve({browser: true}),
    commonjs(),
  ]
};