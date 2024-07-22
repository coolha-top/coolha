'use client'
 
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
export default function Page() {
  const router = useRouter()
  redirect(`/home`)
}