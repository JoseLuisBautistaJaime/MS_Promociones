// Context API
export const { CONTEXT_NAME } = process.env
export const { CONTEXT_VERSION } = process.env

// Comunicaciones.Service
export const {
  EMAIL_REMITENTE,
  URL_API_COMUNICACIONES,
  TEMPLATE_API_COMUNICACIONES_SMS,
  TEMPLATE_API_COMUNICACIONES_EMAIL,
  TEMPLATE_API_COMUNICACIONES_EMAIL_ACTIVACION,
  ACTIVACION_ENVIAROTP_MOSTRAROTP,
  ACTIVACION_BLOQUEO_REINTENTOS,
  ACTIVACION_EVENTOS_TIMETOLIVE,
  OTP_DURACION_SEGUNDOS,
  OTP_DURACION,
  OTP_SECRETO,
  OTP_DIGITOS
} = process.env

// Headers
export const HEADER_OAUTH = 'oauth.bearer'
export const HEADER_ID_CONSUMIDOR = 'idConsumidor'
export const HEADER_ID_DESTINO = 'idDestino'
export const HEADER_USUARIO = 'usuario'
export const HEADER_AUTHORIZATION = 'Authorization'
export const HEADER_ID_CLIENTE = 'idCliente'

// Cliente Estado Activacion
export const ESTADO_ACTIVACION_PROSPECTO = 2
export const ESTADO_ACTIVACION_OTPGENERADO = 3
export const ESTADO_ACTIVACION_ACTIVADO = 4
export const ESTADO_ACTIVACION_BLOQUEADO = 5
export const ESTADO_ACTIVACION_ERROR = 6

export const { URL_BASE_API_CLIENTES } = process.env
export const { AUTHORIZATION } = process.env
