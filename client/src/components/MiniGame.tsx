// Lightweight Mini-Game: Click the Dots
// Simple reaction game while waiting for order processing
// Less than 3KB, no external dependencies

import { useState, useEffect, useCallback, useRef } from 'react';

interface Dot {
    id: number;
    x: number;
    y: number;
    isWrong: boolean;
}

export default function MiniGame() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [dots, setDots] = useState<Dot[]>([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('sagedo-minigame-highscore');
        return saved ? parseInt(saved, 10) : 0;
    });

    // Audio context for game sounds
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext on first interaction
    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    // Play a simple beep sound
    const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
        try {
            const ctx = getAudioContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = type;
            oscillator.frequency.value = frequency;

            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + duration);
        } catch (e) {
            // Silently fail if audio not supported
        }
    }, [getAudioContext]);

    // Sound effects
    const playClickSound = useCallback(() => playSound(800, 0.1, 'sine'), [playSound]);
    const playStartSound = useCallback(() => playSound(440, 0.2, 'triangle'), [playSound]);
    const playGameOverSound = useCallback(() => {
        playSound(200, 0.3, 'sawtooth');
        setTimeout(() => playSound(150, 0.4, 'sawtooth'), 300);
    }, [playSound]);

    // Wrong click sound
    const playWrongSound = useCallback(() => {
        playSound(100, 0.5, 'sawtooth');
    }, [playSound]);

    // Generate random dot position
    const spawnDot = useCallback(() => {
        // 20% chance to spawn a wrong (green) dot
        const isWrong = Math.random() < 0.2;

        const newDot: Dot = {
            id: Date.now(),
            x: Math.random() * 80 + 10, // 10-90%
            y: Math.random() * 70 + 10, // 10-80%
            isWrong,
        };
        setDots(prev => [...prev, newDot]);

        // Remove dot after 2 seconds if not clicked
        setTimeout(() => {
            setDots(prev => prev.filter(d => d.id !== newDot.id));
        }, 2000);
    }, []);

    // End game (called when wrong dot or timer)
    const endGame = useCallback(() => {
        setIsPlaying(false);
        playGameOverSound();
        // Save high score
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('sagedo-minigame-highscore', score.toString());
        }
    }, [score, highScore, playGameOverSound]);

    // Game timer
    useEffect(() => {
        if (!isPlaying) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, endGame]);

    // Spawn dots periodically
    useEffect(() => {
        if (!isPlaying) return;

        const spawner = setInterval(() => {
            spawnDot();
        }, 800);

        return () => clearInterval(spawner);
    }, [isPlaying, spawnDot]);

    // Handle correct dot click
    const handleDotClick = (dot: Dot) => {
        if (dot.isWrong) {
            // Wrong dot clicked - GAME OVER!
            playWrongSound();
            setDots(prev => prev.filter(d => d.id !== dot.id));
            endGame();
        } else {
            // Correct dot clicked - score!
            playClickSound();
            setDots(prev => prev.filter(d => d.id !== dot.id));
            setScore(prev => prev + 1);
        }
    };

    // Start game
    const startGame = () => {
        playStartSound();
        setIsPlaying(true);
        setScore(0);
        setDots([]);
        setTimeLeft(30);
    };

    return (
        <div className="relative">
            {/* Game Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-foreground">🎯 Click the Dots</h3>
                    <p className="text-xs text-muted-foreground">Click red, avoid green!</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">High Score: <span className="font-bold text-primary">{highScore}</span></p>
                </div>
            </div>

            {/* Game Area */}
            <div className="relative w-full h-48 bg-muted/30 rounded-xl border border-border/30 overflow-hidden">
                {!isPlaying ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {timeLeft === 0 && score > 0 ? (
                            <>
                                <p className="text-2xl font-bold text-foreground mb-2">Game Over!</p>
                                <p className="text-muted-foreground mb-4">Your score: <span className="text-primary font-bold">{score}</span></p>
                            </>
                        ) : null}
                        <button
                            onClick={startGame}
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            {score > 0 ? 'Play Again' : 'Start Game'}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Timer & Score */}
                        <div className="absolute top-2 left-2 right-2 flex justify-between text-sm">
                            <span className="bg-background/80 px-2 py-1 rounded text-foreground">⏱️ {timeLeft}s</span>
                            <span className="bg-background/80 px-2 py-1 rounded text-foreground">🎯 {score}</span>
                        </div>

                        {/* Dots */}
                        {dots.map(dot => (
                            <button
                                key={dot.id}
                                onClick={() => handleDotClick(dot)}
                                className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full shadow-lg hover:scale-110 transition-transform animate-pulse cursor-pointer ${dot.isWrong
                                    ? 'bg-gradient-to-r from-green-400 to-emerald-600'
                                    : 'bg-gradient-to-r from-primary to-destructive'
                                    }`}
                                style={{
                                    left: `${dot.x}%`,
                                    top: `${dot.y}%`,
                                }}
                            />
                        ))}
                    </>
                )}
            </div>

            <p className="text-xs text-muted-foreground text-center mt-2">
                🔴 Click RED dots to score • 🟢 Avoid GREEN dots! 🎮
            </p>
        </div>
    );
}
