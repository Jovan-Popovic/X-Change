import React from 'react'

const QuickView = () => {
    return(
        <div id="quickviewDefault" className="quickview">
          <header className="quickview-header">
            <p className="title">Quickview title</p>
            <span className="delete" data-dismiss="quickview"></span>
          </header>

          <div className="quickview-body">
            <div className="quickview-block">
              <p>
                <i class="fas fa-user-edit"></i>
                Edit Profile
              </p>
              <p>
                <i class="far fa-trash-alt"></i>
                Delete Profile
              </p>
            </div>
          </div>
          <footer className="quickview-footer">

          </footer>
        </div>
    )
}

export default QuickView;