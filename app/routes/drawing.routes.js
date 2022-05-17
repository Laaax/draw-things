module.exports = app => {
  const drawings = require("../controllers/drawing.controller.js");

  var router = require("express").Router();

  // Create a new drawing
  router.post("/", drawings.create);

  // Retrieve all drawings
  router.get("/", drawings.findAll);

  router.get("/count", drawings.getDrawingCount);

  // Retrieve drawings by author
  router.get("/:username", drawings.getDrawingsByUser);

  router.get("/:username/count", drawings.getUserDrawingCount);

  router.get("/drawing/:id", drawings.findOne);

  router.delete("/drawing/:id", drawings.delete);

  router.post("/drawing/:id", drawings.rate);

  router.get("/drawing/:id/rating", drawings.getRating);

  // router.delete("/", drawings.deleteAll);

  app.use('/api/drawings', router);
};