"use client";
import React, { useState, useEffect, useCallback } from "react";
import { RotateCcw, Lightbulb, Trophy, Clock, Pencil, Undo, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Difficulty = "easy" | "medium" | "hard";

interface Cell {
    value: number;
    isOriginal: boolean;
    isError: boolean;
    notes: number[];
}

const SudokuGame = () => {
    const [board, setBoard] = useState<Cell[][]>([]);
    const [solution, setSolution] = useState<number[][]>([]);
    const [selectedCell, setSelectedCell] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [mistakes, setMistakes] = useState(0);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");
    const [gameWon, setGameWon] = useState(false);

    // New Features State
    const [notesMode, setNotesMode] = useState(false);
    const [history, setHistory] = useState<Cell[][][]>([]);

    const isValid = (board: number[][], row: number, col: number, num: number) => {
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num || board[x][col] === num) return false;
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    };

    const solveSudoku = (board: number[][]): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudoku(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    const generateNewPuzzle = useCallback(() => {
        const newBoard = Array(9)
            .fill(null)
            .map(() => Array(9).fill(0));

        const fillDiagonal = () => {
            for (let box = 0; box < 9; box += 3) {
                const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                // Shuffle nums
                for (let i = nums.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [nums[i], nums[j]] = [nums[j], nums[i]];
                }

                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const num = nums.pop();
                        if (num) newBoard[box + i][box + j] = num;
                    }
                }
            }
        };

        fillDiagonal();
        const solvedBoard = newBoard.map((row) => [...row]);
        solveSudoku(solvedBoard);

        const cellsToRemove =
            difficulty === "easy" ? 30 : difficulty === "medium" ? 40 : 50;
        const puzzle = solvedBoard.map((row) => [...row]);

        let removed = 0;
        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (puzzle[row][col] !== 0) {
                puzzle[row][col] = 0;
                removed++;
            }
        }

        const initialBoard = puzzle.map((row) =>
            row.map((cell) => ({
                value: cell,
                isOriginal: cell !== 0,
                isError: false,
                notes: [],
            }))
        );

        setBoard(initialBoard);
        setHistory([]); // Reset history
        setSolution(solvedBoard);
        setMistakes(0);
        setTime(0);
        setGameWon(false);
        setIsRunning(true);
        setSelectedCell(null);
    }, [difficulty]);

    // Push current board to history before changing
    const pushToHistory = (currentBoard: Cell[][]) => {
        setHistory(prev => [...prev.slice(-20), currentBoard]); // Keep last 20 moves
    };

    const handleUndo = () => {
        if (history.length === 0 || gameWon) return;
        const previousBoard = history[history.length - 1];
        setBoard(previousBoard);
        setHistory(prev => prev.slice(0, -1));
    };


    useEffect(() => {
        generateNewPuzzle();
    }, [generateNewPuzzle]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && !gameWon) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, gameWon]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const handleCellClick = (row: number, col: number) => {
        setSelectedCell({ row, col });
    };

    const handleNumberClick = (num: number) => {
        if (selectedCell && !gameWon) {
            const { row, col } = selectedCell;
            if (board[row][col].isOriginal) return;

            pushToHistory(board);

            const newBoard = board.map((r, i) =>
                r.map((cell, j) => {
                    if (i === row && j === col) {

                        if (notesMode) {
                            // Toggle note
                            const newNotes = cell.notes.includes(num)
                                ? cell.notes.filter(n => n !== num)
                                : [...cell.notes, num].sort();
                            return { ...cell, notes: newNotes };
                        } else {
                            // Set value
                            const isCorrect = solution[row][col] === num;
                            if (!isCorrect) {
                                setMistakes((prev) => prev + 1);
                            }
                            return { ...cell, value: num, isError: !isCorrect, notes: [] }; // Clear notes on set
                        }
                    }
                    return cell;
                })
            );
            setBoard(newBoard);

            if (!notesMode) {
                const isComplete = newBoard.every((row, i) =>
                    row.every((cell, j) => cell.value === solution[i][j])
                );

                if (isComplete) {
                    setGameWon(true);
                    setIsRunning(false);
                }
            }
        }
    };

    const handleEraser = () => {
        if (selectedCell && !gameWon) {
            const { row, col } = selectedCell;
            if (board[row][col].isOriginal) return;

            pushToHistory(board);

            const newBoard = board.map((r, i) =>
                r.map((cell, j) => {
                    if (i === row && j === col) {
                        return { ...cell, value: 0, isError: false, notes: [] };
                    }
                    return cell;
                })
            );
            setBoard(newBoard);
        }
    };

    const handleHint = () => {
        if (selectedCell && !gameWon) {
            const { row, col } = selectedCell;
            if (!board[row][col].isOriginal) {
                pushToHistory(board);
                const newBoard = board.map((r, i) =>
                    r.map((cell, j) => {
                        if (i === row && j === col) {
                            return {
                                value: solution[row][col],
                                isOriginal: false,
                                isError: false,
                                notes: []
                            };
                        }
                        return cell;
                    })
                );
                setBoard(newBoard);
            }
        }
    };

    // Highlight logic helpers
    const getHighlightClass = (row: number, col: number, cell: Cell) => {
        if (!selectedCell) return "";

        const isSelected = selectedCell.row === row && selectedCell.col === col;
        const selectedValue = board[selectedCell.row][selectedCell.col].value;
        const isSameValue = cell.value !== 0 && cell.value === selectedValue;
        const isRelated = selectedCell.row === row || selectedCell.col === col ||
            (Math.floor(selectedCell.row / 3) === Math.floor(row / 3) &&
                Math.floor(selectedCell.col / 3) === Math.floor(col / 3));

        if (isSelected) return "bg-primary/40 ring-2 ring-inset ring-primary";
        if (isSameValue) return "bg-primary/20 ring-1 ring-inset ring-primary/50 font-extrabold";
        if (isRelated) return "bg-muted-foreground/10";

        return "";
    };

    return (
        <div className="container mx-auto py-8 px-4 flex justify-center pt-32">
            <Card className="w-full max-w-3xl shadow-xl bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-3xl font-bold flex items-center gap-2 text-primary">
                        🧩 Sudoku
                    </CardTitle>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="font-mono text-xl font-bold text-primary">
                                {formatTime(time)}
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <Select
                                value={difficulty}
                                onValueChange={(val: Difficulty) => setDifficulty(val)}
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={handleUndo} disabled={history.length === 0 || gameWon} variant="outline" size="icon" title="Undo">
                                <Undo className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={() => setNotesMode(!notesMode)}
                                variant={notesMode ? "default" : "outline"}
                                className={notesMode ? "bg-primary text-primary-foreground" : ""}
                                title="Toggle Notes Mode"
                            >
                                <Pencil className="w-4 h-4 mr-2" />
                                Notes {notesMode ? "On" : "Off"}
                            </Button>
                            <Button onClick={handleEraser} disabled={!selectedCell || gameWon} variant="outline" size="icon" title="Erase">
                                <Eraser className="w-4 h-4" />
                            </Button>
                            <div className="w-px h-8 bg-border mx-2"></div>
                            <Button onClick={generateNewPuzzle} variant="secondary">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                New Game
                            </Button>
                            <Button
                                onClick={handleHint}
                                disabled={!selectedCell || gameWon}
                                variant="default"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white border-none"
                            >
                                <Lightbulb className="w-4 h-4 mr-2" />
                                Hint
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="text-muted-foreground">
                            <span className="font-semibold">Mistakes:</span>
                            <span className="ml-2 text-destructive font-bold">{mistakes}</span>
                        </div>
                    </div>

                    {gameWon && (
                        <div className="mb-6 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3 animate-in slide-in-from-top-2">
                            <Trophy className="w-8 h-8 text-green-600" />
                            <div>
                                <h3 className="font-bold text-green-800 dark:text-green-400 text-lg">
                                    Congratulations!
                                </h3>
                                <p className="text-green-700 dark:text-green-300">
                                    You completed the puzzle in {formatTime(time)} with{" "}
                                    {mistakes} mistakes!
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
                        {/* Board */}
                        <div className="grid grid-cols-9 gap-0 border-4 border-foreground rounded-lg overflow-hidden mx-auto w-full max-w-[500px] aspect-square shadow-2xl bg-background">
                            {board.map((row, i) =>
                                row.map((cell, j) => (
                                    <div
                                        key={`${i}-${j}`}
                                        onClick={() => handleCellClick(i, j)}
                                        className={cn(
                                            "aspect-square flex items-center justify-center relative border-[0.5px] border-border/50 cursor-pointer transition-colors",
                                            cell.isOriginal
                                                ? "bg-secondary/40 text-foreground font-bold text-xl sm:text-2xl"
                                                : "text-primary text-xl sm:text-2xl",
                                            cell.isError ? "bg-destructive/20 text-destructive" : "",
                                            getHighlightClass(i, j, cell),

                                            // Thick borders for 3x3 grids
                                            j % 3 === 2 && j !== 8 ? "border-r-2 border-r-foreground" : "",
                                            i % 3 === 2 && i !== 8 ? "border-b-2 border-b-foreground" : ""
                                        )}
                                    >
                                        {cell.value !== 0 ? (
                                            cell.value
                                        ) : (
                                            // Notes Display
                                            <div className="grid grid-cols-3 gap-0 w-full h-full p-0.5 pointer-events-none">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                                    <div key={num} className="flex items-center justify-center text-[8px] sm:text-[10px] leading-none text-muted-foreground font-medium">
                                                        {cell.notes.includes(num) ? num : ""}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Controls */}
                        <div className="grid grid-cols-3 sm:grid-cols-9 lg:grid-cols-3 gap-2 w-full lg:w-auto">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <Button
                                    key={num}
                                    onClick={() => handleNumberClick(num)}
                                    disabled={!selectedCell || gameWon}
                                    variant="outline"
                                    className={cn(
                                        "aspect-square text-xl font-bold h-12 w-12 sm:h-14 sm:w-14 shadow-sm",
                                        notesMode ? "text-muted-foreground border-dashed" : "text-primary"
                                    )}
                                >
                                    {num}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SudokuGame;
