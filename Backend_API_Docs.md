# Slack Clone

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```
### All endpoints that require proper authorization

All endpoints that authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "username": "john_doe",
      "email": "johndoe@example.com",
      "first_name" : "john",
      "last_name": "doe",
      "image_url": "https://example.com/johndoe.jpg"
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

## Users

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "username": "john_doe",
      "email": "johndoe@example.com",
      "first_name" : "john",
      "last_name": "doe",
      "image_url": "https://example.com/johndoe.jpg",
      "token": ""
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": [
        "Email is required",
        "Password is required"
      ]
    }
    ```
### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "username": "john_doe",
      "email": "johndoe@example.com",
      "first_name" : "john",
      "last_name": "doe",
      "image_url": "https://example.com/johndoe.jpg"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": [
        "User with that email already exists"
      ]
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": [
        "Invalid email",
        "First Name is required",
        "Last Name is required"
      ]
    }
    ```

### Get a Single User

Returns the information for a single user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/users/:id
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "image_url": "https://example.com/johnsmith.jpg"
    }
    ```

* Error response: User not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User not found",
      "statusCode": 404,
      "errors": [
        "User with that ID does not exist"
      ]
    }
    ```

## Workspaces

### Get All User Workspaces

Returns all workspaces joined or organized by the Current User

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/workspaces/session
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "id": 1,
        "name": "Workspace 1",
        "description": "This is the first workspace",
        "owner_id": 1,
        "image_url": "https://example.com/workspace-image1.jpg"
      },
      {
        "id": 2,
        "name": "Workspace 2",
        "description": "This is the second workspace",
        "owner_id": 1,
        "image_url": "https://example.com/workspace-image2.jpg"
      }
    ]
    ```

* Error response: User not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User not found",
      "statusCode": 404,
      "errors": [
        "User with that ID does not exist"
      ]
    }
    ```


### Get details of a Single Workspace from an id

Returns the information for a single workspace.

* Require Authorization: true
* Request
  * Method: GET
  * URL: /api/workspaces/:id
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "My Workspace",
      "description": "A sample workspace",
      "owner": {
        "id": 123,
        "name": "John Smith",
        "email": "john.smith@example.com"
      },
      "members": [
        {
          "id": 234,
          "name": "Jane Doe",
          "email": "jane.doe@example.com"
        },
        {
          "id": 345,
          "name": "Bob Johnson",
          "email": "bob.johnson@example.com"
        }
      ]
    }
    ```

* Error Response: Workspace not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Workspace not found",
      "statusCode": 404,
      "errors": [
        "Workspace with that ID does not exist"
      ]
    }
    ```

### Create a Workspace

Creates an returns a new workspace.

* Request
  * Method: POST
  * URL: /api/workspaces
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "My Workspace",
      "description": "A description of my workspace",
      "image_url": "url"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "My Workspace",
      "description": "A description of my workspace",
      "owner": {
          "id": 1,
          "first_name": "John",
          "last_name": "Smith",
          "email": "john.smith@gmail.com",
          "image_url": "https://example.com/johnsmith.jpg"
      },
      "image_url": "url"
    }
    ```

* Error response: Invalid request body
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid request body",
      "statusCode": 400,
      "errors": [
        "Name is required",
        "Description is required"
      ]
    }
    ```
### Edit a Workspace

Updates and returns an existing workspace.

* Require Authentication: true
* Require proper authorization: workspace must belong to the current user
* Request
  * Method: PUT
  * URL: /api/workspaces/:id
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "New Workspace Name",
      "description": "New Workspace Description",
      "image_url": "New Image url"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "New Workspace Name",
      "description": "New Workspace Description",
      "owner": {
          "id": 1,
          "firstName": "John",
          "lastName": "Smith",
          "email": "john.smith@gmail.com",
          "username": "JohnSmith",
          "pictureUrl": "https://example.com/johnsmith.jpg"
      },
      "image_url": "New Image url"
    }
    ```

* Error response: Workspace not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Workspace not found",
      "statusCode": 404,
      "errors": [
        "Workspace with that ID does not exist"
      ]
    }
    ```

### Delete a Workspace

Deletes a workspace.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/workspaces/:workspaceId
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Workspace deleted"
    }
    ```

* Error response: Workspace not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Workspace not found",
      "statusCode": 404,
      "errors": [
        "Workspace with that ID does not exist"
      ]
    }
    ```

### Add Workspace Member

Adds a member to a workspace.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/workspaces/:id/members
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "workspace_id": 1,
      "user_id": 1
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "workspace_id":  1,
      "user_id": 1
    }
    ```

* Error response: Workspace not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Workspace not found",
      "statusCode": 404,
      "errors": [
        "Workspace with that ID does not exist"
      ]
    }
    ```

* Error response: Member already exists
  * Status Code: 409
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Member already exists",
      "statusCode": 400,
      "errors": [
        "Member with that email already exists in the workspace"
      ]
    }
    ```

### Remove Workspace Member

Removes a user from a workspace.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/workspaces/:workspaceId/members/:userId
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User removed from workspace"
    }
    ```

* Error response: User not found in workspace
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User not found in workspace",
      "statusCode": 404,
      "errors": [
        "User with that ID is not a member of the workspace"
      ]
    }
    ```

## Channels

### Get All Channels

Returns a list of all channels where the current user is an owner or member

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/workspaces/:workspaceId/channels
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "id": 1,
        "name": "Channel Name",
        "description": "Channel Description",
        "topic": "Channel Topic",
        "owner_id": 1,
        "date_created": "2023-04-23",
        "workspace_id": 1,
        "private": false,
        "last_sent_message_timestamp": "2023-04-23T12:00:00Z"
      },
      {
        "id": 2,
        "name": "Channel Name 2",
        "description": "Channel Description 2",
        "topic": "Channel Topic 2",
        "owner_id": 2,
        "date_created": "2023-04-23",
        "workspace_id": 1,
        "private": true,
        "last_sent_message_timestamp": "2023-04-23T12:00:00Z"
      }
    ]
    ```

* Error Response: Unauthorized
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication failed",
      "statusCode": 401,
      "errors": [
        "Invalid or missing authentication token"
      ]
    }
    ```

### Get a Channel

Returns the details of a single channel by its ID.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/channels/:id

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Channel Name",
      "description": "Channel Description",
      "topic": "Channel Topic",
      "owner_id": 1,
      "date_created": "2023-04-23",
      "workspace_id": 1,
      "private": false,
      "last_sent_message_timestamp": "2023-04-23T12:00:00Z"
    }
    ```

* Error response: Channel not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel not found",
      "statusCode": 404,
      "errors": [
        "Channel with that ID does not exist"
      ]
    }
    ```

### Create a Channel

Creates a new channel.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/workspaces/:workspaceId/channels
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "New Channel Name",
      "description": "New Channel Description",
      "topic": "New Channel Topic",
      "owner_id": 1,
      "workspace_id": 1,
      "private": false
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "New Channel Name",
      "description": "New Channel Description",
      "topic": "New Channel Topic",
      "owner_id": 1,
      "date_created": "2023-04-23",
      "workspace_id": 1,
      "private": false,
      "last_sent_message_timestamp": null
    }
    ```

* Error response: Workspace not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Workspace not found",
      "statusCode": 404,
      "errors": [
        "Workspace with that ID does not exist"
      ]
    }
    ```

### Update a Channel

Updates the details of an existing channel.

* Require Authentication: true
* Request
  * Method: PUT
  * URL: /api/channels/:id
  * Headers:
    * Authorization: Bearer {token}
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "New Channel Name",
      "description": "New Channel Description",
      "topic": "New Channel Topic",
      "private": false
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "New Channel Name",
      "description": "New Channel Description",
      "topic": "New Channel Topic",
      "owner_id": 1,
      "date_created": "2023-04-23",
      "workspace_id": 1,
      "private": false,
      "last_sent_message_timestamp": "2023-04-23T12:00:00Z"
    }
    ```

* Error response: Channel not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel not found",
      "statusCode": 404,
      "errors": [
        "Channel with that ID does not exist"
      ]
    }
    ```

### Delete a Channel

Deletes a channel.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/channels/:channelId
  * Headers:
    * Authorization: Bearer {token}
    * Content-Type: application/json

* Successful Response
  * Status Code: 204

* Error response: Channel not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel not found",
      "statusCode": 404,
      "errors": [
        "Channel with that ID does not exist"
      ]
    }
    ```

* Error response: User must be channel owner
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel not found",
      "statusCode": 404,
      "errors": [
        "Must be channel owner to delete a channel"
      ]
    }
    ```

### Add User to Channel

Adds a user to a channel.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/channels/:channelId/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1234
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User added to channel successfully"
    }
    ```

* Error response: Channel not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel not found",
      "statusCode": 404,
      "errors": [
        "Channel with that ID does not exist"
      ]
    }
    ```
* Error response: user not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User not found",
      "statusCode": 404,
      "errors": [
        "User with that ID does not exist"
      ]
    }
    ```

### Remove a User from a Channel

Removes a user from a channel.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/channels/:channelId/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "userId": "1"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User successfully removed from channel"
    }
    ```

* Error response: Channel not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel not found",
      "statusCode": 404,
      "errors": [
        "Channel with that ID does not exist"
      ]
    }
    ```

* Error response: User not found in channel
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User not found in channel",
      "statusCode": 404,
      "errors": [
        "User with that ID is not a member of the channel"
      ]
    }
    ```

* Error response: Must be channel owner or current user
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 404,
      "errors": [
        "Forbidden"
      ]
    }
    ```


## Direct Messages

### Get All Current User's Direct Messages

Returns a list of all direct messages for the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/direct_messages
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
  {
    "user_id": 1234
  }
  ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "id": 1,
        "topic": "First Direct Message",
        "workspace_id": 1,
        "users": [615, 545],
        "last_sent_message_timestamp": "2023-04-23T12:00:00Z"
      },
      {
        "id": 2,
        "topic": "Second Direct Message",
        "workspace_id": 1,
        "users": [123, 456],
        "last_sent_message_timestamp": "2023-04-23T12:00:00Z"
      }
    ]
    ```

### Get Direct Message by ID

Returns details for a single direct message by ID.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/direct_messages/:id
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "topic": "Direct Message Topic",
      "workspace_id": 1,
      "last_sent_message_timestamp": "2023-04-23T12:00:00Z"
    }
    ```

* Error response: Direct message not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Direct message not found",
      "statusCode": 404,
      "errors": [
        "Direct message with that ID does not exist"
      ]
    }
    ```

### Create Direct Message

Creates a new direct message.

* Require Authentication: true
* Request
    * Method: POST
    * URL: /api/workspaces/:workspaceId/direct_messages
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "workspace_id": 1,
            "users": [123, 456],
            "topic": "New Direct Message"
        }
        ```

* Successful Response
    * Status Code: 201
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "id": 3,
            "topic": "New Direct Message",
            "workspace_id": 1,
            "last_sent_message_timestamp": "2023-04-23T12:00:00Z"
        }
        ```

## Update Direct Message

Updates an existing direct message.

* Require Authentication: true
* Request
  * Method: PUT
  * URL: /api/direct_messages/:id
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "topic": "Updated Direct Message Topic",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "topic": "Updated Direct Message Topic",
      "workspace_id": 1,
      "last_sent_message_timestamp": "2023-04-23T12:00:00Z"
    }
    ```

* Error response: Direct message not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Direct message not found",
      "statusCode": 404,
      "errors": [
        "Direct message with that ID does not exist"
      ]
    }
    ```


## Delete Direct Message

Deletes a direct message by ID.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/direct_messages/:id
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

      ```json
      {
        "message": "Direct message succesfully deleted",
      }

* Error Response: Direct message not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Direct message not found",
      "statusCode": 404,
      "errors": [
        "Direct message with that ID does not exist"
      ]
    }
    ```

## Messages in Channels

### Send Message in Channel

Sends a message in a channel.

* Require Authentication: true
* Request
    * Method: POST
    * URL: /api/channels/:channelId/messages
    * Headers:
        * Content-Type: application/json
        * Authorization: Bearer <access_token>
    * Body:
        ```json
        {
            "content": "Hello channel",
            "channel_id": 789
        }
        ```

* Successful Response
    * Status Code: 201
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "id": 123,
            "content": "Hello channel",
            "user_id": 456,
            "channel_id": 789,
            "direct_message_id": null,
            "parent_id": null,
            "attachment_id": null,
            "timestamp": "2023-04-25T10:15:30Z"
        }
        ```
* Error Response: Invalid request body
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "message": "Invalid request body",
            "statusCode": 400,
            "errors": [
                "Message content is required"
            ]
        }
        ```
* Error Response: Channel not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "message": "Channel not found",
            "statusCode": 404,
            "errors": [
                "Channel with that ID does not exist"
            ]
        }
        ```
* Error Response: User not authorized to send message in channel
    * Status Code: 401
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "message": "User not authorized to send message in channel",
            "statusCode": 401,
            "errors": [
                "User does not have permission to send message in this channel"
            ]
        }
        ```

### Send a Threaded Reply to a Message in a Channel

Sends a threaded reply to a message in a channel.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/channels/:channel_id/messages/
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "content": "This is a threaded reply message",
      "user_id": 123,
      "channel_id": 2,
      "parent_id": 456,
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 789,
      "content": "This is a threaded reply message",
      "user_id": 123,
      "channel_id": 2,
      "direct_message_id": null,
      "parent_id": 456,
      "attachment_id": null,
      "timestamp": "2023-04-25T18:45:00Z"
    }
    ```

* Error Response: Channel not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Channel not found",
      "statusCode": 404,
      "errors": [
        "Channel with that ID does not exist"
      ]
    }
    ```

* Error Response: Parent Message not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Parent Message not found",
      "statusCode": 404,
      "errors": [
        "Parent Message with that ID does not exist"
      ]
    }
    ```

### Update Message In a Channel

Updates a message by ID in a channel.

* Require Authentication: true
* Request
  * Method: PUT
  * URL: /api/channels/:channel_id/messages/:message_id
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "content": "Updated message text"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "id": "message_id",
      "content": "Updated message text",
      "user_id": 123,
      "channel_id": 2,
      "direct_message_id": null,
      "parent_id": null,
      "attachment_id": null,
      "timestamp": "2023-04-25T18:45:00Z",
    }
    ```

* Error Response: Message not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Message not found",
      "statusCode": 404,
      "errors": [
        "Message with that ID does not exist in this channel"
      ]
    }
    ```

## Delete Message In a Channel

Deletes a message by ID in a channel.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/channels/:channelId/messages/:messageId
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
      * Body:

    ```json
    {
      "message": "Message succesfully deleted",
    }
    ```

* Error Response: Message not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message not found",
      "statusCode": 404,
      "errors": [
        "Message with that ID does not exist"
      ]
    }
    ```


## Messages In Direct Messages

### Send Message in Direct Message

Sends a message in a Direct Message.

* Require Authentication: true
* Request
    * Method: POST
    * URL: /api/direct_messages/:direct_messageId/messages
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "content": "Hello direct message",
            "direct_message_id": 789
        }
        ```

* Successful Response
    * Status Code: 201
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "id": 123,
            "content": "Hello direct message",
            "user_id": 456,
            "channel_id": null,
            "direct_message_id": 789,
            "parent_id": null,
            "attachment_id": null,
            "timestamp": "2023-04-25T10:15:30Z"
        }
        ```
* Error Response: Invalid request body
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "message": "Invalid request body",
            "statusCode": 400,
            "errors": [
                "Message content is required"
            ]
        }
        ```
* Error Response: Direct Message not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "message": "Direct Message not found",
            "statusCode": 404,
            "errors": [
                "Direct Message with that ID does not exist"
            ]
        }
        ```
* Error Response: User not authorized to send message in Direct Message
    * Status Code: 401
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
        {
            "message": "User not authorized to send message in Direct Message",
            "statusCode": 401,
            "errors": [
                "User does not have permission to send message in this Direct Message"
            ]
        }
        ```

### Send a Threaded Reply to a Message in a Direct Message

Sends a threaded reply to a message in a Direct Message.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/direct_messages/:direct_messageId/messages/
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "content": "This is a threaded reply message",
      "user_id": 123,
      "direct_message_id": 2,
      "parent_id": 456,
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 789,
      "content": "This is a threaded reply message",
      "user_id": 123,
      "channel_id": null,
      "direct_message_id": 2,
      "parent_id": 456,
      "attachment_id": null,
      "timestamp": "2023-04-25T18:45:00Z"
    }
    ```

* Error Response: Direct Message not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Direct Message not found",
      "statusCode": 404,
      "errors": [
        "Direct Message with that ID does not exist"
      ]
    }
    ```

* Error Response: Parent Message not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Parent Message not found",
      "statusCode": 404,
      "errors": [
        "Parent Message with that ID does not exist"
      ]
    }
    ```

### Update Message In a Direct Message

Updates a message by ID in a Direct Message.

* Require Authentication: true
* Request
  * Method: PUT
  * URL: /api/direct_messages/:direct_messageId/messages/:message_id
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "content": "Updated message text"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "id": "message_id",
      "content": "Updated message text",
      "user_id": 123,
      "channel_id": null,
      "direct_message_id": 2,
      "parent_id": null,
      "attachment_id": null,
      "timestamp": "2023-04-25T18:45:00Z",
    }
    ```

* Error Response: Message not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Message not found",
      "statusCode": 404,
      "errors": [
        "Message with that ID does not exist in this direct message"
      ]
    }
    ```

## Delete Message In a Direct Message

Deletes a message by ID in a Direct Message.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/direct_messages/:direct_messageId/messages/:messageId
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
      * Body:

    ```json
    {
      "message": "Message succesfully deleted",
    }
    ```

* Error Response: Message not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message not found",
      "statusCode": 404,
      "errors": [
        "Message with that ID does not exist"
      ]
    }
    ```
