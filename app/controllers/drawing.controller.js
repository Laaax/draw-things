const db = require("../models");
const Drawing = db.drawings;
const Comment = db.comments;

// Create and Save a new Drawing
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.title.trim()) {
    res.status(400).send({ message: "Title is be empty" });
    return;
  }

  // Create a drawing
  const drawing = new Drawing({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  });

  // Save drawing in the database
  drawing
    .save(drawing)
    .then(data => {
      res.send({ message: "Saved drawing!" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error"
      });
    });
};

// Retrieve all Drawings from the database.
exports.findAll = (req, res) => {
  const page = req.query.page;

  Drawing.find().sort({ createdAt: -1}).skip((page - 1) * 12).limit(12)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving drawings."
      });
    });
};

exports.getDrawingCount = (req, res) => {
  Drawing.find().count()
  .then(data => {
    res.send({pages: Math.ceil(data/12)});
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error" });
  });
}

// Find a single Drawing with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Drawing.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Not found drawing" });
      }
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving drawing" });
    });
};

// Delete a Drawing with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Drawing.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Could not delete drawing`
        });
      } else {
        Comment.deleteMany({ drawing: id })
          .then(data => {
            res.send({
              message: "Drawing deleted"
            });
          })
          .catch(err => {
            res.status(500).send({
              message: "Comments not deleted"
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete drawing"
      });
    });
};

// Delete all Drawings from the database.
// exports.deleteAll = (req, res) => {
//   Drawing.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Drawings were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all drawings."
//       });
//     });
// };

exports.getDrawingsByUser = (req, res) => {
  const page = req.query.page;
  Drawing.find({author: req.params.username}).skip((page - 1) * 9).limit(9)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error" });
  });
}

exports.getUserDrawingCount = (req, res) => {
  let query = Drawing.find({author: req.params.username});
  query.count()
  .then(data => {
    res.send({pages: Math.ceil(data/9)});
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error" });
  });
}

exports.rate = (req, res) => {
  let id = req.params.id;
  let num = req.query.number;
  let username = req.session.username;

  if (!username) {
    res.status(400).send({
      message:
        "Not logged in"
    });
    return;
  }

  let userRating = {user: username, rating: num};
  if (num == 1) {
    Drawing.findByIdAndUpdate(id, {$pull:{'userRating': {'user': username}}})
    .then(data => {
      Drawing.findByIdAndUpdate(id, {$push:{'userRating': userRating}})
      .then(data => {
        res.send({
        message: 'Rate success'
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error"
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error"
      });
    });
    return;
  } else if (num == 2) {
    Drawing.findByIdAndUpdate(id, {$pull:{'userRating': {'user': username}}})
    .then(data => {
      Drawing.findByIdAndUpdate(id, {$push:{'userRating': userRating}})
      .then(data => {
        res.send({
        message: 'Rate success'
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error"
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error"
      });
    });
    return;
  } else if (num == 3) {
    Drawing.findByIdAndUpdate(id, {$pull:{'userRating': {'user': username}}})
    .then(data => {
      Drawing.findByIdAndUpdate(id, {$push:{'userRating': userRating}})
      .then(data => {
        res.send({
        message: 'Rate success'
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error"
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error"
      });
    });
    return;
  } else if (num == 4) {
    Drawing.findByIdAndUpdate(id, {$pull:{'userRating': {'user': username}}})
    .then(data => {
      Drawing.findByIdAndUpdate(id, {$push:{'userRating': userRating}})
      .then(data => {
        res.send({
        message: 'Rate success'
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error"
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error"
      });
    });
    return;
  } else if (num == 5) {
    Drawing.findByIdAndUpdate(id, {$pull:{'userRating': {'user': username}}})
    .then(data => {
      Drawing.findByIdAndUpdate(id, {$push:{'userRating': userRating}})
      .then(data => {
        res.send({
        message: 'Rate success'
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error"
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error"
      });
    });
    return;    
  } else {
    res
      .status(400)
      .send({ message: "Invalid rating" });
  }
}

// pull
//https://stackoverflow.com/questions/14763721/mongoose-delete-array-element-in-document-and-save

exports.getRating = (req, res) => {
  let rated;
  Drawing.findById(req.params.id)
  .then(data => {
    let r = data.userRating;
    let sum = 0; // sum of weighted ratings
    let total = 0; // total number of ratings
    for (let e of r) {
      sum += e.rating;
      total += 1;
      if (req.session.username && (req.session.username === e.user)) {
        rated = e.rating
      }
    }
    let result = Math.round(sum / total);
    res.send({ rating: result, rated: rated});
  })
  .catch(err => {
    res.status(500).send({
      message: "Error"
    });
  });
}