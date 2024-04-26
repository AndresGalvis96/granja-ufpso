import { getProductModel, createProductModel, deleteProductModel, updateProductModel, updateProductInventory } from "../models/product.model.js";


export const getProducto = async (req, res) => {
    try {
        let productos= await getProductModel();
        res.json({ productos });
    return productos;
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: "Error al obtener los productos",
            error: error.message
        });
    }
};



export const createProducto = async (req, res) => {
    try {
        const { nombre, tipo, cantidad, fecha_registro, fecha_salida, id_animal } = req.body;

        if (!nombre || !tipo || !cantidad || !fecha_registro || !id_animal) {
            return res.status(400).send({
                success: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const nuevoProducto = await createProductModel(nombre, tipo, cantidad, fecha_registro, fecha_salida, id_animal);

        res.status(201).send({
            success: true,
            msg: "Producto creado con éxito",
            data: nuevoProducto.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: "Error al crear el producto",
            error: error.message
        });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).send({
                success: false,
                msg: "ID de producto inválido"
            });
        }

        await deleteProductModel(productId);

        res.status(200).send({
            success: true,
            msg: "Producto eliminado con éxito"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: "Error al eliminar el producto",
            error: error.message
        });
    }
};

export const updateProducto = async (req, res) => {
    try {
        const productId = req.params.id;
        const { nombre, tipo, cantidad, fecha_salida } = req.body;

        if (!productId || !nombre || !tipo || !cantidad || !fecha_salida) {
            return res.status(400).send({
                success: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const productoActualizado = await updateProductModel(productId, nombre, tipo, cantidad, fecha_salida);

        if (productoActualizado.rows.length === 0) {
            return res.status(404).send({
                success: false,
                msg: "Producto no encontrado"
            });
        }

        res.status(200).send({
            success: true,
            msg: "Producto actualizado con éxito",
            data: productoActualizado.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: "Error al actualizar el producto",
            error: error.message
        });
    }
};

export const updateProductoInventario = async (req, res) => {
    try {
        const productId = req.params.id;
        const { cantidad, fecha_salida } = req.body;

        if (!productId || !cantidad || !fecha_salida) {
            return res.status(400).send({
                success: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const productoActualizado = await updateProductInventory(productId, cantidad, fecha_salida);

        if (productoActualizado.rows.length === 0) {
            return res.status(404).send({
                success: false,
                msg: "Producto no encontrado"
            });
        }

        res.status(200).send({
            success: true,
            msg: "Inventario del producto actualizado con éxito",
            data: productoActualizado.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: "Error al actualizar el inventario del producto",
            error: error.message
        });
    }
};
