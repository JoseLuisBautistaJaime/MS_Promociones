/* eslint-disable max-classes-per-file */
export class ValidationHeaderException {
  constructor(message) {
    this.name = 'Header Validation'
    this.code = 'NMP.CUENTASDIGITALES.400'
    this.statusCode = 400
    this.exceptionCode = 40001
    this.message = message.message
  }
}

export class ValidationException {
  constructor(message) {
    this.name = 'Shema Validation'
    this.code = 'NMP.CUENTASDIGITALES.400'
    this.statusCode = 400
    this.exceptionCode = message.exceptionCode
    this.message = message.message
  }
}

export class NotFoundCliente {
  constructor(message) {
    this.name = 'Not Found - Cliente'
    this.code = 'NMP.CUENTASDIGITALES.404'
    this.statusCode = 404
    this.exceptionCode = 40404
    this.message = message.message
  }
}

export class Conflict {
  constructor(message) {
    this.name = 'Conflict'
    this.code = 'NMP.PROMOCIONES.409'
    this.statusCode = 409
    this.exceptionCode = message.exceptionCode
    this.message = message.message
  }
}

export class InternalServerError {
  constructor(message) {
    this.name = 'Internal Server Error'
    this.code = 'NMP.CUENTASDIGITALES.500'
    this.statusCode = 500
    this.exceptionCode = message.exceptionCode
    this.message = message.message
    this.mergeVariables = null
    this.stack = null
  }
}

export class CuentaBloqueadaException {
  constructor(message) {
    this.name = 'Cuenta Bloqueada'
    this.code = 'NMP.CUENTASDIGITALES.203'
    this.statusCode = 203
    this.exceptionCode = message.exceptionCode
    this.message = message.message
  }
}

export class VerificarOtpError {
  constructor(message) {
    this.name = 'Verificar Otp Error'
    this.code = 'NMP.CUENTASDIGITALES.203'
    this.statusCode = 203
    this.exceptionCode = message.exceptionCode
    this.message = message.message
  }
}
