import { React, useState, useEffect } from 'react'
import { TextScramble } from '@a7sc11u/scramble'

const LandingPage = () => {
    return (
        <div className="bg-gradient-to-r from-[#F3E6D5] via-[#FFF9F2] to-[#F3E6D5]">
            {/*-- HERO-SECTION --*/}
            <div className="min-h-[85vh] flex flex-col items-center justify-center">
                <div className="text-8xl tracking-widest uppercase text-neutral-500">
                    <TextScramble text="INTRODUCING" as="h1" />
                    <TextScramble text="TEAM ROCKET" as="h1" />
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