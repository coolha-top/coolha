'use client'
import { Erc20, useCurrencies } from '@lens-protocol/react-web';
import { config } from '@/config/Wagmi'
import { useAccount, useBalance, useReadContract } from 'wagmi'


export default function token() {
  const { isConnected, address } = useAccount({ config });

  const { data: currencies, error, loading } = useCurrencies();

  const result = useBalance({
    address: address as `0x${string}`,
    token: `0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359`
  })


  const formattedBalance = result.data?.decimals || '没有可用余额';
  const formattedWithFourDecimals =
    typeof formattedBalance === 'string' && formattedBalance !== '没有可用余额'
      ? parseFloat(formattedBalance).toFixed(4)
      : formattedBalance;



  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error listing currencies: {error.message}</p>;
  return (
    <div>
      {isConnected ? <p className='btn'>余额: {formattedWithFourDecimals} {result.data?.symbol || `未连接`}</p> : <>未连接</>}


      <div className="overflow-x-auto bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>代币</th>
              <th>合约地址</th>
              <th>余额</th>
            </tr>
          </thead>
          <tbody className=''>
            {currencies.map((currency: Erc20) => (
              <tr key={currency.address} className="hover">
                <td>{currency.symbol}</td>
                <td>{currency.address}</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



    </div>
  )
}