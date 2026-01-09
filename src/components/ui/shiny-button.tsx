"use client";

import React from 'react';
import './shiny-button.css';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

export function ShinyButton({ text = "Edit Art", className, ...props }: ShinyButtonProps) {
    return (
        <div className={`shiny-btn-container ${className || ''}`}>
            <button type="button" className="shiny-btn" {...props}>
                <strong>{text}</strong>
                <div id="container-stars">
                    <div id="stars" />
                </div>
                <div id="glow">
                    <div className="circle" />
                    <div className="circle" />
                </div>
            </button>
        </div>
    );
}
