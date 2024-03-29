// External libraries
import {useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';

// Internal modules
import MessageScreen from './components/message-screen.tsx';
import SignInScreen from './components/sign-in-screen.tsx';
import EditProfileScreen from './components/edit-profile-screen.tsx';

import { auth } from './services/firebase.tsx';
import { handleLogout } from './services/auth.tsx';
import { handleSignIn, subscribeToUserInfo } from './services/db.tsx';



// INTERFACE DEFINITIONS

/**
 * UserInfo interface representing the structure of information about the user
 */
export interface UserInfo {
  uid: string; // Unique identifier
  displayName: string; 

  defaultProfilePic: boolean; // Indicates whether user is using the default profile picture
  profilePic: string; // The URL for the user's profile picture
  colour: string; // The colour to be used for design elements for that user

  pronouns: string | null;
  bio: string | null;
}

/**
 * UserDictionary interface containing a dictionary of user's unique identifiers and their corresponding information
 */
export interface UserDictionary {
  [uid: string]: UserInfo;
}

/**
 * MessageBlock interface describing the structure of information stored about a message
 */
export interface MessageBlock {
  uid: string;
  messageContents: string[]; // Contains a list of strings for each message
}




// APP COMPONENTS

/**
 * Main parent component for the app
 * @returns The App Component
 */
function App(): JSX.Element {
  // useRefs for reference objects that persist across re-renders
  const userMenuRef = useRef<HTMLDivElement>(null);

  // useStates for determining state variables
  const [userAuth] = useAuthState(auth); // Check if signed in
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [otherUserInfo, setOtherUserInfo] = useState<UserDictionary>({})
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false)

  // useEffects that run every time the dependencies change
  useEffect(() => { handleSignIn(setUserInfo) }, [userAuth])
  useEffect(() => { outsideUserMenuClick(userMenuRef, setUserMenuOpen) }, [])
  useEffect(() => { if (userAuth) {
    const unsubscribe = subscribeToUserInfo(userAuth.uid, setOtherUserInfo)
    return () => { unsubscribe() }
  } }, [userAuth])

  return (
    <div className='App'>
      {
        !userAuth ? 
        <SignInScreen/> 
        : 
        <div className='appScreen'>
          {/* Main section of screen */}
          {editProfileOpen? 
            <EditProfileScreen userInfo = {userInfo} setUserInfo = {setUserInfo} setEditProfileOpen = {setEditProfileOpen}/> :  
            <MessageScreen userInfo = {userInfo} otherUserInfo = {otherUserInfo}/>}

          {/* Account button */}
          <button className = "accountButton" onClick={(event) => handleProfileButtonClick(event, setUserMenuOpen, userMenuOpen)}>
            <img className = "profilePicture" src = {userInfo?.profilePic} alt = "Profile" />
          </button>

          {/* Dropdown menu */}
          {userMenuOpen && (
            <div className = "userMenu" ref={userMenuRef}>
              <div className= "menuBar" style={{background: "linear-gradient(to bottom, " + userInfo?.colour + " 50%, transparent 50%)"}}>
                <img className="profilePicture" src={userInfo?.profilePic} alt="Profile" style={{width:"80px", border:"5px solid #FFF"}}/>
              </div>
              <div className = "profileInfo">
                <h2>{userInfo?.displayName}</h2>
                <div style={{fontStyle:"italic"}}>{userInfo?.pronouns}</div>
                <div style={{whiteSpace:"pre-line"}}>{userInfo?.bio}</div>
              </div>
              <button onClick={()=> {setUserMenuOpen(false), setEditProfileOpen(true)}}>Edit Profile</button>
              <button onClick={()=> {handleLogout() ;setUserMenuOpen(false)}}>Log Out</button>
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default App;



// FUNCTIONS

/**
 * Sets up a listener to hide user menu if clicking outside of it
 * @param menuRef - Reference to user menu
 * @param setUserMenuOpen - Setter to set whether menu is hidden
 */
function outsideUserMenuClick(menuRef: React.RefObject<HTMLDivElement>, setUserMenuOpen: Dispatch<SetStateAction<boolean>>) {
  /**
   * Function to check if menu is open and close if click event not on menu
   * @param event - Mouse clicking event
   */
  function handleOutsideUserMenuCLick(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setUserMenuOpen(false);
    }
  }
  // Add event listener
  document.addEventListener("click", handleOutsideUserMenuCLick);

  // Remove event listener on disconnect
  return () => {
    document.removeEventListener("click", handleOutsideUserMenuCLick);
  }
}

/**
 * Function to handle the clicking of the profile picture button
 * @param event - The mouse clicking event
 * @param setUserMenuOpen - The setter to determine if the menu is showing
 * @param userMenuOpen - The variable for whether the menu is showing
 */
function handleProfileButtonClick(event: React.MouseEvent<HTMLButtonElement>, setUserMenuOpen: Dispatch<SetStateAction<boolean>>, userMenuOpen: boolean) {
  event.stopPropagation(); // Stop outsideUserMenuClick from triggering
  setUserMenuOpen(!userMenuOpen)
}