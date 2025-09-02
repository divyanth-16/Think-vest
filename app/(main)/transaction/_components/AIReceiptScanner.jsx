"use client";

import { useRef, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export default function AIReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    await scanReceiptFn(file);
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }
  }, [scanReceiptLoading, scannedData]);

  return (
    <div className="flex items-center justify-center w-full">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />

      <button
        type="button"
        className="w-full h-10 flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #f97316, #ec4899, #8b5cf6)",
          color: "white",
          border: "none",
          cursor: scanReceiptLoading ? "not-allowed" : "pointer",
        }}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            <span>Scanning Receipt...</span>
          </>
        ) : (
          <>
            <Camera className="w-4 h-4" />
            <span>Scan Receipt with AI</span>
          </>
        )}
      </button>
    </div>
  );
}