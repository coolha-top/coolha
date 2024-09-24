'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  // 在组件加载时进行重定向
  router.push('/home');

  return null;
}