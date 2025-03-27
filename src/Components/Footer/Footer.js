import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div className="container">
      <div className="footer">
        <div className="row">
          <a href="#" target="blank"><i className="fa fa-instagram" /></a>
          <a href="#" target="blank"><i className="fa fa-youtube" /></a>
          <a href="#" target="blank"><i className="fa fa-github" /></a>
          <a href="#" target="blank"><i className="fa fa-facebook" /></a>
        </div>

        <div className="row">
          <p>&copy; 2025 Quiz Platform</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
