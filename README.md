# Slack Clone
=======

This is a clone of the popular communication platform Slack. It provides a comprehensive set of features to facilitate seamless communication and collaboration within workspaces.The project's backend is built on Flask and SQLAlchemy. The project's frontend is built on React and Redux. Realtime chat message functionality is handled with SocketIO. 

## [Live Link to Portfolio Project](https://aaslackcloneproject.onrender.com)
## [Link to Database Schema](https://res.cloudinary.com/dkul3ouvi/image/upload/v1686701574/Slack_Clone_Schema_hpkh68.png)
## [API Docs](https://github.com/johnny-2123/Project2_Group/blob/main/Backend_API_Docs.md)

## Technologies
- **Python**
- **Flask**
- **SQLALchemy**
- **SocketIO**
- **Javascript**
- **React**
- **Redux**
- **HTML**
- **CSS**
- **Render**

## Features

### Authentication

- **Get the Current User**: Retrieve the details of the currently logged-in user, requiring authentication.
- **Log In a User**: Allow users to log in with their email and password, without requiring authentication.
- **Sign Up a User**: Register new users with their details, without requiring authentication.
- **Get a Single User**: Retrieve the details of a specific user by their ID, requiring authentication.

### Workspaces

- **Get All User Workspaces**: Retrieve all workspaces associated with the current user, requiring authentication.
- **Get Details of a Single Workspace from an ID**: Retrieve the details of a specific workspace by its ID, requiring proper authorization.
- **Create a Workspace**: Create a new workspace with a name, description, and image URL, requiring authentication.
- **Edit a Workspace**: Update the name, description, and image URL of a workspace, requiring authentication and proper authorization.
- **Delete a Workspace**: Delete a workspace by its ID, requiring authentication.
- **Add Workspace Member**: Add a user as a member to a workspace, requiring authentication.
- **Remove Workspace Member**: Remove a user from a workspace, requiring authentication.

### Channels

- **Get All Channels**: Retrieve all channels within a workspace, requiring authentication.
- **Get a Channel**: Retrieve details of a specific channel by its ID, requiring authentication.
- **Create a Channel**: Create a new channel within a workspace, requiring authentication.
- **Update a Channel**: Update the details of a channel, such as name, description, topic, or privacy, requiring authentication.
- **Delete a Channel**: Delete a channel by its ID, requiring authentication.
- **Add User to Channel**: Add a user as a member to a channel, requiring authentication.
- **Remove a User from a Channel**: Remove a user from a channel, requiring authentication.

### Direct Messages

- **Get All Current User's Direct Messages**: Retrieve all direct messages associated with the current user, requiring authentication.
- **Get Direct Message by ID**: Retrieve details of a specific direct message by its ID, requiring authentication.
- **Create Direct Message**: Create a new direct message, requiring authentication.
- **Update Direct Message**: Update the details of a direct message, such as the topic, requiring authentication.
- **Delete Direct Message**: Delete a direct message by its ID, requiring authentication.

### Messages in Channels

- **Send Message in Channel**: Send a message in a channel, requiring authentication.
- **Send a Threaded Reply to a Message in a Channel**: Send a threaded reply to a message in a channel, requiring authentication.
- **Update Message In a Channel**: Update a message by ID in a channel, requiring authentication.
- **Delete Message In a Channel**: Delete a message by ID in a channel, requiring authentication.

### Messages In Direct Messages

- **Send Message in Direct Message**: Send a message in a direct message, requiring authentication.
- **Send a Threaded Reply to a Message in a Direct Message**: Send a threaded reply to a message in a direct message, requiring authentication.
- **Update Message In a Direct Message**: Update a message by ID in a direct message, requiring authentication.
- **Delete Message In a Direct Message**: Delete a message by ID in a direct message, requiring authentication.

