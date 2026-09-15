import React from 'react'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-[#000000] min-h-[30vh] flex flex-col items-center justify-center gap-3">
      <div className="flex flex-col items-center justify-center">
        <img src={logo} alt="Team Rocket Logo" className="h-15 w-auto" />
        <p className="font-mono text-white text-xl font-bold">TEAM ROCKETT</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="font-mono text-white">Prepare for trouble!</p>
        <p className="font-mono text-white">And make it double!</p>
      </div>
      <p className="font-mono text-white text-xs">© 2026 Team Rocket. All rights reserved</p>
    </footer>
  )
}

export default Footer