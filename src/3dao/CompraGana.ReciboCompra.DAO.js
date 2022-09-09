/* eslint-disable no-underscore-dangle */
import { toInteger } from 'lodash'
import { log } from '../commons/log'
import { client } from '../commons/connection-elastic'

/**
 * Registra un nuevo Recibo de Compra para la campaña de Compra y GANA.
 * @param {*} idReciboCompra El Id del Recibo de Compra.
 * @param {*} reciboCompra Objeto de Recibo de Compra.
 * @returns
 */
export async function createReciboCompra(idReciboCompra, reciboCompra) {
  log.info('DAO: Iniciando createReciboCompra')
  const today = Date.now()
  const result = await client.index({
    index: 'compragana-recibocompra',
    id: idReciboCompra,
    op_type: 'create',
    body: {
      idCliente: reciboCompra.idCliente,
      montoCompra: reciboCompra.montoCompra,
      fechaCompra: reciboCompra.fechaCompra,
      fechaRegistro: today
    }
  })
  log.debugJSON('cliente.index.create', result)
  log.info('DAO: Terminando createReciboCompra')
  return result
}

/**
 * Obtiene un Recibo de Compra de la campaña Compra y Gana.
 * @param {*} idReciboCompra El Id del Recibo de Compra.
 * @returns
 */
export async function getReciboCompra(idReciboCompra) {
  log.info('DAO: Iniciando getReciboCompra')
  const result = await client.get({
    index: 'compragana-recibocompra',
    id: idReciboCompra
  })
  log.info('DAO: Terminando getReciboCompra')
  return result
}

/**
 * Obtiene un Recibo de Compra de la campaña Compra y Gana.
 * @param {*} idReciboCompra El Id del Recibo de Compra.
 * @returns
 */
export async function countReciboCompra(idReciboCompra) {
  log.info('DAO: Iniciando countReciboCompra')
  const result = await client.count({
    query: {
      match: {
        _id: idReciboCompra
      }
    }
  })
  log.debugJSON('cliente.count', result)
  log.info('DAO: Terminando countReciboCompra')
  return toInteger(result.count)
}

/**
 * Elimina un Recibo de Compra de la campaña Compra y Gana.
 * @param {*} idReciboCompra El Id del Recibo de Compra.
 * @returns
 */
export async function removeReciboCompra(idReciboCompra) {
  log.info('DAO: Iniciando deleteReciboCompra')
  // const result = await client.delete({
  //   index: 'compragana-recibocompra',
  //   id: idReciboCompra
  // })
  const result = await client.deleteByQuery({
    wait_for_completion: true,
    index: 'compragana-recibocompra',
    query: {
      match: {
        _id: idReciboCompra
      }
    }
  })
  log.debugJSON('cliente.delete', result)
  log.info('DAO: Terminando deleteReciboCompra')
  return result
}

export async function listadoByCliente(idCliente) {
  log.info('DAO: Iniciando listadoReciboCompra')
  const result = await client.search({
    query: {
      bool: {
        filter: [
          {
            term: {
              idCliente
            }
          }
        ]
      }
    }
  })
  const listado = {}
  listado.items = result.hits.hits.map(item => ({
    idReciboCompra: item._id,
    ...item._source
  }))
  log.info('DAO: Terminando listadoReciboCompra')
  return listado
}

export async function createIndex() {
  log.info('DAO: Iniciando createIndex')
  try {
    await client.indices.create({
      index: 'compragana-recibocompra',
      mappings: {
        properties: {
          idCliente: { type: 'keyword', index: true },
          montoCompra: { type: 'double' },
          fechaCompra: { type: 'date' },
          fechaRegistro: { type: 'date' }
        }
      }
    })
  } catch (err) {
    log.mark(err)
  }
  // log.mark(result)
  log.info('DAO: Terminando createIndex')
}

export const CompraGanaReciboCompraDAO = {
  createReciboCompra,
  removeReciboCompra,
  getReciboCompra,
  countReciboCompra,
  listadoByCliente,
  createIndex
}
