import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

const input = ["src/index.ts"];

export default [
  {
    // UMD
    input,
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      nodeResolve(),
      babel({
        babelHelpers: "bundled",
      }),
      terser(),
    ],
    output: {
      file: `dist/${pkg.name}.min.js`,
      format: "umd",
      name: "myLibrary", // this is the name of the global object
      esModule: false,
      exports: "named",
      sourcemap: true,
    },
  },
// ESM and CJS
  {
    input,
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      nodeResolve(),
      babel({
        babelHelpers: "bundled",
      }),
      terser(),
    ],
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
      },
    ],
  },
];
