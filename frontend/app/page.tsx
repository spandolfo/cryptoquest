'use client'

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";

import { soulAbi } from './lib/evm/generated'

import { stringify } from "viem";

export const wagmiContractConfig = {
  address: '0x5fc8d32690cc91d4c39d9d3abcbd16989f875707' as `0x${string}`,
  abi: soulAbi,
}

export default function Home() {
  const [tokenId, setTokenId] = useState<string>("");
  const { chain } = useAccount();

  const { data, error, isPending, isError, writeContract } = useWriteContract();
  const {
    data: receipt,
    isLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  return (
    <div>
      <div>Mint a wagmi:</div>
      <div>
        <input
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="token id"
          value={tokenId}
        />
        <button
          disabled={isPending}
          onClick={() =>
            writeContract({
              ...wagmiContractConfig,
              functionName: "safeMint",
              args: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', "test"+tokenId],
            })
          }
        >
          Mint
        </button>
      </div>
      {isPending && <div>Pending...</div>}
      {isSuccess && (
        <>
          <a
            target="__blank"
            href={`${chain?.blockExplorers?.default?.url}/tx/${data}`}
          >
            Transaction Hash: {data}
          </a>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{error?.message}</div>}
    </div>
  );
}


