/**
 *  @swagger
 * /pgs/comment/create/{id}:
 *   post:
 *     summary: Leave A Comment To Post.
 *     tags: [Comment-Model]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Id Of Post To Comment On.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               commentBody:
 *                 type: string
 *     responses:
 *       200:
 *         description: Good Job, Your Comment Sent SuccessFullyly.
 *       404:
 *         description: Post Not Available!.
 *       500:
 *         description: Failed To Leave A Comment To A Given Post!
 * 
 * /pgs/comment/getall/:
 *   get:
 *     summary: Viewing All comments in General.
 *     tags: [Comment-Model]
 *     responses:
 *       200:
 *         description: Available Coments Retrieved.
 *       500:
 *         description: Failed to retrieve Available comments.
 * 
 */