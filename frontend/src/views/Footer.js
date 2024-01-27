import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <footer className="bg-light text-center text-lg-start">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright:
          <Link to="#" className="text-dark" >
            TaskTalk
          </Link>
        </div>
      </footer>

    </div>
  )
}

export default Footer