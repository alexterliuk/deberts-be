import typescript from 'rollup-plugin-typescript2';
const tsconfigESNext = { compilerOptions: { module: 'esnext' } };

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      name: 'deberts',
      file: 'dist/deberts.bundle.umd.js',
      format: 'umd',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: tsconfigESNext,
      }),
    ],
  },
];
