# MERN-Stack-Project-Modern-Real-Estate-Marketplace
This is my MERN Stack project that is basically MERN stack Real Estate Marketplace.
Firstly we setup project.
1: Installation of react with vite and tailwind css with vite.
2: installation of necessary extensions.(ES7, tailwindCSs intellisense, prettier, console ninja, auto Rename Tag)
3: Initialize git.
4: install react router dom ( npm i react-router-dom  ) 
5: creating pages and routes (src => creat folder pages > About.jsx, Home.jsx,Profile.jsx, SignIn.jsx, SignUp.jsx)
6: create routes using react router dom
7: Create Header Component
npm i react-icons  (for use of icons)

8: API :
make a folder of API(separate from client). 
go to the root folder (cd ..)
(MERN-ESTATE) npm init -y
Make file index.js in api as the package.json has it.
npm i nodemon and express. after creating & running server
connect the database. npm i mongoose 
create user model(make a folder (models) in api and make a file in models(user.model.js)).
create test api route(make 2 more folders(controllers, routes) in api)
controllers(fucnctions(req,res))
routes(routes of users(router.get))
Authentication: ( as the authentication is very important so we have to create a separate file for this)
create sign up api route (create username,email and password) from client side and store it in database.
auth.route.js(router.post)  in routes and auth 
we install insomnia for for storing user as a test.
insomnia => create collection => mern-state =>  clicked create.
New Folder => auth => sign up
post localhose:3000/api/auth/signup (send) => body=> json {"uername":"","email":"" , "password": ""}
now we have to check the database to make sure that user has created
We have to hash the password to avoide hacking by encryption.(npm i bcryptjs)
creat a middleware a function to handle error.
we use to add a function in api(utils/error.js) to throw error(someone has added a password with not enough characters.)
Sign up Ui page: