import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import path from 'path';
import dts from 'vite-plugin-dts'
import preserveDirectives from 'rollup-preserve-directives';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        utils: resolve(__dirname, 'src/utils/index.ts'),
        hooks: resolve(__dirname, 'src/hooks/index.ts')
      },
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        /^react(\/.*)?$/,
        /^react-dom(\/.*)?$/,
        'classnames',
        /^next(\/.*)?$/,
        /^dayjs(\/.*)?$/,
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
          classnames: 'classNames',
          next: 'next',
          dayjs: 'dayjs'
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
  // 로컬에서 storybook 개발 시 process 못찾는 ReferenceError가 발생해서 추가
  define: {
    'process.env': {},
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true
    }),
    viteStaticCopy({
      targets: [
        {
          src: "./src/styles/common.module.scss",
          dest: "./",
        },
      ],
    }),
    preserveDirectives() // https://github.com/vitejs/vite/discussions/15721
  ]
});