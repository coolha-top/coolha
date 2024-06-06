'use client'

import { LensConfig, staging ,LensProvider} from '@lens-protocol/react-web';
import { bindings  } from '@lens-protocol/wagmi';
import { config } from './Wagmi';
const lensConfig: LensConfig = {
  bindings: bindings(config),
  environment: staging,
};

export function Lens({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LensProvider config={lensConfig}>
      {children}
    </LensProvider>
  );
}