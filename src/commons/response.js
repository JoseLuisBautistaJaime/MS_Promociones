/* eslint-disable no-param-reassign */
const Ok = (res, data) => {
  const info = {}
  if (data === undefined) data = {}
  if (data.status === undefined) info.status = 'SUCCESS'
  if (data.code === undefined) info.code = 'NMP.PROMOCIONES.200'
  if (data.message === undefined) info.message = 'Se ha realizado correctamente la operación.'
  return res.status(200).send({ ...data, ...info })
}

const Created = (res, data) => {
  const info = {
    code: 'NMP.PROMOCIONES.201',
    status: 'CREATED',
    message: 'Se ha realizado correctamente la operación.'
  }
  return res.status(201).send({ ...data, ...info })
}

const Deleted = (res, data) => {
  const info = {
    code: 'NMP.PROMOCIONES.200',
    status: 'DELETED',
    message: 'El elemento ha sido eliminado.'
  }
  return res.status(200).send({ ...data, ...info })
}

export const Response = {
  Ok,
  Created,
  Deleted
}
