import * as AnimalModel from "../models/animal.model.js";

export const createAnimal = async (req, res) => {
  try {
    const { nombre, tipo, fecha_ingreso, fecha_sacrificio } = req.body;
    const newAnimal = await AnimalModel.createAnimalModel(nombre, tipo, fecha_ingreso, fecha_sacrificio);
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimals = async (req, res) => {
  try {
    const animales = await AnimalModel.getAnimalsModel();
    console.log(animales);
    res.json(animales);
    return animales;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAnimal = async (req, res) => {
  try {
    const { id_animal, nombre, tipo, fecha_ingreso, fecha_sacrificio } = req.body;
    const updatedAnimal = await AnimalModel.updateAnimalModel(id_animal, nombre, tipo, fecha_ingreso, fecha_sacrificio);
    res.status(200).json(updatedAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const processAnimal = async (req, res) => {
  try {
    const { id_animal, nueva_fecha_sacrificio } = req.body;
    const processedAnimal = await AnimalModel.processAnimalModel(id_animal, nueva_fecha_sacrificio);
    res.status(200).json(processedAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
