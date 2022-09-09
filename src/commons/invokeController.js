/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import { isEmpty } from 'lodash'
import { log } from './log'
import { validateParams, validateBody, validateHeaderOAG, validateQuery, validateSchemaEMPTY } from './validations'
import { Response } from './response'

/** - Este metodo ejecuta antes de inciar la ejecución del contenido principal del servicio del método.
 * De forma sencilla, muestra de forma clara toda la información básica proveniente del externo.
 * Valida los PARAMETROS, QUERY y BODY, con los esquemás especificos.
 * @param {*} req Es el request proveniente de Controller que se esta ejecutando.
 * @param {*} nameMethod Se especifica una etiqueta o identificación del método que se esta ejecutando.
 * @param {*} evalOAG true/false, para especificar si se va a evaluar el OAG.
 * @param {*} paramsSchema Valida los datos de tipo parametros dentro del URL ejemplo: "{url}/cliente/{idCliente}/", donde el dato idCliente es de tipo parametro.
 * @param {*} querySchema Valida las datos de tipo query, que provienen del URL ejemplo: "{url}/cliente?idCliente=99999", donde el dato idCliente es de tipo Query.
 * @param {*} bodySchema Valida las datos de tipo body, o el contenido principal.
 */
const iniciando = async (req, nameMethod, evalOAG, paramsSchema, querySchema, bodySchema) => {
  log.info('')
  log.info('\x1b[36m*******************************************************************\x1b[0m')
  log.info(`\x1b[36m*** CTRL: Iniciando Método\x1b[0m ${nameMethod}\x1b[36m.\x1b[0m`)
  if (req.header('testDesc')) log.info(`\x1b[36m*** TestTag:\x1b[0m ${req.header('testDesc')}`)
  log.info('\x1b[36m-------------------------------------------------------------------\x1b[0m')
  if (!isEmpty(req.params)) log.info(`\x1b[36m-- Request.params:\x1b[0m ${JSON.stringify(req.params)}`)
  if (!isEmpty(req.query)) log.info(`\x1b[36m-- Request.query:\x1b[0m ${JSON.stringify(req.query)}`)
  if (!isEmpty(req.body)) log.info(`\x1b[36m-- Request.body:\x1b[0m ${JSON.stringify(req.body)}`)
  log.info('\x1b[36m-------------------------------------------------------------------\x1b[0m')

  /* validación de los datos con sus respectivos esquemas,  */
  if (evalOAG) await validateHeaderOAG(req)
  validateParams(req.params, paramsSchema)
  validateQuery(req.query, querySchema)
  validateBody(req.body, bodySchema)
}

/**
 * @param {*} nameMethod Se especifica una etiqueta o identificación del método que se esta ejecutando.
 * @param {*} responseStatusCode Valor del Estatus de Retorno, cuando la ejecución se lleva a cabo sin ningún error o excepción.
 * @param {*} res Response del Controller.
 * @param {*} dataJSON Valor en JSon del contenido a retornar.
 * @returns Response o retorno.
 */
const terminandoNormal = async (nameMethod, responseStatusCode, res, dataJSON) => {
  /* visualización de la información */
  const tini = '\x1b[32m'
  const tend = '\x1b[0m'
  log.info(`${tini}-------------------------------------------------------------------${tend}`)
  log.info(`${tini}-- Response.StatusCode:${tend} ${responseStatusCode}${tend}`)
  log.info(`${tini}-- Response.BODY:${tend} ${JSON.stringify(dataJSON)}${tend}`)
  log.info(`${tini}-------------------------------------------------------------------${tend}`)
  log.info(`${tini}*** CTRL: Terminando Método${tend} ${nameMethod}${tini}.${tend}`)
  log.info(`${tini}********************************************************************${tend}`)
  /* response registrados */
  switch (responseStatusCode) {
    case 200:
      Response.Ok(res, dataJSON)
      break
    case 201:
      Response.Created(res, dataJSON)
      break
    default:
      return res.status(responseStatusCode).send(dataJSON)
  }
}

/**
 * @param {*} nameMethod Se especifica una etiqueta o identificación del método que se esta ejecutando.
 * @param {*} res Response del Controller.
 * @param {*} errorJSON Información en formato JSON de la excepción.
 * @returns Response o retorno.
 */
const terminandoCatchError = async (nameMethod, res, errorJSON) => {
  /* preparación de variables */
  const exceptionCode = errorJSON.exceptionCode
  const statusCode = errorJSON.statusCode
  const colorText = statusCode >= 500 ? '\x1b[31m' : '\x1b[33m'
  errorJSON.status = 'EXCEPTION'
  if (statusCode === 203 || (statusCode >= 400 && statusCode < 500)) {
    delete errorJSON.stack
    delete errorJSON.mergeVariables
    delete errorJSON.statusCode
  }

  /* visualizacón de infomación del error */
  log.info(`${colorText}-------------------------------------------------------------------\x1b[0m`)
  log.info(`${colorText}-- Response.StatusCode:\x1b[0m ${statusCode}`)
  log.info(`${colorText}-- Exception Code...:\x1b[0m ${exceptionCode}`)
  log.info(`${colorText}-- Exception Name...:\x1b[0m ${errorJSON.name}`)
  log.info(`${colorText}-- Exception Message:\x1b[0m ${errorJSON.message}`)
  log.info(`${colorText}-------------------------------------------------------------------\x1b[0m`)
  log.info(`${colorText}*** CTRL: CatchError Método\x1b[0m ${nameMethod}${colorText}.\x1b[0m `)
  log.info(`${colorText}********************************************************************\x1b[0m`)
  /* retorno del error */
  return res.status(statusCode).send(errorJSON)
}

/**
 * @param {*} nameMethod Se especifica una etiqueta o identificación del método que se esta ejecutando.
 * @param {*} responseStatusCode Valor del Estatus de Retorno, cuando la ejecución se lleva a cabo sin ningún error o excepción.
 * @param {*} req Request del Controller que se esta ejecutando.
 * @param {*} res Response del Controller.
 * @param {*} validationSchemas Contiene un JSON con los tres esquemas de validación "paramsSchema", "querySchema", "bodySchema". Con una estructura de jsonSchema, para mayores detalles vel el archivo local commons/validations.js
 * @returns Response o retorno.
 */

export async function invokeController(nameMethod, responseStatusCode, req, res, validationSchemas, callback) {
  try {
    let { paramsSchema, querySchema, bodySchema } = validationSchemas
    if (paramsSchema === undefined) paramsSchema = validateSchemaEMPTY
    if (querySchema === undefined) querySchema = validateSchemaEMPTY
    if (bodySchema === undefined) bodySchema = validateSchemaEMPTY

    await iniciando(req, nameMethod, true, paramsSchema, querySchema, bodySchema)
    const toReturn = await callback(req, res)
    return terminandoNormal(nameMethod, responseStatusCode, res, toReturn)
  } catch (err) {
    return terminandoCatchError(nameMethod, res, err)
  }
}
