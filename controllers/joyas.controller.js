import { joyasModel } from "../models/joyas.model.js";
import { getDatabaseError } from "../lib/errors/database.error.js";

const read = async (req, res) => {
	const { limit = "null", page = 1, order_by = "id_ASC" } = req.query;

	try {
		const joyas = await joyasModel.findAll({ limit, page, order_by });
		return res.json(joyas);
	} catch (error) {
		console.log(error);

		if (error.code) {
			const { code, message } = getDatabaseError(error.code);
			return res.status(code).json({ message });
		}

		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const filters = async (req, res) => {
	const {
		precio_max,
		precio_min,
		categoria,
		metal,
	} = req.query;

	try {
		const joyas = await joyasModel.findFiltered({
			precio_max,
			precio_min,
			categoria,
			metal,
		});
		return res.json(joyas);
	} catch (error) {
		console.log(error);

		if (error.code) {
			const { code, message } = getDatabaseError(error.code);
			return res.status(code).json({ message });
		}

		return res.status(500).json({ message: "Internal Status Error " });
	}
};

const undefinedRoute = (req, res) => {
	res.status(404).send("Esta ruta no existe");
};

export const joyasController = {
	read,
	filters,
	undefinedRoute,
};
