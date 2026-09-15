import { React, useState, useEffect } from 'react'
import { TextScramble } from '@a7sc11u/scramble'
import '../lib/finisher-header.js'
import { motion } from 'framer-motion'

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
            <div className="min-h-[100vh] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="finisher-header absolute -top-20 -bottom-20 left-0 right-0 z-0"></div>
                <div className="text-8xl tracking-widest relative z-10">
                    <TextScramble text="INTRODUCING" as="p" className="text-sm tracking-[0.3em] text-neutral-200 text-center" />
                    <TextScramble text="TEAM ROCKETT" as="h1" className="text-7xl font-bold text-neutral-100" />
                    <motion.p className="text-sm text-neutral-400 text-center pb-20 pt-5"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    transition={{duration: 0.6 , delay:0.75}}>
                        WHERE IDEA MEETS INNOVATION!
                    </motion.p>
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