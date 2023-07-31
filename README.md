<h1>Advanced web applications course project</h1>
<h2>Lappeenranta University of Technology - Summer 2023</h2>
<h3>Technologies used</h3>
<p>
  This project consists of Express.js backend that serves a React frontend. The backend database is a MongoDB database, 
  which connects to the Express.js backend with the MongoDB driver and Mongoose; this stack was used many times during the course, 
  and it proved to be an easy and highly flexible solution. The frontend uses Material UI on top of React to deliver
  a responsive web app with modern design. Authentication is done with JWT with Passport.js. The UI is translated to english and finnish 
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
  Pager on posts
</li>
<li>
  Admin account (to set user as admin, the flag needs to be raised from database shell (Mongosh)). Gives the user the ability to edit and delete posts and comments, in addition to deleting users and editing their usernames.
</li>
<li>
  Timestamps visible on posts and comments. If edited post, both createdAt and updatedAt are shown
</li>
<li>
  UI translation to two languages
</li>
<li>
  (Optional own feature) User settings: user can change their username/display name and delete their account. This way the users can keep their emails hidden (email is default username and used for logging in) and delete their accounts with all their posts and comments once they get enough of Internet. Admin has a management panel that has these same features regarding other users.
</li>
<h3>Installation</h3>
<p>
  The project's frontend needs to be built with <code>cd client && npm run build</code> in the root folder. The server folder requires a <code>.env</code> file that specifies
  a SECRET and PORT for the backend <code>SECRET="yourSecretGoesHere" PORT="portNumber"</code>. Finally the app can be deployed by running 
  <code>NODE_ENV=production npm start</code> in the root folder.
</p>
