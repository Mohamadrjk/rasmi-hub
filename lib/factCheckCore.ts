/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/factCheckCore.ts
import { pipeline } from "@xenova/transformers";

// بارگذاری یک بار در حافظه
let classifier: any;

export async function classifyClaim(text: string): Promise<string> {
  if (!classifier) {
    classifier = await pipeline(
      "text-classification",
      "Xenova/bert-base-multilingual-cased"
    );
  }

  const result = await classifier(text);

  const label = result[0].label;
  if (label.includes("positive")) return "اقتصاد";
  if (label.includes("neutral")) return "سلامت";
  return "عمومی";
}
