import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ffxiv-book-router',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy:[
        {
          src:'assets'
        },
        {
          src:'index.css'
        }
      ]
    },
    
  ],
};
