import path from 'path';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

export default {
  input: path.resolve(__dirname, 'src/index.ts'),
  output: {
    file: path.resolve(__dirname, 'lib/build.js'),
    format: 'cjs',
  },
  plugins: [
    copy({
      targets: [
        {
          src: path.resolve(__dirname, 'src/internals/template/index.html'),
          dest: path.resolve(__dirname, 'lib/template'),
        },
      ],
    }),
    json(),
    commonjs(),
    typescript(),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules/**',
    }),
  ],
};
