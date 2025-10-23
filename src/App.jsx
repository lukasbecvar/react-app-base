// include styles
import './assets/css/index.scss'

// include react
import { useState } from 'react'

// include router
import { Routes, Route, Link } from 'react-router-dom'

// include app components
import MainComponent from './components/MainComponent'
import SecondaryComponent from './components/SecondaryComponent'

// main app function component routing
export default function App() {
    // navigation links
    const navLinks = [
        { path: "/", label: "Main component" },
        { path: "/secondary", label: "Secondary component" }
    ]

    // flag for menu open/close
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        
            <div className="relative flex flex-col min-h-screen bg-[#0c1621]">                
                {/* navigation bar */}
                <nav className="bg-[#0c1621ce] text-white px-6 py-4 border-b border-gray-700 shadow-md z-20">
                    <div className="flex items-center justify-between">
                        {/* logo */}
                        <img src="favicon.png" alt="logo" className="h-7 w-auto mt-[-10px] mb-[-10px]" />

                        {/* mobile menu toggle button */}
                        <button className="md:hidden text-white focus:outline-none hover:text-blue-400 text-xl mt-[-4px] mb-[-4px]" onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</button>

                        {/* desktop menu */}
                        <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide uppercase">
                            {navLinks.map(({ path, label }) => (
                                <Link to={path} key={path} className="group relative text-white">
                                    {label}
                                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* mobile menu */}
                    {isMenuOpen && (
                        <div data-testid="mobile-menu" className="mt-4 flex flex-col gap-4 md:hidden text-sm font-semibold tracking-wide uppercase">
                            {navLinks.map(({ path, label }) => (
                                <Link to={path} key={path} onClick={() => setIsMenuOpen(false)} className="group relative w-max text-white">
                                    {label}
                                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>
                    )}
                </nav>

                {/* main component wrapper */}
                <main className="relative flex-grow flex flex-col items-center">
                    <div className="relative w-full h-full text-center">
                        <Routes>
                            <Route path="*" element={<MainComponent/>}/>
                            <Route path="/secondary" element={<SecondaryComponent/>}/>
                        </Routes>
                    </div>
                </main>
            </div>
        
    )
}
