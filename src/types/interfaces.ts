/**
 * @file interfaces.ts
 * 
 * @description
 * This file contains any interfaces used
 * These interfaces define the structure of data within the application
 * 
 * @exports UsersContext - Represents the structure of the useContext for user information
 * @exports MessagesContext - Represents the structure of the useContext for message information
 * 
 * @exports UserData - Represents the structure of information about the user
 * @exports UserDictionary - Represents a dictionary of user's unique identifiers and their corresponding information
 * @exports UserSettings - Represents the structure of information about the user's settings
 * @exports MessageBlock - Represents the structure of information stored about a message
 */

// Internal Modules
import { User } from "firebase/auth";
import { SetStateMsgBlockList, SetStateUserDataNull, SetStateUserDict, setStateUserSettings } from "./aliases";



// CONTEXTS

/**
 * Interface representing the structure of the useContext for user information
 */
export interface UsersContext {
  userAuth: User | null | undefined;

  currUserInfo: UserData | null;
  setCurrUserInfo: SetStateUserDataNull;

  currUserSettings: UserSettings;
  setCurrUserSettings: setStateUserSettings;

  otherUserInfo: UserDictionary;
  setOtherUserInfo: SetStateUserDict;
}

/**
 * Interface representing the structure of the useContext for message information
 */
export interface MessagesContext {
  messageBlocks: MessageBlock[];
  setMessageBlocks: SetStateMsgBlockList
}



// USERS

/**
 * Interface representing the structure of information about the user
 */
export interface UserData {
  uid: string; // Unique identifier
  displayName: string; 

  defaultProfilePic: boolean; // Indicates whether user is using the default profile picture
  profilePic: string; // The URL for the user's profile picture
  colour: string; // The colour to be used for design elements for that user

  pronouns: string | null;
  bio: string | null;
}
  
/**
 * Interface representing a dictionary of user's unique identifiers and their corresponding information
 */
export interface UserDictionary {
  [uid: string]: UserData;
}

/**
 * Interface representing the structure of information about the user's settings
 */
export interface UserSettings {
  darkMode: boolean;
}



// MESSAGES

/**
 * Interface representing the structure of information stored about a message
 */
export interface MessageBlock {
  uid: string;
  messageContents: string[]; // Contains a list of strings for each message
}
