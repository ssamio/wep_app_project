<h1>Advanced web applications course project</h1>
<h2>Lappeenranta University of Technology - Summer 2023</h2>
<h3>Technologies used</h3>
<h3>!!! Use Node v14 or above to run !!!</h3>
<p>
  This project consists of Express.js backend that serves a React frontend. The backend database is a MongoDB database, 
  which connects to the Express.js backend with the MongoDB driver and Mongoose; this stack was used many times during the course, 
  and it proved to be an easy and highly flexible solution. The frontend uses Material UI on top of React to deliver
  a responsive web app with modern design. Authentication is done with JWT using Passport.js. The UI is translated to english and finnish 
  with i18next.js
</p>
<h3>Features</h3>
<li>
  Basic features as per project description (https://docs.google.com/document/d/1zSfVZcnv7FUnu6VxwKLXBPZHqTIdRX1w3d9Yer_mKVU)
</li>
<li>
  Post and comment editing (both user and admin)
</li>
<li>
  Use of React
</li>
<li>
  Pager on post listing
</li>
<li>
  Admin account (to set user as admin, the flag needs to be raised from database shell (Mongosh)). Gives the user the ability to edit and delete posts and comments, in addition to deleting users and editing their usernames.
</li>
<li>
  Timestamps visible on posts and comments. If the post is edited, both createdAt and updatedAt are shown, otherwise only the createdAt is visible.
</li>
<li>
  UI translation to two languages
</li>
<li>
  (Optional own feature) User settings: user can change their username/display name and delete their account. This way the users can keep their emails hidden (email is default username and used for logging in) and delete their accounts with all their posts and comments once they get enough of Internet. Admin has a management panel that has these same features regarding all of the users.
</li>
<li>
  Target point score is 45
</li>
<h3>Installation</h3>
<p>
  Download the code and run <code>npm install</code>. Note that the required Node version is 14 or later. The project's frontend needs to be built with <code>cd client && npm run build</code> ran from the root folder. The server folder requires a <code>.env</code> file that specifies
  a SECRET and PORT for the backend <code>SECRET="yourSecretStringGoesHere" PORT="yourFavouritePortNumber"</code>. Finally the app can be deployed by running 
  <code>NODE_ENV=production npm start</code> in the root folder. The frontend's default port is 3000, and the app can be accessed from there within your domain (localhost or whatever you are deploying to)
</p>
<h3>User guide</h3>
<h4>Basic usage</h4>
<p>
  The app allows the user to browse code snippets and their comments without logging in. All the posts are visible on the front page, and can be navigated with the paginator below them. By pressing the "Comments"-button of a post, the comments that are associated with the post are shown (if any exist). By registering and logging in the user can unlock additional features.
</p>
<h4>Registration and login</h4>
<p>
  User needs to be registered to create posts and comments. Registration page can be navigated to from the "Register"-button. To register, user needs an email that has not been registered previously and a strong password with at least 8 characters, one capital letter, one small letter, one number and one symbol. After successful registration these credentials can be used to login from the "Login"-page.
</p>
<h4>Creating posts and comments</h4>
<p>
  When succesfully logged in, the user can post new code snippets from the front page. The snippet includes the title and the code itself. Comments can be added from the "Comment"-view of a post, using the TextField in the upper ToolBar of the view and the nearby "Submit"-button. The user that originally created the post/comment can delete or edit the post or comment (in addition to admin).
</p>
<h4>User settings</h4>
<p>
  When logged in, the user can change one's username that is displayed with posts and comments from the "User Settings"-view. This view also allows the user to delete their account along with all the posts and comments made with it.
</p>
<h4>Admin</h4>
<p>
  If the user has admin rights, (can be issued through database shell after the user account has been registered. If you do not know what this means, you propably are not an admin nor going to be one.) they have editing and deleting rights over all posts and comments, in addition to the ability to delete users and change their usernames from the admin panel.
</p>
<h4>Logging out</h4>
<p>
  Press "Logout" to log out.
</p>
