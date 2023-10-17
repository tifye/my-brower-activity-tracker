import bakedEnv from 'rollup-plugin-baked-env';
import 'dotenv/config';

export default {
  input: 'src/background.js',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [
    bakedEnv()
  ]
};