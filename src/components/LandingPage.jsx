import { React, useState, useEffect } from 'react'
import { TextScramble } from '@a7sc11u/scramble'
import '../lib/finisher-header.js'

const LandingPage = () => {
    useEffect(() => {
        new window.FinisherHeader({
            "count": 100,
            "size": {
                "min": 2,
                "max": 8,
                "pulse": 0
            },
            "speed": {
                "x": {
                    "min": 0,
                    "max": 0.4
                },
                "y": {
                    "min": 0,
                    "max": 0.6
                }
            },
            "colors": {
                "background": "#201e30",
                "particles": [
                    "#fbfcca",
                    "#d7f3fe",
                    "#ffd0a7"
                ]
            },
            "blending": "overlay",
            "opacity": {
                "center": 1,
                "edge": 0
            },
            "skew": -2,
            "shapes": [
                "c"
            ]
        })
    }, [])
    return (
        <div className="bg-radial from-[#FFF9F2] to-[#F3E6D5]">
            {/*-- HERO-SECTION --*/}
            <div className="min-h-[95vh] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="finisher-header absolute -top-0 -bottom-80 left-0 right-0 z-0"></div>
                <div className="text-8xl tracking-widest uppercase text-neutral-500 relative z-10">
                    <TextScramble text="INTRODUCING" as="p" className="text-sm tracking-[0.3em] text-neutral-200 text-center" />
                    <TextScramble text="TEAM ROCKET" as="h1" className="text-7xl font-bold text-neutral-100" />
                </div>
            </div>
            {/*-- INTRODUCTION --*/}
            <div className="min-h-[100vh] flex flex-col items-center justify-center">
                <h1>ABOUT/INTRO</h1>
            </div>
            {/*-- HIGHLIGHTS --*/}
            <div className="min-h-[100vh] flex flex-col items-center justify-center">
                <h1>HIGHLIGHTS</h1>
            </div>
            {/*-- CONTRACTS --*/}
            <div className="min-h-[100vh] flex flex-col items-center justify-center">
                <h1>CONTRACTS</h1>
            </div>
        </div>
    )
}

export default LandingPage