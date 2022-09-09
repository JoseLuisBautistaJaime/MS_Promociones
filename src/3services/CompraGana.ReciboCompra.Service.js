/* eslint-disable no-underscore-dangle */
import { log } from '../commons/log'
import { CompraGanaReciboCompraDAO } from '../3dao/CompraGana.ReciboCompra.DAO'
import { Conflict } from '../commons/responseExceptions'
// import { NotFoundCliente } from '../commons/responseExceptions'
// await client.index({
//   index: 'game-of-thrones',
//   body: {
//     character: 'Daenerys Targaryen',
//   quote: 'I am the blood of the dragon.'
//   }
// })

// const unixTimeStamp = (fecha, addSeconds) => toInteger(fecha.getTime() / 1000, 10) + toInteger(addSeconds)

/**
 * Establece el Estado de Activación.
 * @param {*} idReciboCompra Id del Recibo de Compra.
 * @param {*} idCliente Id del Cliente.
 * @param {*} montoCompra monto del recibo de compra.
 */
async function setReciboCompra(idReciboCompra, idCliente, montoCompra) {
  log.info('SERV: Iniciando setReciboCompra')
  const countReciboCompra = await CompraGanaReciboCompraDAO.countReciboCompra(idReciboCompra)
  if (countReciboCompra > 0)
    throw new Conflict({
      message: `Recibo de compra "${idReciboCompra}." Ya se encuentra registrado`,
      exceptionCode: 40901
    })

  const reciboCompra = {
    idCliente,
    montoCompra,
    fechaCompra: '2022-12-31'
  }
  await CompraGanaReciboCompraDAO.createReciboCompra(idReciboCompra, reciboCompra)
  log.info('SERV: Terminando setReciboCompra')
}

/**
 * Establece el Estado de Activación.
 * @param {*} idReciboCompra Id del Recibo de Compra.
 */
async function getReciboCompra(idReciboCompra) {
  log.info('SERV: Iniciando setReciboCompra')
  const countReciboCompra = await CompraGanaReciboCompraDAO.countReciboCompra(idReciboCompra)
  log.mark(countReciboCompra)
  const result = await CompraGanaReciboCompraDAO.getReciboCompra(idReciboCompra)
  log.info('SERV: Terminando setReciboCompra')
  return result._source
}

/**
 * Establece el Estado de Activación.
 * @param {*} idReciboCompra Id del Recibo de Compra.
 */
async function listadoByCliente(idCliente) {
  log.info('SERV: Iniciando listadoReciboCompra')
  const result = await CompraGanaReciboCompraDAO.listadoByCliente(idCliente)
  log.info('SERV: Terminando listadoReciboCompra')
  return result
}

/**
 * Establece el Estado de Activación.
 * @param {*} idReciboCompra Id del Recibo de Compra.
 */
async function removeReciboCompra(idReciboCompra) {
  const countReciboCompra = await CompraGanaReciboCompraDAO.countReciboCompra(idReciboCompra)
  if (countReciboCompra === 0)
    throw new Conflict({
      message: `Recibo de compra "${idReciboCompra}." NO se encuentra registrado`,
      exceptionCode: 40902
    })
  const result = await CompraGanaReciboCompraDAO.removeReciboCompra(idReciboCompra)
  return result
  // await CompraGanaReciboCompraDAO.removeReciboCompra(idReciboCompra)
  // return { status: 'DELETED', message: `El recibo "${idReciboCompra}" ha sido eliminado` }
}

/**
 * Establece el Estado de Activación.
 * @param {*} idReciboCompra Id del Recibo de Compra.
 */
async function tryRemoveReciboCompra(idReciboCompra) {
  const countReciboCompra = await CompraGanaReciboCompraDAO.countReciboCompra(idReciboCompra)
  if (countReciboCompra > 0) await CompraGanaReciboCompraDAO.removeReciboCompra(idReciboCompra)
  return { status: 'DELETED', message: `El recibo "${idReciboCompra}" se encuentra eliminado` }
}

async function createIndex(settings) {
  return CompraGanaReciboCompraDAO.createIndex(settings)
}

export const CompraGanaReciboCompraService = {
  setReciboCompra,
  getReciboCompra,
  listadoByCliente,
  removeReciboCompra,
  tryRemoveReciboCompra,
  createIndex
}
