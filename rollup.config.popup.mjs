import bakedEnv from 'rollup-plugin-baked-env';
import 'dotenv/config';

export default {
  input: 'src/popup/public/pupup.js',
  output: {
    file: 'dist/popup.js',
    format: 'esm'
  },
  plugins: [
    bakedEnv()
  ]
};