import db from "../db/db.mjs";
import fs from 'fs';
export const changeImages = (req, res) => {
  const { id } = req.params;
  if (!req.files) {
    return res.status(400).json("not validation!");
  }
  db("blogs")
    .where("id", "=", id)
    .update({
      image1: req.files[0].filename,
      image2: req.files[1].filename,
      image3: req.files[2].filename,
    })
    .returning("*")
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => res.status(400).json("error"));
};

export const uploadImages = (req, res) => {
  if (!req.files) {
    return res.status(400).json("not validation!");
  }
  res.json(req.files);
};

export const createPost = (req, res) => {
  const {
    title,
    content1,
    content2,
    content3,
    image1,
    image2,
    image3,
    dateblog,
    showed,
  } = req.body;
  if (!title || !image1 || !image2 || !image3 || !dateblog) {
    return res.status(400).json("not valid!");
  }
  if (image1 === image2 && image2 === image3) {
    return res.status(400).json("not validation with images");
  }
  db("blogs")
    .insert({
      title,
      content1,
      content2,
      content3,
      image1,
      image2,
      image3,
      dateblog,
      showed,
    })
    .returning("*")
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => console.log(err));
};

export const updatePost = (req, res) => {
  const {
    title,
    content1,
    content2,
    content3,
    image1,
    image2,
    image3,
    id,
    removeImages,
  } = req.body;
  if (!title || !id) {
    return res.status(400).json("not validation");
  }
  if (removeImages === true) {
    // remove existed images if we update image in here!
    const arrayOfImages = [image1, image2, image3];
    arrayOfImages.forEach((items) => {
      fs.unlinkSync(`../img/images/${items}`);
    });
  }
  db("blogs")
    .where("id", "=", id)
    .update({
      title: title,
      content1: content1,
      content2: content2,
      content3: content3,
    })
    .returning("*")
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(400).json("error");
    });
};
