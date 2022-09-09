export const paramsSchemaCliente = {
  properties: {
    idCliente: {
      type: 'string',
      required: true
    }
  },
  additionalProperties: false
}

export const paramsSchemaReciboCompra = {
  properties: {
    idReciboCompra: {
      type: 'string',
      required: true
    }
  },
  additionalProperties: false
}

export const querySchemaCliente = {
  properties: {
    idCliente: {
      type: 'string',
      required: true
    }
  },
  additionalProperties: true
}

export const bodySchemaReciboCompra = {
  properties: {
    idCliente: { type: 'string', required: true },
    montoCompra: { type: 'number', required: true }
  },
  additionalProperties: false
}
