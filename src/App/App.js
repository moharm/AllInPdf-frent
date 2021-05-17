import React, {useState, useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import Acceuil from "../Components/main/main";
import Drop from "../Components/Drop/Drop";
import AppHeader from "../Common/AppHeader";
import Home from "../Components/home/Home";
import Login from "../Components/user/Login";
import Profile from "../Components/profile/Profile";
import OAuth2RedirectHandler from "../Components/oauth2/OAuth2RedirectHandler";
import NotFound from "../Common/NotFound";
import LoadingIndicator from "../Common/LoadingIndicator";
import { getCurrentUser } from "../Services/APIUser";
import { ACCESS_TOKEN } from "../Constants";
import PrivateRoute from "../Common/PrivateRoute";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./App.css";


function App() {

    const [userState, setUserState] = useState({
        authenticated: false,
        currentUser: null,
        loading: false
    })

    function loadCurrentlyLoggedInUser() {
       
        setUserState(prevState => ({...prevState, 
            loading: true
        }))

        getCurrentUser()
            .then(response => {
                console.log(response)
                setUserState(prevState => ({...prevState, 
                    currentUser: response,
                    authenticated: true,
                    loading: false
                }))
            })
            .catch(error => {
                setUserState(prevState => ({...prevState, 
                    loading: false
                }))
            });
    }

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        setUserState(prevState => ({...prevState, 
            authenticated: false,
            currentUser: null
        }))
        Alert.success("You're safely logged out!");
    }

    useEffect(() => {
        loadCurrentlyLoggedInUser();

    }, [])
    

    if (userState.loading) {
        return <LoadingIndicator />;
    }

    return (
        <div className="app">
            <div className="app-top-box">
                    <AppHeader authenticated={userState.authenticated} onLogout={handleLogout} />
            </div>
            <div className="app-body">
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <PrivateRoute
                        path="/Acceuil"
                        authenticated={userState.authenticated}
                        currentUser={userState.currentUser}
                        component={Acceuil}
                    ></PrivateRoute>
                       <PrivateRoute
                        path="/Drop"
                        authenticated={userState.authenticated}
                        currentUser={userState.currentUser}
                        component={Drop}
                    ></PrivateRoute>
                    <PrivateRoute
                        path="/profile"
                        authenticated={userState.authenticated}
                        currentUser={userState.currentUser}
                        component={Profile}
                    ></PrivateRoute>
                    <Route
                        path="/login"
                        render={props => <Login authenticated={userState.authenticated} {...props} />}
                    ></Route>

                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                    <Route path="/Drop">
                        <Drop/>
                    </Route>
                    <Route component={NotFound}></Route>

                </Switch>
            </div>
            <Alert stack={{ limit: 3 }} timeout={3000} position="top-right" effect="slide" offset={65} />

        </div>
    );
}

export default App;
