'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Terminal, Play, Loader2, Code2, RefreshCw } from 'lucide-react';

const defaultCode = `import numpy as np

# A simple simulated Neural Network forward pass
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# Input data
x = np.array([0.5, -0.2, 0.1])

# Weights and biases
w = np.array([0.4, 0.3, -0.5])
b = 0.1

# Forward pass
z = np.dot(w, x) + b
a = sigmoid(z)

print(f"Input: {x}")
print(f"Raw Output (z): {z:.4f}")
print(f"Activation (a): {a:.4f}")
`;

declare global {
    interface Window {
        loadPyodide: (options: { indexURL: string }) => Promise<any>;
    }
}

export default function SandboxPage() {
    const [code, setCode] = useState(defaultCode);
    const [output, setOutput] = useState<string>('');
    const [isPyodideLoading, setIsPyodideLoading] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const pyodideRef = useRef<any>(null);

    useEffect(() => {
        // Load Pyodide script dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
        script.async = true;
        script.onload = async () => {
            try {
                pyodideRef.current = await window.loadPyodide({
                    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
                });

                // Load popular packages by default
                await pyodideRef.current.loadPackage(['numpy']);

                // Redirect stdout to our state
                pyodideRef.current.setStdout({
                    batched: (str: string) => {
                        setOutput(prev => prev + str + '\\n');
                    }
                });

                setIsPyodideLoading(false);
            } catch (err) {
                console.error('Failed to load Pyodide', err);
                setOutput('Error: Failed to initialize Python environment.\\n' + String(err));
                setIsPyodideLoading(false);
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const runCode = async () => {
        if (!pyodideRef.current || isRunning) return;

        setIsRunning(true);
        setOutput(''); // Clear previous output

        try {
            await pyodideRef.current.runPythonAsync(code);
        } catch (err) {
            setOutput(prev => prev + '\\nError:\\n' + String(err));
        } finally {
            setIsRunning(false);
        }
    };

    const resetCode = () => {
        setCode(defaultCode);
        setOutput('');
    };

    return (
        <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-10 h-[calc(100vh-6rem)]">
            <div>
                <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
                    <Terminal className="h-8 w-8 text-primary" />
                    Coding Sandbox
                </h1>
                <p className="text-muted-foreground mt-2">
                    Write and run Python code right in your browser. Powered by Pyodide (WASM).
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">

                {/* Editor Area */}
                <Card className="flex flex-col border-primary/20 h-full overflow-hidden">
                    <CardHeader className="py-3 px-4 bg-muted/50 border-b flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            main.py
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetCode} title="Reset Code">
                            <RefreshCw className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 relative">
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-full p-4 font-mono text-sm bg-background resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground selection:bg-primary/30"
                            spellCheck="false"
                            placeholder="Write your Python code here..."
                        />
                    </CardContent>
                    <div className="p-4 border-t bg-card/50 flex justify-end">
                        <Button
                            onClick={runCode}
                            disabled={isPyodideLoading || isRunning}
                            className="gap-2 w-32"
                        >
                            {isPyodideLoading ? (
                                <><Loader2 className="h-4 w-4 animate-spin" /> Loading...</>
                            ) : isRunning ? (
                                <><Loader2 className="h-4 w-4 animate-spin" /> Running...</>
                            ) : (
                                <><Play className="h-4 w-4 fill-current" /> Run Code</>
                            )}
                        </Button>
                    </div>
                </Card>

                {/* Output Area */}
                <Card className="flex flex-col bg-slate-950 border-slate-800 text-slate-300 h-full overflow-hidden">
                    <CardHeader className="py-3 px-4 border-b border-slate-800/50">
                        <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                            <Terminal className="h-4 w-4" />
                            Terminal Output
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 flex-1 overflow-auto font-mono text-sm whitespace-pre-wrap">
                        {output || <span className="text-slate-600 italic">No output yet. Run your code to see results here.</span>}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
