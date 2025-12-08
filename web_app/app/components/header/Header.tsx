'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="fixed w-full bg-custom-black/95 backdrop-blur-sm z-50 border-b border-custom-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <Link href={"/"} className="text-2xl font-bold tracking-tight">
                            <span className="text-custom-orange">Tour</span>Rify
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/documentation" className="text-gray-300 hover:text-custom-orange transition-colors">Documentation</Link>
                        <Link href="/about" className="text-gray-300 hover:text-custom-orange transition-colors">About</Link>
                        <Link href={"/login"} className="px-4 py-2 rounded-sm border border-l-custom-orange border-b-custom-orange text-gray-300 hover:text-white transition-colors">Log In</Link>
                        <Link href={"/get-started"} className="bg-custom-orange text-white px-6 py-2.5 rounded hover:bg-custom-orange-dark transition-colors font-medium">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#1a1a1a] border-t border-custom-gray">
                    <div className="px-4 py-6 space-y-4">
                        <Link href={"/documentation"} className="block text-gray-300 hover:text-custom-orange">Documentation</Link>
                        <Link href={"/about"} className="block text-gray-300 hover:text-custom-orange">About</Link>
                        <Link href={"/login"} className="block w-full text-left text-gray-300 border border-l-custom-orange border-b-custom-orange rounded-sm hover:text-white">Log In</Link>
                        <Link href={"/get-started"} className="block w-full bg-custom-orange text-white px-6 py-2.5 rounded hover:bg-custom-orange-dark transition-colors font-medium">
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Header