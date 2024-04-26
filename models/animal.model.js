import pgService from "../services/pg.services.js";

const con = new pgService();

export const createAnimalModel = async (nombre, tipo, fecha_ingreso, fecha_sacrificio) => {
  const query = {
    text: "INSERT INTO animal (nombre, tipo, fecha_ingreso, fecha_sacrificio) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [nombre, tipo, fecha_ingreso, fecha_sacrificio],
  };
  const result = await con.connection.query(query);
  return result.rows[0];
};

export const getAnimalsModel = async () => {
  const animales = await con.connection.query('SELECT * FROM public.animal');
  return animales;
};

export const updateAnimalModel = async (id_animal, nombre, tipo, fecha_ingreso, fecha_sacrificio) => {
  const query = {
    text: "UPDATE animal SET nombre = $1, tipo = $2, fecha_ingreso = $3, fecha_sacrificio = $4 WHERE id_animal = $5 RETURNING *",
    values: [nombre, tipo, fecha_ingreso, fecha_sacrificio, id_animal],
  };
  const result = await con.connection.query(query);
  return result.rows[0];
};

export const processAnimalModel = async (id_animal, nueva_fecha_sacrificio) => {
  const query = {
    text: "UPDATE animal SET fecha_sacrificio = $1 WHERE id_animal = $2 RETURNING *",
    values: [nueva_fecha_sacrificio, id_animal],
  };
  const result = await con.connection.query(query);
  return result.rows[0];
};
