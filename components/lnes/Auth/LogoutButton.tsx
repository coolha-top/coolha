'use client';
import { useLogout } from "@lens-protocol/react-web";

export function LogoutButton() {

  const { execute } = useLogout();

  return <button className='btn btn-info' onClick={() => execute()}>退出账户</button>;

}