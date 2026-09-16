import { defineConfig } from 'vitest/config';
import { createRequire } from 'node:module';
const appRequire=createRequire(new URL('../../apps/web/package.json',import.meta.url));
export default defineConfig({
  esbuild:{jsx:'automatic'},
  resolve:{alias:[
    {find:/^react$/,replacement:appRequire.resolve('react')},
    {find:/^react\/jsx-runtime$/,replacement:appRequire.resolve('react/jsx-runtime')},
    {find:/^react-dom\/server$/,replacement:appRequire.resolve('react-dom/server')}
  ]},
  test:{environment:'node',include:['tests/component/marketing-navigation.test.tsx'],passWithNoTests:false}
});
