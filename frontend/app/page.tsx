'use client'
import * as React from 'react'
import { getContract } from 'viem' 
import { lockAbi } from './lib/evm/generated'
import { useClient, useConnectorClient } from 'wagmi'

export default function Home() {
  const publicClient = useClient()
  const walletClient = useConnectorClient()

  // console.log(walletClient)
  const contract = getContract({
    address: '0x0165878a594ca255338adfa4d48449f69242eb8f',
    abi: lockAbi,
    client: { public: publicClient!, wallet: walletClient }
  })


  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    await contract.read.withdraw()
    console.log('success')
  } 

  return (
    <form onSubmit={submit}>
      <button type="submit">{'Send'}</button>
    </form>
  )
}