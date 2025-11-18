import React from 'react'

const listItems = ['Home', 'About', 'Blog', 'Services', 'Shop']

const Navbar = () => {
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
            <nav className="mx-auto bg-black/70 text-white flex items-center justify-between gap-6 py-3 px-6 rounded-full backdrop-blur-sm">
                <ul className="flex gap-8 text-lg">
                    {listItems.map((item, index) => (
                        <li
                            key={index}
                            className="hover:text-purple-400 cursor-pointer relative"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <button className="bg-gradient-to-r from-purple-400 to-orange-400 py-1 px-4 rounded-xl shadow hover:from-purple-200 hover:to-orange-300">
                    Contact
                </button>
            </nav>
        </div>
    )
}

export default Navbar
