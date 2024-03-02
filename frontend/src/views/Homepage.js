import React from 'react'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <div>
      <main role="madin" style={{ marginTop: 50 }}>
        <div>
          <div className="container-fluid text-sm-center p-5 bg-light mb-5">
            <img style={{objectFit: "contain"}} src="logo.png" alt=""/>
            <p className="lead"><strong>Collaborative Hub for Team Productivity</strong> – Streamline task management, share knowledge, 
            and facilitate seamless communication by centralizing todos and chats in one unified platform.</p>
          </div>

        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Tasks</h2>
              <p>
              Manage your day efficiently with the Tasks feature of our app. Create, prioritize, and organize your to-do list seamlessly. 
              Whether it's work-related assignments, personal goals, or daily chores, 
              Tasks helps you stay on top of your responsibilities and ensures nothing slips through the cracks.
              </p>
              <p>
                <Link className="btn btn-secondary" to="#" role="button">
                  View details »
                </Link>
              </p>
            </div>
            <div className="col-md-4">
              <h2>Todo</h2>
              <p>
                Simplify your life by turning your to-do list into a Todo plan. 
                Capture your ideas, set deadlines, and break down tasks into manageable steps. 
                Todo is designed to make your day more structured and productive, allowing you to focus on what matters most and achieve your goals with ease.
              </p>
              <p>
                <Link className="btn btn-secondary" to="/todos/" role="button">
                  View details »
                </Link>
              </p>
            </div>
            <div className="col-md-4">
              <h2>Chat</h2>
              <p>
                Stay connected and collaborate effortlessly with the Chat function. 
                Discuss tasks, share updates, and communicate in real-time with your team or friends. 
                The Chat feature enhances coordination, fosters teamwork, and provides a central hub for discussing projects, making your work and personal conversations seamlessly integrated within the app.
              </p>
              <p>
                <Link className="btn btn-secondary" to="#" role="button">
                  View details »
                </Link>
              </p>
            </div>
          </div>
          <hr />
        </div>
    </main>

    </div>
  )
}

export default Homepage