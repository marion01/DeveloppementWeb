import Posts from "./controller";
import express from "express";
import multer from "multer"
import { verifyJWT_MW } from "../../middleWare/auth.js"
import bodyParser from "body-parser"

/*
 * Routes of posts
 */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "data/");
    },
    filename: function (req, file, cb) {
        var date = new Date();
        date = date.toDateString();
        cb(null, date + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage })
const type = upload.single("photo");


const routes = express.Router();

routes.use(bodyParser.json());
routes.all("/*", verifyJWT_MW);

routes.route("").get(Posts.get);
routes.route("/:id").get(Posts.getById);
routes.route("/post").post(Posts.post);
routes.route("/post/update").post(Posts.update);
routes.route("/imageByPostId/:id").get(Posts.getImageByPostId);
routes.route("/imageByName/:name").get(Posts.getImageByName);
routes.route("/getPostsOfAutor/:id").get(Posts.getPostsOfAutor);
routes.post("/postImage", type, Posts.postImg);
routes.route("/delete/:id").delete(Posts.delete);
routes.route("/deleteImg/:file").post(Posts.deleteImg);
routes.route("/page/all").get(Posts.getByPage);
routes.route("/page/:id").get(Posts.getByPageForUser);
routes.route("/count/all").get(Posts.count);
routes.route("/countForUser/:id").get(Posts.countForUser);

export default routes;