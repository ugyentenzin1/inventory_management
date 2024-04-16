const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');


//tailwind config import 
const breakpoints = require('./apps/inv/src/assets/tailwind-config/breakpoints');
import {spacingValues} from './apps/inv/src/assets/tailwind-config/unit-conversion.ts';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'apps/inv/src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      ...breakpoints
    },
    spacing: spacingValues,
    extend: {},
  },
  plugins: [
    require('./apps/inv/src/assets/tailwind-config/custom-flex'),
    require('./apps/inv/src/assets/tailwind-config/typography')
  ],
}

