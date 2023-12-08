const SchemaPosts = {
/**
* @swagger
* components:
*   schemas:
*     posts:
*       type: object
*       properties:
*         ID:
*           type: string
*           description: PostID.
*           example: 65bf142c-1016-4a3a-912f-bb48458845ae
*         Body:
*           type: string
*           description: Post.
*           example: "Hello World!"
*         CreatedAt:
*           type: string
*           format: date-time
*           description: Time of post creaition.
*         UpdatedAt:
*           type: string
*           format: date-time
*           description: Time of post update.
*         UserID:
*           type: string
*           description: ID of author.
*           example: "6e58944f-89b1-48c0-853d-cf0a6c4b4df2"
*         LikedIDs:
*           type: string[]
*           description: String array with UserIDs that liked the post in it.
*           example: [6e58944f-89b1-48c0-853d-cf0a6c4b4df2, 6e58944f-89b1-48c0-853d-cf0a6c4b4db5]
*/
}