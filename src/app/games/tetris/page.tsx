"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { RotateCcw, Pause, Play, Trophy, Zap, Gamepad2, ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

interface Piece {
    shape: number[][];
    color: string;
    type: PieceType;
}

interface Position {
    x: number;
    y: number;
}

const ROWS = 20;
const COLS = 10;
const CELL_SIZE = 30;

const PIECES: Record<PieceType, Omit<Piece, "type">> = {
    I: { shape: [[1, 1, 1, 1]], color: "#00f0f0" },
    O: {
        shape: [
            [1, 1],
            [1, 1],
        ],
        color: "#f0f000",
    },
    T: {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
        ],
        color: "#a000f0",
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
        ],
        color: "#00f000",
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
        ],
        color: "#f00000",
    },
    J: {
        shape: [
            [1, 0, 0],
            [1, 1, 1],
        ],
        color: "#0000f0",
    },
    L: {
        shape: [
            [0, 0, 1],
            [1, 1, 1],
        ],
        color: "#f0a000",
    },
};

const TetrisGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [board, setBoard] = useState<(string | number)[][]>([]);
    const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
    const [nextPiece, setNextPiece] = useState<Piece | null>(null);
    const [holdPiece, setHoldPiece] = useState<Piece | null>(null);
    const [hasHeld, setHasHeld] = useState(false); // Prevent infinite holding
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem("tetris-high-score");
        if (saved) setHighScore(parseInt(saved));
        initGame();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getRandomPiece = (): Piece => {
        const pieces = Object.keys(PIECES) as PieceType[];
        const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
        return { ...PIECES[randomPiece], type: randomPiece };
    };

    const initGame = useCallback(() => {
        const emptyBoard = Array(ROWS)
            .fill(null)
            .map(() => Array(COLS).fill(0));
        setBoard(emptyBoard);
        setScore(0);
        setLevel(1);
        setLines(0);
        setGameOver(false);
        setIsPaused(false);
        setHoldPiece(null);
        setHasHeld(false);

        const firstPiece = getRandomPiece();
        const secondPiece = getRandomPiece();
        setCurrentPiece(firstPiece);
        setNextPiece(secondPiece);
        setPosition({ x: Math.floor(COLS / 2) - 1, y: 0 });
    }, []);

    const rotatePiece = (piece: Piece): Piece => {
        const rows = piece.shape.length;
        const cols = piece.shape[0].length;
        const rotated = Array(cols)
            .fill(null)
            .map(() => Array(rows).fill(0));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                rotated[j][rows - 1 - i] = piece.shape[i][j];
            }
        }

        return { ...piece, shape: rotated };
    };

    const checkCollision = useCallback(
        (piece: Piece, pos: Position): boolean => {
            if (!piece) return false;

            for (let i = 0; i < piece.shape.length; i++) {
                for (let j = 0; j < piece.shape[i].length; j++) {
                    if (piece.shape[i][j]) {
                        const newY = pos.y + i;
                        const newX = pos.x + j;

                        if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
                        if (newY >= 0 && board[newY] && board[newY][newX]) return true;
                    }
                }
            }
            return false;
        },
        [board]
    );

    // New: Calculate Ghost Position
    const getGhostPosition = useCallback(() => {
        if (!currentPiece) return position;
        let ghostPos = { ...position };
        while (!checkCollision(currentPiece, { ...ghostPos, y: ghostPos.y + 1 })) {
            ghostPos.y++;
        }
        return ghostPos;
    }, [currentPiece, position, checkCollision]);


    const mergePiece = useCallback(() => {
        if (!currentPiece) return board;
        const newBoard = board.map((row) => [...row]);

        currentPiece.shape.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell) {
                    const y = position.y + i;
                    const x = position.x + j;
                    if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
                        newBoard[y][x] = currentPiece.color;
                    }
                }
            });
        });

        return newBoard;
    }, [board, currentPiece, position]);

    const clearLines = useCallback(
        (newBoard: any[][]) => {
            let linesCleared = 0;
            const finalBoard = [...newBoard];

            for (let i = ROWS - 1; i >= 0; i--) {
                if (finalBoard[i].every((cell) => cell !== 0)) {
                    finalBoard.splice(i, 1);
                    finalBoard.unshift(Array(COLS).fill(0));
                    linesCleared++;
                    i++; // Check same row index again as lines shifted down
                }
            }

            if (linesCleared > 0) {
                const points = [0, 100, 300, 500, 800][linesCleared] * level;
                setScore((prev) => {
                    const newScore = prev + points;
                    if (newScore > highScore) {
                        setHighScore(newScore);
                        localStorage.setItem("tetris-high-score", newScore.toString());
                    }
                    return newScore;
                });
                setLines((prev) => {
                    const newLines = prev + linesCleared;
                    setLevel(Math.floor(newLines / 10) + 1);
                    return newLines;
                });
            }

            return finalBoard;
        },
        [level, highScore]
    );

    const moveDown = useCallback(() => {
        if (!currentPiece || gameOver || isPaused) return;

        const newPos = { ...position, y: position.y + 1 };

        if (checkCollision(currentPiece, newPos)) {
            let newBoard = mergePiece();
            newBoard = clearLines(newBoard);
            setBoard(newBoard);

            setCurrentPiece(nextPiece);
            setNextPiece(getRandomPiece());
            setPosition({ x: Math.floor(COLS / 2) - 1, y: 0 });
            setHasHeld(false); // Reset hold usage

            // Check immediate collision for game over
            if (
                nextPiece &&
                checkCollision(nextPiece, { x: Math.floor(COLS / 2) - 1, y: 0 })
            ) {
                setGameOver(true);
            }
        } else {
            setPosition(newPos);
        }
    }, [
        currentPiece,
        gameOver,
        isPaused,
        position,
        checkCollision,
        mergePiece,
        clearLines,
        nextPiece,
    ]);

    const moveLeft = useCallback(() => {
        if (!currentPiece || gameOver || isPaused) return;
        const newPos = { ...position, x: position.x - 1 };
        if (!checkCollision(currentPiece, newPos)) {
            setPosition(newPos);
        }
    }, [currentPiece, gameOver, isPaused, position, checkCollision]);

    const moveRight = useCallback(() => {
        if (!currentPiece || gameOver || isPaused) return;
        const newPos = { ...position, x: position.x + 1 };
        if (!checkCollision(currentPiece, newPos)) {
            setPosition(newPos);
        }
    }, [currentPiece, gameOver, isPaused, position, checkCollision]);

    const rotate = useCallback(() => {
        if (!currentPiece || gameOver || isPaused) return;
        const rotated = rotatePiece(currentPiece);
        if (!checkCollision(rotated, position)) {
            setCurrentPiece(rotated);
        } else {
            // Basic Wall Kick: Try moving left/right if rotation fails
            if (!checkCollision(rotated, { ...position, x: position.x - 1 })) {
                setPosition(prev => ({ ...prev, x: prev.x - 1 }));
                setCurrentPiece(rotated);
            } else if (!checkCollision(rotated, { ...position, x: position.x + 1 })) {
                setPosition(prev => ({ ...prev, x: prev.x + 1 }));
                setCurrentPiece(rotated);
            }
        }
    }, [currentPiece, gameOver, isPaused, position, checkCollision]);

    const hardDrop = useCallback(() => {
        if (!currentPiece || gameOver || isPaused) return;
        let newPos = getGhostPosition();
        setPosition(newPos);
        // Instant lock
        setTimeout(moveDown, 0);
    }, [currentPiece, gameOver, isPaused, getGhostPosition, moveDown]);

    // New: Hold Functionality
    const hold = useCallback(() => {
        if (!currentPiece || gameOver || isPaused || hasHeld) return;

        setHasHeld(true);
        if (holdPiece) {
            const temp = currentPiece;
            setCurrentPiece(holdPiece);
            setHoldPiece(temp);
            setPosition({ x: Math.floor(COLS / 2) - 1, y: 0 });
        } else {
            setHoldPiece(currentPiece);
            setCurrentPiece(nextPiece);
            setNextPiece(getRandomPiece());
            setPosition({ x: Math.floor(COLS / 2) - 1, y: 0 });
        }
    }, [currentPiece, holdPiece, hasHeld, gameOver, isPaused, nextPiece]); // Removed getRandomPiece from dep (it's stable enough or should be useCallback)

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
                e.preventDefault();
            }

            if (e.key === " ") {
                setIsPaused((prev) => !prev);
            } else if (e.key === "ArrowLeft") moveLeft();
            else if (e.key === "ArrowRight") moveRight();
            else if (e.key === "ArrowDown") moveDown();
            else if (e.key === "ArrowUp") rotate();
            else if (e.key === "Enter") hardDrop();
            else if (e.key.toLowerCase() === "c" || e.key === "Shift") hold();
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [moveLeft, moveRight, moveDown, rotate, hardDrop, hold]);

    useEffect(() => {
        if (gameOver || isPaused) return;

        const speed = Math.max(100, 1000 - (level - 1) * 100);
        const timer = setInterval(moveDown, speed);

        return () => clearInterval(timer);
    }, [gameOver, isPaused, level, moveDown]);

    // Canvas Rendering
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid Lines
        ctx.strokeStyle = "#16213e";
        ctx.lineWidth = 1;
        for (let i = 0; i <= ROWS; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(COLS * CELL_SIZE, i * CELL_SIZE);
            ctx.stroke();
        }
        for (let j = 0; j <= COLS; j++) {
            ctx.beginPath();
            ctx.moveTo(j * CELL_SIZE, 0);
            ctx.lineTo(j * CELL_SIZE, ROWS * CELL_SIZE);
            ctx.stroke();
        }

        // Draw Board
        board.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== 0) {
                    ctx.fillStyle = cell as string;
                    ctx.fillRect(j * CELL_SIZE + 1, i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                    ctx.fillRect(j * CELL_SIZE + 1, i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE / 3);
                }
            });
        });

        // Draw Ghost Piece
        if (currentPiece && !gameOver) {
            const ghostPos = getGhostPosition();
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = currentPiece.color;
            currentPiece.shape.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell) {
                        const x = (ghostPos.x + j) * CELL_SIZE;
                        const y = (ghostPos.y + i) * CELL_SIZE;
                        ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                    }
                });
            });
            ctx.globalAlpha = 1.0;
        }

        // Draw Current Piece
        if (currentPiece) {
            ctx.fillStyle = currentPiece.color;
            currentPiece.shape.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell) {
                        const x = (position.x + j) * CELL_SIZE;
                        const y = (position.y + i) * CELL_SIZE;
                        ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                        ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE / 3);
                        ctx.fillStyle = currentPiece.color;
                    }
                });
            });
        }
    }, [board, currentPiece, position, getGhostPosition, gameOver]);

    const renderMiniPiece = (piece: Piece | null) => {
        if (!piece) return null;
        return (
            <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${piece.shape[0].length}, 15px)` }}>
                {piece.shape.flatMap((row, i) =>
                    row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            className="w-[15px] h-[15px] rounded-[2px]"
                            style={{
                                backgroundColor: cell ? piece.color : 'transparent',
                                opacity: cell ? 1 : 0
                            }}
                        />
                    ))
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto py-8 px-4 flex justify-center pt-32">
            <Card className="w-full max-w-5xl shadow-xl bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <CardTitle className="text-4xl font-bold flex items-center gap-3 text-primary">
                        <Gamepad2 className="w-10 h-10" /> Tetris
                    </CardTitle>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => setIsPaused(!isPaused)}
                            disabled={gameOver}
                            variant="secondary"
                            className={isPaused ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
                        >
                            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                            <span className="ml-2">{isPaused ? "Resume" : "Pause"}</span>
                        </Button>
                        <Button onClick={initGame} variant="default">
                            <RotateCcw className="w-5 h-5 mr-2" />
                            New Game
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                        {/* Left Stats / Hold */}
                        <div className="hidden lg:flex w-40 flex-col gap-4">
                            <Card>
                                <CardContent className="p-4 flex flex-col items-center">
                                    <div className="text-xs font-bold text-muted-foreground uppercase mb-2">Hold (Shift)</div>
                                    <div className="bg-secondary/20 p-2 rounded-lg min-h-[60px] flex items-center justify-center w-full">
                                        {renderMiniPiece(holdPiece)}
                                        {!holdPiece && <span className="text-xs text-muted-foreground/50">Empty</span>}
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="text-xs text-muted-foreground p-2 text-center">
                                Level {level}
                                <br />
                                Lines {lines}
                            </div>
                        </div>

                        {/* Game Board Column */}
                        <div className="flex-1 flex flex-col items-center">
                            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-muted-foreground/20">
                                <canvas
                                    ref={canvasRef}
                                    width={COLS * CELL_SIZE}
                                    height={ROWS * CELL_SIZE}
                                    className="bg-gray-900 block"
                                />

                                {gameOver && (
                                    <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                                        <h3 className="text-3xl font-bold text-destructive mb-2">Game Over!</h3>
                                        <p className="text-xl font-medium mb-6">Final Score: {score}</p>
                                        <Button onClick={initGame} size="lg">Play Again</Button>
                                    </div>
                                )}

                                {isPaused && !gameOver && (
                                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-sm">
                                        <div className="bg-card p-6 rounded-xl shadow-lg border border-border text-center">
                                            <h3 className="text-2xl font-bold text-primary">Paused</h3>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile/Touch Controls */}
                            <div className="grid grid-cols-4 gap-2 mt-6 w-full max-w-sm lg:max-w-md">
                                <Button onClick={rotate} variant="secondary" className="col-start-2 font-bold aspect-square h-12">↻</Button>
                                <Button onClick={moveLeft} variant="outline" className="font-bold aspect-square h-12">←</Button>
                                <Button onClick={moveDown} variant="outline" className="font-bold aspect-square h-12">↓</Button>
                                <Button onClick={moveRight} variant="outline" className="font-bold aspect-square h-12">→</Button>
                                <Button onClick={hardDrop} variant="destructive" className="col-span-2 col-start-2 font-bold h-12">
                                    <ArrowDownToLine className="w-4 h-4 mr-2" /> Drop
                                </Button>
                                <Button onClick={hold} variant="outline" className="col-start-1 row-start-1 h-12 aspect-square lg:hidden" title="Hold">H</Button>
                            </div>
                        </div>

                        {/* Right Stats Column */}
                        <div className="w-full lg:w-72 space-y-6">
                            <Card className="bg-secondary/20 border-border">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                                        <Trophy className="w-5 h-5 text-yellow-500" />
                                        HIGH SCORE
                                    </div>
                                    <div className="text-3xl font-black">{highScore}</div>
                                </CardContent>
                            </Card>

                            <Card className="bg-primary/5 border-border">
                                <CardContent className="p-4">
                                    <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Score</div>
                                    <div className="text-2xl font-bold text-primary">{score}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-sm font-bold text-muted-foreground uppercase mb-3">Next Piece</div>
                                    <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-center min-h-[80px]">
                                        {renderMiniPiece(nextPiece)}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/30 rounded-lg">
                                <p className="font-bold mb-2">Controls</p>
                                <div className="grid grid-cols-2 gap-x-2">
                                    <span>← →</span> <span>Move</span>
                                    <span>↑</span> <span>Rotate</span>
                                    <span>↓</span> <span>Soft Drop</span>
                                    <span>Enter</span> <span>Hard Drop</span>
                                    <span>Shift</span> <span>Hold</span>
                                    <span>Space</span> <span>Pause</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TetrisGame;