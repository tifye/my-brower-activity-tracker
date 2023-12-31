import bakedEnv from 'rollup-plugin-baked-env';
import 'dotenv/config';

export default {
  input: 'src/background/index.js',
  output: {
    file: 'dist/background.js',
    format: 'esm'
  },
  plugins: [
    bakedEnv()
  ]
};