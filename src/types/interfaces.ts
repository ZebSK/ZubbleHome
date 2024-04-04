/**
 * interfaces.ts
 * 
 * This file contains any interfaces used
 * These interfaces define the structure of data within the application
 * 
 * Interfaces:
 * - UserInfo:        Represents the structure of information about the user
 * - UserDictionary:  Represents a dictionary of user's unique identifiers and their corresponding information
 * - MessageBlock:    Represents the structure of information stored about a message
 * 
 */



// USERS

/**
 * Interface representing the structure of information about the user
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
 * Interface representing a dictionary of user's unique identifiers and their corresponding information
 */
export interface UserDictionary {
  [uid: string]: UserInfo;
}



// MESSAGES

/**
 * Interface representing the structure of information stored about a message
 */
export interface MessageBlock {
  uid: string;
  messageContents: string[]; // Contains a list of strings for each message
}