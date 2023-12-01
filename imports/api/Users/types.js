import { gql } from '@apollo/client';

export default gql`
  scalar JSON

  input NameInput {
    first: String
    last: String
  }

  input ProfileInput {
    name: NameInput
  }

  input UserInput {
    _id: String
    email: String
    password: String
    profile: ProfileInput
    roles: [String]
    settings: [UserSettingInput] # From /api/UserSettings/types.js
  }

  type Name {
    first: String
    last: String
  }

  type Role {
    _id: String
    name: String
  }

  type User {
    _id: String
    createdAt: String
    aboutMe: String
    coverPic: String
    emailAddress: String
    emailVerified: Boolean
    name: Name
    oAuthProvider: String
    profilePic: String
    roles: JSON
    settings: [UserSetting] # From /api/UserSettings/types.js
    username: String
  }

  type Users {
    total: Int
    users: [User]
  }

  type UserDataExport {
    zip: String
  }
`;
