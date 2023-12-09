const Tour = require("../models/tour");

const fetchNotes = async (req, res) => {
  const tours = await Tour.find();
  res.json(tours);
};

const fetchNote = async (req, res) => {
  const tourId = req.params.id;
  const tour = await Tour.findById(tourId);

  res.json(tour);
};

const createNote = async (req, res) => {
  const { title, description, image, price } = req.body;

  const tour = await Tour.create({
    title,
    description,
    image,
    price,
  });

  res.json({ tour });
};

const updateNote = async (req, res) => {
  const tourId = req.params.id;

  const { title, description, image, price } = req.body;

  await Tour.findByIdAndUpdate(tourId, {
    title,
    description,
    image,
    price,
  });

  const tour = await Tour.findById(tourId);

  res.json(tour);
};

const deleteNote = async (req, res) => {
  const tourId = req.params.id;
  await Tour.deleteOne({ _id: tourId });
  res.json({ message: "Tour Deleted" });
};

module.exports = { fetchNote, fetchNotes, createNote, updateNote, deleteNote };
