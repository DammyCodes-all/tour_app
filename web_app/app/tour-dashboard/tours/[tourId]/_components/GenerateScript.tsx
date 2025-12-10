"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Code } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GenerateScriptProps {
  tourId: string;
  stepsCount: number;
}

export const GenerateScript = ({ tourId, stepsCount }: GenerateScriptProps) => {
  const [script, setScript] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const canGenerate = stepsCount >= 5;

  useEffect(() => {
    if (stepsCount < 5) {
      setScript(null);
    }
  }, [stepsCount]);

  const handleGenerate = () => {
    const generatedScript = `<script src="https://noebaxzcqhhsnzzlclqg.supabase.co/storage/v1/object/public/tourify/v1/widget.iife.js" data-tour-id="${tourId}"></script>`;
    setScript(generatedScript);
  };

  const handleCopy = () => {
    if (!script) return;
    navigator.clipboard.writeText(script);
    setIsCopied(true);
    toast.success("Script copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Generate Tour Script</CardTitle>
      </CardHeader>
      <CardContent>
        {!script ? (
          <div className="flex flex-col items-start gap-4">
             <Button
                onClick={handleGenerate}
                disabled={!canGenerate}
                aria-label="Generate script for the tour"
             >
                <Code className="mr-2 h-4 w-4" />
                Generate Script
            </Button>
            {!canGenerate && (
                <p className="text-sm text-muted-foreground">
                    You need at least 5 steps to generate the script. You currently have {stepsCount}.
                </p>
            )}
          </div>

        ) : (
          <div className="space-y-4">
            <p>
              Copy the script below and paste it into the &lt;head&gt; or &lt;body&gt; of your website.
            </p>
            <div className="flex items-center space-x-2">
              <Input readOnly value={script} />
              <Button onClick={handleCopy} size="icon" aria-label="Copy script to clipboard">
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
