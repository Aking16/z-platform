/**
* @swagger
* components:
*   schemas:
*     post:
*       type: object
*       properties:
*         id:
*           type: string
*           description: PostID.
*           example: 65bf142c-1016-4a3a-912f-bb48458845ae
*         body:
*           type: string
*           description: Post.
*           example: "Hello World!"
*         createdAt:
*           type: string
*           format: date-time
*           description: Time of post creaition.
*         updatedAt:
*           type: string
*           format: date-time
*           description: Time of post update.
*         userId:
*           type: string
*           description: ID of author.
*           example: "6e58944f-89b1-48c0-853d-cf0a6c4b4df2"
*         likedIds:
*           type: string[]
*           description: String array with UserIDs that liked the post in it.
*           example: [6e58944f-89b1-48c0-853d-cf0a6c4b4df2, 6e58944f-89b1-48c0-853d-cf0a6c4b4db5]
*
*     user:
*       type: object
*       properties:
*         id:
*           type: string
*           description: UserID.
*           example: 6e58944f-89b1-48c0-853d-cf0a6c4b4df2
*         name:
*           type: string
*           example: "Amirhossein Amiri!"
*         bio:
*           type: string
*           example: "This is my bio!"
*         username:
*           type: string
*           example: "Aking16"
*         hashedPassword:
*           type: string
*           description: Uses bcrypt to encrypt the password.
*           example: "$2b$12$bXkE4Pm8IvAacG9tdrusmOAsrCnSXQB2y2N0AFXiUUfyC26CPmJRi"
*         email:
*           type: string
*           example: "admin@z.com"
*         coverImage:
*           type: string
*           example: "http://localhost:3000/upload/cover-images/coverImage1.jpg"
*         profileImage:
*           type: string
*           example: "http://localhost:3000/upload/profile-images/profileImage1.jpg"
*         createdAt:
*           type: string
*           format: date-time
*           description: Time of post creaition.
*         updatedAt:
*           type: string
*           format: date-time
*           description: Time of post update.
*         followingIds:
*           type: string[]
*           description: String array with UserIDs that followed the user.
*           example: [6e58944f-89b1-48c0-853d-cf0a6c4b4df2, 6e58944f-89b1-48c0-853d-cf0a6c4b4db5]
*         hasNotification:
*           type: boolean
*
*     notification:
*       type: object
*       properties:
*         id:
*           type: string
*           description: NotificationID.
*           example: ac1ec629-0ad8-464b-ab02-7e92b66c9262
*         body:
*           type: string
*           example: "Amirhossein Amiri replied to your post!"
*         createdAt:
*           type: string
*           format: date-time
*           description: Time of notifcation creaition.
*         userId:
*           type: string
*           description: ID of notification owner.
*           example: "6e58944f-89b1-48c0-853d-cf0a6c4b4df2"
*
*     comment:
*       type: object
*       properties:
*         id:
*           type: string
*           description: NotificationID.
*           example: 421c44f9-4c7e-46dc-9f5e-f6ab42df8bfc
*         body:
*           type: string
*           example: "Hello JS!"
*         createdAt:
*           type: string
*           format: date-time
*           description: Time of notifcation creaition.
*         userId:
*           type: string
*           description: ID of comment owner.
*           example: "6e58944f-89b1-48c0-853d-cf0a6c4b4df2"
*         postId:
*           type: string
*           description: ID of commented post.
*           example: "5bf142c-1016-4a3a-912f-bb48458845ae"
*/