"use client";

import { useEffect } from "react";
import { rememberInterest } from "@/Lib/storage";

export function RememberInterest({ slug }: { slug: string }) {
  useEffect(() => {
    rememberInterest(slug);
  }, [slug]);
  return null;
}
