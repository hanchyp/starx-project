"use client";

import { useState } from "react";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { FACTORY_ADDRESS } from "@/constants";
import { factoryABI } from "@/abi/factory";
import { useActiveAccount } from "thirdweb/react";
import { client } from "@/app/client";
import { localhost } from "thirdweb/chains";
import { Button } from "@/components/ui/button";

export function CreateTokenButton() {
  const account = useActiveAccount();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!account) {
      setError("Wallet belum terhubung.");
      return;
    }

    setIsCreating(true);
    setError(null);
    setSuccess(null);

    try {
      const factory = getContract({
        client,
        address: FACTORY_ADDRESS,
        abi: factoryABI,
        chain: localhost,
      });

      const transaction = prepareContractCall({
        contract: factory,
        method: "createStarxToken",
        params: ["MyToken", "MTK", BigInt(1_000_000e18), BigInt(1e16)],
      });

      // 3. Kirim transaksi
      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      console.log("Transaksi dikirim:", transactionHash);
      setSuccess("Token berhasil dibuat! Kamu sekarang artist.");
    } catch (err) {
      console.error(err);
      setError("Gagal membuat token.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleCreate} disabled={isCreating}>
        {isCreating ? "Memproses..." : "Daftar sebagai Artist"}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
    </div>
  );
}
