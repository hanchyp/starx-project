"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { tokenABI } from "@/abi/token";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { client, chain } from "@/app/client";

export default function SetRewardPage() {
  const { tokenAddress } = useParams<{ tokenAddress: string }>();
  const account = useActiveAccount();

  const [minPurchase, setMinPurchase] = useState("");
  const [minHold, setMinHold] = useState("");
  const [minHoldDays, setMinHoldDays] = useState("");
  const [uriPurchase, setUriPurchase] = useState("");
  const [uriHold, setUriHold] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetReward = async () => {
    if (!tokenAddress || !account) return;

    try {
      setLoading(true);
      const contract = getContract({
        address: tokenAddress,
        abi: tokenABI,
        client,
        chain,
      });

      const holdDurationInDays = BigInt(minHoldDays);
      const holdDurationInSeconds = holdDurationInDays * 86400n;

      const call = prepareContractCall({
        contract,
        method: "setRewardConditions",
        params: [
          BigInt(minPurchase),
          BigInt(minHold),
          holdDurationInSeconds,
          uriPurchase,
          uriHold,
        ],
      });

      await sendTransaction({ account, transaction: call });
      alert("Reward conditions updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to set reward conditions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Set Reward Conditions</h1>

      <div className="space-y-2">
        <Label>Minimum Token Purchase</Label>
        <Input
          value={minPurchase}
          onChange={(e) => setMinPurchase(e.target.value)}
          placeholder="1000"
        />
      </div>

      <div className="space-y-2">
        <Label>Minimum Token Hold</Label>
        <Input
          value={minHold}
          onChange={(e) => setMinHold(e.target.value)}
          placeholder="5000"
        />
      </div>

      <div className="space-y-2">
        <Label>Minimum Hold Duration (days)</Label>
        <Input
          value={minHoldDays}
          onChange={(e) => setMinHoldDays(e.target.value)}
          placeholder="30"
        />
      </div>

      <div className="space-y-2">
        <Label>Purchase Reward URI</Label>
        <Input
          value={uriPurchase}
          onChange={(e) => setUriPurchase(e.target.value)}
          placeholder="CID"
        />
      </div>

      <div className="space-y-2">
        <Label>Hold Reward URI</Label>
        <Input
          value={uriHold}
          onChange={(e) => setUriHold(e.target.value)}
          placeholder="CID"
        />
      </div>

      <Button onClick={handleSetReward} disabled={loading}>
        {loading ? "Submitting..." : "Set Reward"}
      </Button>
    </div>
  );
}
