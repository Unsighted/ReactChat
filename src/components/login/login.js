import React from "react";
          
  export function Login(){

    return(
 
      <form className="login" action="/login" method="POST" >
        
          <legend className="legend">Login</legend>
          
          <div className="inputval">
            <input type="text" name ="username" placeholder="nombre" required />
            <span><i className="large material-icons">person</i></span>
          </div>
          
          <div className="inputval">
            <input type="password" placeholder="password" required />
            <span><i className="fa fa-lock"></i></span>
          </div>
          
          <button type="submit" className="bs"><i className="large material-icons">arrow_forward</i></button>
          
        <div className="feedback">
          login successful <br />
          redirecting...
        </div>
        
      </form>
    )
  }

