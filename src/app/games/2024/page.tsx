"use client";
import React, { useState, useEffect, useCallback } from "react";
import { RotateCcw, Trophy, TrendingUp, Undo, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Game2048 = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [history, setHistory] = useState<{ board: number[][]; score: number }[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("2048-best-score");
        if (saved) setBestScore(parseInt(saved));
        initGame();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const addRandomTile = (board: number[][]) => {
        const emptyCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) emptyCells.push({ i, j });
            }
        }
        if (emptyCells.length > 0) {
            const { i, j } =
                emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const initGame = useCallback(() => {
        const newBoard = Array(4)
            .fill(null)
            .map(() => Array(4).fill(0));
        addRandomTile(newBoard);
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setHistory([]);
        setGameOver(false);
        setGameWon(false);
    }, []);

    const pushToHistory = (currentBoard: number[][], currentScore: number) => {
        setHistory(prev => [...prev.slice(-10), { // Limit history to last 10 moves
            board: currentBoard.map(row => [...row]),
            score: currentScore
        }]);
    };

    const handleUndo = () => {
        if (history.length === 0 || gameOver) return;
        const invalidMove = history[history.length - 1]; // Current state is not pushed yet
        // Wait, we push *before* move.
        const lastState = history[history.length - 1];
        setBoard(lastState.board);
        setScore(lastState.score);
        setHistory(prev => prev.slice(0, -1));
    };


    const move = useCallback((direction: "left" | "right" | "up" | "down") => {
        if (gameOver) return;

        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((row) => [...row]);
            let moved = false;
            let addScore = 0;

            const slide = (row: number[]) => {
                const filtered = row.filter((cell) => cell !== 0);
                const merged: number[] = [];
                let skip = false;

                for (let i = 0; i < filtered.length; i++) {
                    if (skip) {
                        skip = false;
                        continue;
                    }
                    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                        merged.push(filtered[i] * 2);
                        addScore += filtered[i] * 2;
                        skip = true;
                        if (filtered[i] * 2 === 2048 && !gameWon) {
                            setGameWon(true);
                        }
                    } else {
                        merged.push(filtered[i]);
                    }
                }

                while (merged.length < 4) merged.push(0);
                return merged;
            };

            if (direction === "left") {
                for (let i = 0; i < 4; i++) {
                    const newRow = slide(newBoard[i]);
                    if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i]))
                        moved = true;
                    newBoard[i] = newRow;
                }
            } else if (direction === "right") {
                for (let i = 0; i < 4; i++) {
                    const reversed = [...newBoard[i]].reverse();
                    const newRow = slide(reversed).reverse();
                    if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i]))
                        moved = true;
                    newBoard[i] = newRow;
                }
            } else if (direction === "up") {
                for (let j = 0; j < 4; j++) {
                    const col = [
                        newBoard[0][j],
                        newBoard[1][j],
                        newBoard[2][j],
                        newBoard[3][j],
                    ];
                    const newCol = slide(col);
                    if (JSON.stringify(newCol) !== JSON.stringify(col)) moved = true;
                    for (let i = 0; i < 4; i++) newBoard[i][j] = newCol[i];
                }
            } else if (direction === "down") {
                for (let j = 0; j < 4; j++) {
                    const col = [
                        newBoard[0][j],
                        newBoard[1][j],
                        newBoard[2][j],
                        newBoard[3][j],
                    ];
                    const reversed = [...col].reverse();
                    const newCol = slide(reversed).reverse();
                    if (JSON.stringify(newCol) !== JSON.stringify(col)) moved = true;
                    for (let i = 0; i < 4; i++) newBoard[i][j] = newCol[i];
                }
            }

            if (moved) {
                // Save state BEFORE updating for history
                // BUT we are inside setBoard updater. We need access to outer state 'score' (which might be stale if we don't depend on it)
                // and 'prevBoard'.
                // To safely use score, we should likely move history update out or use a functional update that has access to everything.
                // Simplified: We can't easily push to history INSIDE setBoard callback if we need current score.
                // Let's rely on effect or just grab score from state (closure capture might be stale if rapid).
                // For this app scale, we'll risk the closure capture of 'score' or refactor.
                // Better: Update history in a separate useEffect triggered by board change? No, that tracks *every* change (inc init).
                // Let's do it imperatively.
            }
            return prevBoard; // We'll handle the actual update outside to coordinate history
        });

        // Imperative wrapper to handle history properly
        // This duplicates logic slightly but ensures correct state capture

        let currentBoard = board.map(row => [...row]);
        let moved = false;
        let addScore = 0;

        // Re-run slide logic logic synchronously to determine if we should update
        // (This is a bit expensive doing it twice, but safe for React state)
        // Actually, let's just implement the logic once here not inside setBoard.

        const slide = (row: number[]) => {
            const filtered = row.filter((cell) => cell !== 0);
            const merged: number[] = [];
            let skip = false;

            for (let i = 0; i < filtered.length; i++) {
                if (skip) {
                    skip = false;
                    continue;
                }
                if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                    merged.push(filtered[i] * 2);
                    addScore += filtered[i] * 2;
                    skip = true;
                    if (filtered[i] * 2 === 2048 && !gameWon) setGameWon(true);
                } else {
                    merged.push(filtered[i]);
                }
            }
            while (merged.length < 4) merged.push(0);
            return merged;
        };

        const newBoard = currentBoard.map(row => [...row]); // Deep copy-ish

        if (direction === "left") {
            for (let i = 0; i < 4; i++) {
                const newRow = slide(newBoard[i]);
                if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i])) moved = true;
                newBoard[i] = newRow;
            }
        } else if (direction === "right") {
            for (let i = 0; i < 4; i++) {
                const reversed = [...newBoard[i]].reverse();
                const newRow = slide(reversed).reverse();
                if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i])) moved = true;
                newBoard[i] = newRow;
            }
        } else if (direction === "up") {
            for (let j = 0; j < 4; j++) {
                const col = [newBoard[0][j], newBoard[1][j], newBoard[2][j], newBoard[3][j]];
                const newCol = slide(col);
                if (JSON.stringify(newCol) !== JSON.stringify(col)) moved = true;
                for (let i = 0; i < 4; i++) newBoard[i][j] = newCol[i];
            }
        } else if (direction === "down") {
            for (let j = 0; j < 4; j++) {
                const col = [newBoard[0][j], newBoard[1][j], newBoard[2][j], newBoard[3][j]];
                const reversed = [...col].reverse();
                const newCol = slide(reversed).reverse();
                if (JSON.stringify(newCol) !== JSON.stringify(col)) moved = true;
                for (let i = 0; i < 4; i++) newBoard[i][j] = newCol[i];
            }
        }

        if (moved) {
            pushToHistory(board, score);
            addRandomTile(newBoard);
            setBoard(newBoard);
            setScore(prev => {
                const newTotal = prev + addScore;
                if (newTotal > bestScore) {
                    setBestScore(newTotal);
                    localStorage.setItem("2048-best-score", newTotal.toString());
                }
                return newTotal;
            });
            if (isGameOver(newBoard)) setGameOver(true);
        }

    }, [board, score, bestScore, gameWon, gameOver]);

    const isGameOver = (board: number[][]) => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) return false;
                if (j < 3 && board[i][j] === board[i][j + 1]) return false;
                if (i < 3 && board[i][j] === board[i + 1][j]) return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }

            if (e.key === "ArrowLeft") move("left");
            else if (e.key === "ArrowRight") move("right");
            else if (e.key === "ArrowUp") move("up");
            else if (e.key === "ArrowDown") move("down");
            else if (e.key === "Backspace" || (e.key.toLowerCase() === 'z' && e.ctrlKey)) handleUndo();
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [move]);

    // Update logic to maintain original colors but ensuring valid Tailwind classes
    const getTileColor = (value: number) => {
        const colors: Record<number, string> = {
            0: "bg-secondary text-transparent",
            2: "bg-white text-gray-800 border-2 border-primary/20",
            4: "bg-orange-100 text-gray-800 border-2 border-orange-200",
            8: "bg-orange-200 text-orange-900 border-2 border-orange-300",
            16: "bg-orange-300 text-white border-2 border-orange-400",
            32: "bg-orange-400 text-white border-2 border-orange-500",
            64: "bg-orange-500 text-white",
            128: "bg-orange-600 text-white",
            256: "bg-yellow-400 text-white shadow-lg",
            512: "bg-yellow-500 text-white shadow-lg",
            1024: "bg-yellow-600 text-white shadow-xl",
            2048: "bg-yellow-700 text-white shadow-2xl ring-2 ring-yellow-400",
        };
        return colors[value] || "bg-primary text-primary-foreground";
    };

    const getTileSize = (value: number) => {
        if (value >= 1000) return "text-2xl md:text-3xl";
        return "text-3xl md:text-4xl";
    };

    // Swipe Handlers (Basic)
    const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;

        const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        const diffX = touchEnd.x - touchStart.x;
        const diffY = touchEnd.y - touchStart.y;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > 30) {
                if (diffX > 0) move("right");
                else move("left");
            }
        } else {
            if (Math.abs(diffY) > 30) {
                if (diffY > 0) move("down");
                else move("up");
            }
        }
        setTouchStart(null);
    };

    return (
        <div className="container mx-auto py-8 px-4 flex justify-center pt-32">
            <Card className="w-full max-w-lg shadow-xl bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <CardTitle className="text-5xl font-bold flex items-center gap-3 text-primary">
                        2048
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button onClick={handleUndo} disabled={history.length === 0 || gameOver} size="icon" variant="outline" title="Undo">
                            <Undo className="w-5 h-5" />
                        </Button>
                        <Button onClick={initGame} size="default">
                            <RotateCcw className="w-5 h-5 mr-2" />
                            New Game
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Score Board */}
                    <div className="flex gap-4 mb-6">
                        <Card className="flex-1 bg-secondary/50 border-0">
                            <CardContent className="p-4 text-center">
                                <div className="text-muted-foreground font-bold text-xs uppercase mb-1">Score</div>
                                <div className="text-3xl font-bold text-primary">{score}</div>
                            </CardContent>
                        </Card>
                        <Card className="flex-1 bg-secondary/50 border-0">
                            <CardContent className="p-4 text-center">
                                <div className="text-muted-foreground font-bold text-xs uppercase mb-1 flex items-center justify-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> Best
                                </div>
                                <div className="text-3xl font-bold text-primary">{bestScore}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Game Status Messages */}
                    {gameWon && !gameOver && (
                        <div className="mb-6 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <Trophy className="w-8 h-8 text-green-600" />
                            <div>
                                <h3 className="font-bold text-green-800 dark:text-green-400">You Win!</h3>
                                <p className="text-green-700 dark:text-green-300 text-sm">Keep playing to reach higher scores!</p>
                            </div>
                        </div>
                    )}

                    {gameOver && (
                        <div className="mb-6 bg-destructive/10 border-2 border-destructive rounded-lg p-4 text-center animate-in zoom-in">
                            <h3 className="font-bold text-destructive text-xl mb-2">Game Over!</h3>
                            <p className="text-muted-foreground">Final Score: {score}</p>
                        </div>
                    )}

                    {/* Game Grid */}
                    <div
                        className="bg-secondary/30 rounded-xl p-4 mb-6 border-4 border-secondary touch-none"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="grid grid-cols-4 gap-3">
                            <AnimatePresence>
                                {board.map((row, i) =>
                                    row.map((cell, j) => (
                                        <motion.div
                                            key={`${i}-${j}-${cell}`} // Key by cell value to trigger animation on change? Or keep stable?
                                            // If we key by position, we animate properties. If we key by unique ID mechanism, we can animate movement.
                                            // For 2048, accurate movement animation needs tracking 'merged from' which is complex.
                                            // We'll stick to 'pop' animation on value change.
                                            layout // Basic layout animation
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            className={cn(
                                                "aspect-square rounded-lg flex items-center justify-center font-bold transition-colors duration-200 select-none",
                                                getTileColor(cell),
                                                getTileSize(cell),
                                                cell !== 0 ? "shadow-sm" : "bg-muted/50"
                                            )}
                                        >
                                            {cell !== 0 ? cell : ""}
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Controls & Instructions */}
                    <div className="text-center space-y-4">
                        <p className="text-sm font-medium text-muted-foreground">
                            Use arrow keys or swipe to move. Undo available.
                        </p>

                        <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto sm:hidden">
                            <div />
                            <Button variant="secondary" onClick={() => move("up")} className="h-12"><ArrowUp /></Button>
                            <div />
                            <Button variant="secondary" onClick={() => move("left")} className="h-12"><ArrowLeft /></Button>
                            <Button variant="secondary" onClick={() => move("down")} className="h-12"><ArrowDown /></Button>
                            <Button variant="secondary" onClick={() => move("right")} className="h-12"><ArrowRight /></Button>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};

export default Game2048;