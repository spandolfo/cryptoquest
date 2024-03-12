'use client'

import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { BaseError } from 'viem';

import { type Address } from "viem";

import { soulAbi } from '../lib/evm/generated'

export const wagmiContractConfig = {
  address: '0x5fc8d32690cc91d4c39d9d3abcbd16989f875707' as `0x${string}`,
  abi: soulAbi,
}

export default function ReadContract() {
  return (
    <div>
      <div>
        <TotalSupply />
      </div>
    </div>
  );
}

const TotalSupply = () => {
  const { data, isRefetching, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'totalSupply',
  });

  return (
    <div>
      Total Supply: {data?.toString()}
      <button disabled={isRefetching} onClick={() => refetch()} style={{ marginLeft: 4 }}>
        {isRefetching ? '(loading...)' : '(refetch)'}
      </button>
    </div>
  );
};

