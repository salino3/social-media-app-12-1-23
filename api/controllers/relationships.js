import { db } from "../connects.js";
import jwt from "jsonwebtoken";

//* getRelationships
export const getRelationships = (req, res) => {
  const q = "SELECT followerUserId FROM relationships WHERE followedUserId = (?)";

  if (res) {
    db.query(q, [req.query.followedUserId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((relationship) => relationship.followerUserId));
    });
  }
};

//* addRelationship
export const addRelationship = (req, res) => {
  console.log("addLike works..");

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not token found!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)";

    const values = [userInfo.id, req.body.userId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

//* deleteRelationship
export const deleteRelationship = (req, res) => {
  console.log("deleteLike works..");

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not token found!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const q = "DELETE FROM relationships WHERE `followerUserId` = (?) AND `followedUserId` = (?)";

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    });
  });
};
