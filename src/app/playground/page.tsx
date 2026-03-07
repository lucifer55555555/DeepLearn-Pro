'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Settings2, Activity, Network } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

export default function PlaygroundPage() {
    const [learningRate, setLearningRate] = useState([0.1]);
    const [hiddenLayers, setHiddenLayers] = useState([2]);
    const [epochs, setEpochs] = useState([50]);
    const [isTraining, setIsTraining] = useState(false);
    const [currentEpoch, setCurrentEpoch] = useState(0);
    const [lossHistory, setLossHistory] = useState<{ epoch: number; loss: number }[]>([]);
    const animationRef = useRef<number>();

    // Reset when hyperparams change
    useEffect(() => {
        if (!isTraining) {
            setLossHistory([]);
            setCurrentEpoch(0);
        }
    }, [learningRate, hiddenLayers, epochs, isTraining]);

    // Simulated Training Loop
    useEffect(() => {
        if (isTraining) {
            if (currentEpoch >= epochs[0]) {
                setIsTraining(false);
                return;
            }

            // Simulate a training step
            // The loss curve is a decayed exponential formula influenced by learning rate and capacity (layers)
            const baseLoss = 2.0;
            const decayFactor = 0.05 * (learningRate[0] / 0.1) * (1 + hiddenLayers[0] * 0.2);
            const noise = (Math.random() - 0.5) * 0.1 * Math.exp(-currentEpoch * 0.05);

            const newLoss = Math.max(0.01, baseLoss * Math.exp(-currentEpoch * decayFactor) + noise);

            animationRef.current = window.setTimeout(() => {
                setLossHistory(prev => [...prev.slice(-49), { epoch: currentEpoch, loss: newLoss }]);
                setCurrentEpoch(prev => prev + 1);
            }, 50); // 50ms per Simulated epoch
        }

        return () => {
            if (animationRef.current) clearTimeout(animationRef.current);
        };
    }, [isTraining, currentEpoch, epochs, learningRate, hiddenLayers]);

    const toggleTraining = () => setIsTraining(!isTraining);

    // Generate Neural Network visualization nodes
    const networkNodes = useMemo(() => {
        const layers = [3, ...Array(hiddenLayers[0]).fill(4), 2]; // 3 inputs, N hidden layers of width 4, 2 outputs
        return layers;
    }, [hiddenLayers]);

    return (
        <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-10">
            <div>
                <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
                    <Network className="h-8 w-8 text-primary" />
                    Neural Network Playground
                </h1>
                <p className="text-muted-foreground mt-2">
                    Experiment with hyperparameters and watch the simulated training process in real-time.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Controls Sidebar */}
                <Card className="flex flex-col bg-card/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings2 className="h-5 w-5" />
                            Hyperparameters
                        </CardTitle>
                        <CardDescription>Adjust the knobs to see how they impact learning.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 flex-1">

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Learning Rate</label>
                                <Badge variant="outline" className="font-mono">{learningRate[0]}</Badge>
                            </div>
                            <Slider
                                min={0.001} max={0.5} step={0.001}
                                value={learningRate} onValueChange={setLearningRate}
                                disabled={isTraining}
                                className="[&_[role=slider]]:bg-primary"
                            />
                            <p className="text-xs text-muted-foreground">Controls how much the model learns from each mistake.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Hidden Layers</label>
                                <Badge variant="outline" className="font-mono">{hiddenLayers[0]}</Badge>
                            </div>
                            <Slider
                                min={1} max={5} step={1}
                                value={hiddenLayers} onValueChange={setHiddenLayers}
                                disabled={isTraining}
                                className="[&_[role=slider]]:bg-primary"
                            />
                            <p className="text-xs text-muted-foreground">Model capacity. More layers = deeper network.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Max Epochs</label>
                                <Badge variant="outline" className="font-mono">{epochs[0]}</Badge>
                            </div>
                            <Slider
                                min={10} max={200} step={10}
                                value={epochs} onValueChange={setEpochs}
                                disabled={isTraining}
                                className="[&_[role=slider]]:bg-primary"
                            />
                            <p className="text-xs text-muted-foreground">How many times the model sees the entire dataset.</p>
                        </div>

                    </CardContent>
                    <CardFooter className="pt-6 border-t bg-card/80">
                        <Button
                            className="w-full gap-2 transition-all"
                            size="lg"
                            variant={isTraining ? "destructive" : "default"}
                            onClick={toggleTraining}
                        >
                            {isTraining ? (
                                <><Square className="h-4 w-4 fill-current" /> Stop Training</>
                            ) : (
                                <><Play className="h-4 w-4 fill-current" /> {currentEpoch === 0 ? 'Start Training' : 'Resume Training'}</>
                            )}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Visualization Area */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Live Loss Chart */}
                    <Card className="flex flex-col">
                        <CardHeader className="py-4 border-b">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    Training Loss Curve
                                </CardTitle>
                                <Badge variant={isTraining ? "default" : "secondary"} className="transition-colors">
                                    {isTraining ? 'Training Active...' : 'Idle'} • Epoch: {currentEpoch}/{epochs[0]}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 h-[250px]">
                            {lossHistory.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={lossHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis dataKey="epoch" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis domain={['auto', 'auto']} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                                            itemStyle={{ color: 'hsl(var(--primary))' }}
                                            labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="loss"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={2}
                                            dot={false}
                                            isAnimationActive={false} // Disable recharts animation to show pure state updates
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                                    Click 'Start Training' to see the loss curve
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Network Architecture Diagram */}
                    <Card className="flex-1 min-h-[200px] bg-secondary/20 relative overflow-hidden">
                        {isTraining && (
                            <div className="absolute inset-0 bg-primary/5 animate-pulse pointer-events-none" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="w-full max-w-lg h-full flex justify-between items-stretch">
                                {networkNodes.map((nodeCount, layerIndex) => (
                                    <div key={layerIndex} className="flex flex-col justify-around z-10 w-12">
                                        {Array.from({ length: nodeCount }).map((_, nodeIndex) => (
                                            <div
                                                key={`${layerIndex}-${nodeIndex}`}
                                                className={cn(
                                                    "w-6 h-6 rounded-full border-2 bg-background flex items-center justify-center shadow-sm relative transition-colors duration-200",
                                                    layerIndex === 0 ? "border-sky-500" : // Input
                                                        layerIndex === networkNodes.length - 1 ? "border-amber-500" : // Output
                                                            "border-primary", // Hidden
                                                    (isTraining && typeof window !== 'undefined' && Math.random() > 0.5) ? "bg-primary/20 scale-110" : "" // Simulating activation
                                                )}
                                            >
                                                {/* Links to previous layer (simplified visualization CSS lines) */}
                                                {layerIndex > 0 && (
                                                    <div className="absolute left-0 -translate-x-full h-px w-20 bg-border/40 -z-10 origin-right" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Labels */}
                        <div className="absolute top-4 inset-x-0 flex justify-between px-8 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                            <span>Input Layer</span>
                            <span>Hidden Layers ({hiddenLayers[0]})</span>
                            <span>Output Layer</span>
                        </div>
                    </Card>

                </div>
            </div >
        </div >
    );
}
