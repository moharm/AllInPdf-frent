import React,{useState, useEffect} from "react";
import "./Profile.css";

export default function Profile(props) {
  
  const [userState, setUserState] = useState({loading: false})

 async function  loadCurrentlyLoggedInUserDetails()  {

    try {
      setUserState(prevState => ({...prevState, loading: true}))
      setUserState(prevState => ({...prevState, loading: false}))
     console.log(userState)
    } catch (error) {
      setUserState  (prevState => ({...prevState, loading: false}))
    }
  }

 useEffect(() => {
    loadCurrentlyLoggedInUserDetails();
    
  }, [])
  
  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card card-body d-flex flex-column align-items-center text-center">
              {props.currentUser.name}
              <img
                src={props.currentUser.imageUrl}
                alt={props.currentUser.name}
                className="rounded-circle"
                width="150"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}