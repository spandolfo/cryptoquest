'use client'
import * as React from 'react'
import { 
  type BaseError, 
  useSendTransaction, 
  useWaitForTransactionReceipt 
} from 'wagmi' 
import { parseEther, getContract } from 'viem' 
import { tokenAbi } from './lib/generated'
import { useClient, useConnectorClient } from 'wagmi'
import { hardhat } from 'viem/chains'

import { type UseWalletClientReturnType } from 'wagmi'

import { type Client } from 'viem'


export default function Home() {
  const { 
    data: hash,
    error, 
    isPending, 
    sendTransaction 
  } = useSendTransaction() 
  const publicClient = useClient()
  const walletClient = useConnectorClient()

  // console.log(walletClient)
  const contract = getContract({
    address: '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0',
    abi: tokenAbi,
    client: { public: publicClient!, wallet: walletClient }
  })


  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    // sendTransaction({ to, value: parseEther(value) }) 
    // console.log(await contract.read.totalSupply())
    
    // console.log(contract)

  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Send'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>} 
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      {error && ( 
        <div>Error: {(error as BaseError).shortMessage || error.message}</div> 
      )} 
    </form>
  )
}