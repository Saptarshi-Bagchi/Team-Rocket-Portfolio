import React from 'react'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#800020] to-[#D45060] border-b border-black-900">
      <div className="flex justify-between items-center max-w-full mx-auto px-6">
        <div className="flex items-center gap-2">
        <img src="src/assets/logo.png" alt="Team Rocket Logo" className="h-15 w-auto py-2"/>
        <span className="text-neutral-300 font-bold text-xl">TEAM ROCKET</span>
        </div>
        <ul className="flex gap-6 list-none">
          <li><a className="font-bold text-sm text-neutral-300 hover:text-white transition-colors" href="#">HOME</a></li>
          <li><a className="font-bold text-sm text-neutral-300 hover:text-white transition-colors" href="#">OUR PROJECTS</a></li>
          <li><a className="font-bold text-sm text-neutral-300 hover:text-white transition-colors" href="#">ABOUT US</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar