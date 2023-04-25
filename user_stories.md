# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## Slack

### Create Slack workspace

* As a logged in user, I want to be able to create new workspace.
  * When I'm on the `/new-workspace` page:
    * I can create a new Slack workspace.
    * I can add members to a new Slack workspace.
    * I can delete memebers from a Slack workspace.
      * So that I can communicate with my desired friends/coworkers.


### Viewing Slack workspace

* As a logged in _or_ logged out user, I want to be able to view a messages within my Slack workspace.
  * When I'm on the `/home` page:
    * I can view the channels I am in along with any direct messages.
      * So that I can read and interact with my friends & colleagues.

* As a logged in _or_ logged out user, I want to be able to view a specific Channel with its associated messages.
  * When I'm on the `/home/:id` page:
    * I can view the content of the Channel, as well as the associated messages.
      * So that I can read and interact withwith my friends & colleagues, and add my own contributions in the Slack Channel.

### Updating Slack Messages

* As a logged in user, I want to be able to edit my messages by clicking an Edit button associated with my message.
  * When I'm on the `/home`, `/home/:id`, or `/users/:id/messages` pages:
    * I can click "Edit" to make permanent changes to messages I have posted.
      * So that I can fix any errors I make in my messages.

### Deleting Slack Messages

* As a logged in user, I want to be able to delete my messages by clicking a Delete button associated with the message anywhere that message appears.
  * When I'm on the `/home`, `/home/:id`, or `/users/:id/messages` pages:
    * I can click "Delete" to permanently delete a message I have posted.
      * So that when I realize I shouldn't have publicly said something, I can easily remove it.

### Reacting to Slack Messages

* As a logged in user, I want to be able to react to  messages by clicking a emoji button associated with the message anywhere that message appears.
  * When I'm on the `/home`, `/home/:id`, or `/users/:id/messages` pages:
    * I can click the emoji list to select a reaction to any message.
      * So that I can send cool reactions to my teammmates messages.

### Adding attachments to Slack Messages

* As a logged in user, I want to be able to send attachments in my Slack Channel or in my DMs.
  * When I'm on the `/home`, `/home/:id`, or `/users/:id/messages` pages:
    * I can upload an attachment to any workspace/direct message.
      * So that I can add context to my messages or send files.
