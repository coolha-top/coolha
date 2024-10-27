'use client'


import { LensConfig, production, LensProvider, development } from '@lens-protocol/react-web';
import { bindings } from '@lens-protocol/wagmi';
import { config } from './Wagmi';


export const lensConfig: LensConfig = {
  environment: production,
  bindings: bindings(config),
/*   params: {
    profile: {
      metadataSource: 'coolha'
    }
  } */
};


