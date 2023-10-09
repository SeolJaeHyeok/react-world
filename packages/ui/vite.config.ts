import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        dts({
            // .d 파일 생성 디렉토리 지정
            include: ['lib'],
        }),
    ],
    build: {
        // public 디렉토리를 dist 폴더에 복사하는 옵션
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            formats: ['es'],
            name: '@ui/atoms',
            fileName: format => `@ui-atoms.${format}.js`,
        },
    },
});
