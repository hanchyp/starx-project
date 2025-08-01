"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { tokenABI } from "@/abi/token";
import { useActiveAccount } from "thirdweb/react";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { client, chain } from "@/app/client";

export default function SetRewardForm() {
  const { tokenAddress } = useParams();
  const account = useActiveAccount();

  const [minPurchase, setMinPurchase] = useState("");
  const [minHoldAmount, setMinHoldAmount] = useState("");
  const [minHoldDuration, setMinHoldDuration] = useState("");
  const [purchaseURI, setPurchaseURI] = useState("");
  const [holdURI, setHoldURI] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!account || typeof tokenAddress !== "string") return;
    setLoading(true);

    try {
      const contract = getContract({
        client,
        chain,
        address: tokenAddress,
        abi: tokenABI,
      });

      const tx = prepareContractCall({
        contract,
        method: "setRewardConditions",
        params: [
          BigInt(minPurchase),
          BigInt(minHoldAmount),
          BigInt(minHoldDuration),
          purchaseURI,
          holdURI,
        ],
      });

      await sendTransaction({ account, transaction: tx });
      alert("Reward condition updated successfully!");
    } catch (err) {
      console.error("Error setting reward:", err);
      alert("Failed to set reward conditions.");
    } finally {
      setLoading(false);
    }
  };

  if (!tokenAddress) return <p>Invalid token address.</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Reward Conditions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Min Purchase (token)</Label>
          <Input
            type="number"
            value={minPurchase}
            onChange={(e) => setMinPurchase(e.target.value)}
          />
        </div>
        <div>
          <Label>Min Hold Amount (token)</Label>
          <Input
            type="number"
            value={minHoldAmount}
            onChange={(e) => setMinHoldAmount(e.target.value)}
          />
        </div>
        <div>
          <Label>Min Hold Duration (seconds)</Label>
          <Input
            type="number"
            value={minHoldDuration}
            onChange={(e) => setMinHoldDuration(e.target.value)}
          />
        </div>
        <div>
          <Label>Purchase Reward URI</Label>
          <Input
            type="text"
            value={purchaseURI}
            onChange={(e) => setPurchaseURI(e.target.value)}
          />
        </div>
        <div>
          <Label>Hold Reward URI</Label>
          <Input
            type="text"
            value={holdURI}
            onChange={(e) => setHoldURI(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Set Rewards"}
        </Button>
      </CardContent>
    </Card>
  );
}
