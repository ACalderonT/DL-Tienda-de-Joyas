import "dotenv/config";
import format from "pg-format";
import { pool } from "../database/connection.js";

const BASE_URL =
	process.env.NODE_ENV === "production"
		? process.env.DOMAIN_URL_APP
		: `http://localhost:${process.env.PORT}`;

const DEFAULT_COLUMN = "id";
const DEFAULT_DIRECTION = "ASC";
const VALID_COLUMNS = ["nombre", "categoria", "metal", "precio", "stock"];
const VALID_DIRECTION = ["ASC", "DESC"];

const findAll = async ({ limit = "null", page = 1, order_by = "id_ASC" }) => {
	const offset = limit === "null" ? 0 : (page - 1) * limit;
	let [campo, direccion] = order_by.split("_");

	if (!VALID_COLUMNS.includes(campo)) campo = DEFAULT_COLUMN;
	if (!VALID_DIRECTION.includes(direccion)) direccion = DEFAULT_DIRECTION;

	const query = "SELECT * FROM inventario ORDER BY %I %s LIMIT %s OFFSET %s";
	const formattedQuery = format(query, campo, direccion, limit, offset);

	const { rows: joyas } = await pool.query(formattedQuery);

	const response = prepararHATEOAS(joyas);

	return response;
};

const prepararHATEOAS = (joyas) => {
	let stockTotal = 0;
	const results = joyas.map((joya) => {
		stockTotal += joya.stock;
		return {
			name: joya.nombre,
			href: `${BASE_URL}/joyas/joya/${joya.id}`,
		};
	});

	const total = joyas.length;
	const HATEOAS = {
		totalJoyas: total,
		stockTotal,
		results,
	};

	return HATEOAS;
};

const findFiltered = async ({ precio_max, precio_min, categoria, metal }) => {
	let filtros = []
	const values = []

	const agregarFiltro = (campo, comparador, valor) => {
		values.push(valor)
		const { length } = filtros
		filtros.push(`${campo} ${comparador} $${length + 1}`)
	}

	if(precio_max) agregarFiltro('precio', '<=', precio_max)
	if(precio_min) agregarFiltro('precio', '>=', precio_min)
	if(categoria) agregarFiltro('categoria', '=', categoria)
	if(metal) agregarFiltro('metal', '=', metal)


	let query = "SELECT * FROM inventario "

	if(filtros.length > 0){
		filtros = filtros.join(" AND ")
		query += ` WHERE ${filtros}`
	}

	const { rows: joyas } = await pool.query(query, values)

	return joyas
}


export const joyasModel = {
	findAll,
	findFiltered,
};
