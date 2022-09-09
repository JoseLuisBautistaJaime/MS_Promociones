/* eslint-disable prettier/prettier */
import { CompraGanaReciboCompraService } from '../3services/CompraGana.ReciboCompra.Service'
import { invokeController } from '../commons/invokeController'
import { bodySchemaReciboCompra, paramsSchemaReciboCompra, querySchemaCliente } from '../9validator/CompraGana.ReciboCompra.Validator'

/**
 * Registra un Recibo de Compra a un Cliente.
 * @param {*} req Request del Controller
 * @param {*} res Response del Controller
 * @returns
 */
const setReciboCompra = async (req, res) =>
  invokeController('setReciboCompra', 201, req, res, { paramsSchema: paramsSchemaReciboCompra, bodySchema: bodySchemaReciboCompra }, async reqX =>
    CompraGanaReciboCompraService.setReciboCompra(reqX.params.idReciboCompra, reqX.body.idCliente, reqX.body.montoCompra)
  )

/**
 * Registra un Recibo de Compra a un Cliente.
 * @param {*} req Request del Controller
 * @param {*} res Response del Controller
 * @returns
 */
const getReciboCompra = async (req, res) =>
  invokeController('getReciboCompra', 200, req, res, { paramsSchema: paramsSchemaReciboCompra }, async reqX =>
    CompraGanaReciboCompraService.getReciboCompra(reqX.params.idReciboCompra)
  )

/**
 * Remueve un Recibo de Compra a un Cliente.
 * @param {*} req Request del Controller
 * @param {*} res Response del Controller
 * @returns
 */
const removeReciboCompra = async (req, res) =>
  invokeController('removeReciboCompra', 200, req, res, { paramsSchema: paramsSchemaReciboCompra }, async reqX =>
    CompraGanaReciboCompraService.removeReciboCompra(reqX.params.idReciboCompra)
  )

/**
 * Registra un Recibo de Compra a un Cliente.
 * @param {*} req Request del Controller
 * @param {*} res Response del Controller
 * @returns
 */
const listadoByCliente = async (req, res) =>
  invokeController('listadoByCliente', 200, req, res, { querySchema: querySchemaCliente }, async reqX =>
    CompraGanaReciboCompraService.listadoByCliente(reqX.query.idCliente)
  )

/**
 * Registra un Recibo de Compra a un Cliente.
 * @param {*} req Request del Controller
 * @param {*} res Response del Controller
 * @returns
 */
const createIndex = async (req, res) =>
  invokeController('createIndex', 201, req, res, { querySchema: querySchemaCliente }, async reqX =>
    CompraGanaReciboCompraService.createIndex(reqX.query.idCliente)
  )

export const CompraGanaReciboCompraController = {
  setReciboCompra,
  getReciboCompra,
  listadoByCliente,
  removeReciboCompra,
  createIndex
}
