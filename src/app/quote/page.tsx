"use client";
import { QuoteCardSkeleton } from "@/components/QuoteCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef, useState } from "react";

const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
const options = { method: "GET", headers: { accept: "application/json" } };

interface QuoteType {
  author: string;
  content: string;
  tags: string[];
}
export default function QuotePage() {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchQuote = async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal,
      });
      const data = await response.json();
      const quoteData = data.data as QuoteType;
      console.log("Quote Data >>>> ", data);
      setQuote(quoteData);
    } catch (error: any) {
      if (error.name === "AbortError") {
        setError(true);
        console.log("Abort Error");
      }
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col gap-6 justify-center items-center">
        <Button onClick={fetchQuote}>Fetch A Randon Quote</Button>
        {error ? (
          <p className="text-red-500">
            Failed to load data. Please reload the page.
          </p>
        ) : quote === null ? (
          <p>Click the button above to get a quote</p>
        ) : isLoading ? (
          <QuoteCardSkeleton />
        ) : (
          <>
            <Card className="max-w-[400px]">
              <CardHeader>
                <CardTitle className="flex justify-start items-center gap-2 mb-2">
                  {quote?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-400 text-xs p-2 shadow-sm rounded-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </CardTitle>
                <CardContent className="text-lg font-medium">
                  {quote?.content}
                </CardContent>
                <div className="flex justify-end items-center">
                  <CardFooter> - {quote?.author}</CardFooter>
                </div>
              </CardHeader>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
