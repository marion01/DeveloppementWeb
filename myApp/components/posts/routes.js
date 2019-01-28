import Posts from "./controller";
import express from "express";
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "data/");
    },
    filename: function (req, file, cb) {
        let date = new Date();
        cb(null, date.toDateString() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage })
const type = upload.single("photo");


const routes = express.Router();

routes.route("").get(Posts.get);
routes.route("/:id").get(Posts.getById);
routes.route("/post").post(Posts.post);
routes.route("/update").post(Posts.update);
routes.route("/imageByPostId/:id").get(Posts.getImageByPostId);
routes.route("/imageByName/:name").get(Posts.getImageByName);
routes.route("/getPostsOfAutor/:id").get(Posts.getPostsOfAutor);
routes.post("/postImage", type, Posts.postImg);

export default routes;