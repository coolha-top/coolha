'use client'

import { config } from '@/config/Wagmi'
import { useAccount, useBalance } from 'wagmi'
export default function token() {
    const account = useAccount()
    const result = useBalance({
        address: '0xcd284038f2e68c6a43b04695f84377f38686ee56',
        
      })
      const formattedBalance = result.data?.formatted || 'No balance available';
      const formattedWithFourDecimals =
        typeof formattedBalance === 'string' && formattedBalance!== 'No balance available'
         ? parseFloat(formattedBalance).toFixed(4)
          : formattedBalance;
   return (
     <div>
    {formattedWithFourDecimals}
    {result.data?.symbol || 'No balance available'}
    
     </div>
   )
}