import {db} from '../connects.js';
import jwt from 'jsonwebtoken';

//* getLikes
export const getLikes = (req, res) => {


     const q = "SELECT userId FROM likes WHERE postId = ?";

   if(res){
     db.query(q, [req.query.postId], (err, data) => {
       if (err) return res.status(500).json(err);
       return res.status(200).json(data.map(like => like.userId));
     });
   }
};

//* addLike
export const addLike = (req, res) => {

   console.log("addLike works..");
   
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not token found!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const q =
      "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

    const values = [
      userInfo.id,
      req.body.postId,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked!");
    });
  });
};


//* deleteLike
export const deleteLike = (req, res) => {

  console.log("deleteLike works..");

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not token found!");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";


    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post is not liked now");
    });
  });
};



//! Consejo 
// export const deleteLikeV2 = (req, res) => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     return res.status(401).json("Not token found!");
//   }

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) {
//       return res.status(403).json("Token is not valid!");
//     }

//     // Agregar consulta adicional para verificar si el usuario actualmente autenticado es el mismo que creó el "like"
//     const q1 = "SELECT * FROM likes WHERE `userId` = ? AND `postId` = ?";
//     db.query(q1, [userInfo.id, req.query.postId], (err, data) => {
//       if (err) return res.status(500).json(err);

//       // Si no se encuentra ningún "like" creado por el usuario actualmente autenticado, devolver un error
//       if (data.length === 0)
//         return res.status(403).json("You didn't create this like");

//       // Si se encuentra un "like" creado por el usuario actualmente autenticado, eliminarlo
//       const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
//       db.query(q, [userInfo.id, req.query.postId], (err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.status(200).json("Post is not liked now");
//       });
//     });
//   });
// };
