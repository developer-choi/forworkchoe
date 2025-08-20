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
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [/^react(\/.*)?$/, /^react-dom(\/.*)?$/, 'classnames'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
          classnames: 'classNames'
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
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