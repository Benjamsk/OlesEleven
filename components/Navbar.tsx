import React from "react"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-100 px-4 py-2 dark:bg-gray-700">
      <div>
        <Link href="/" className="text-2xl font-bold text-gray-700 dark:text-gray-400">
          Oles eleven
        </Link>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-gray-600 hover:text-gray-800 dark:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/challenge" className="text-gray-600 hover:text-gray-800 dark:text-gray-400">
              Challenge
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
