'use client'

import { LensConfig, production ,LensProvider} from '@lens-protocol/react-web';
import { bindings } from '@lens-protocol/wagmi';
import { config } from './Wagmi';
const lensConfig: LensConfig = {
  bindings: bindings(config),
  environment: production,
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