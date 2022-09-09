/* eslint-disable mocha/no-setup-in-describe */
/* eslint-disable prettier/prettier */
import { delay, toInteger, toNumber } from 'lodash'
import { TEST, CONTEXT, actionReciboCompra} from './commons/test-nmp'
import { SuiteTEST, IT } from './commons/test'


SuiteTEST(
  'T01',
  'CompraGanaReciboCompra',
  {
    commonHeaders: TEST.LISTHEADER_OAG,
    commonRootUrl: `/${CONTEXT.NAME}/${CONTEXT.VERSION}`,
    listDefaultOption: {
      opt10: {
        shouldHaveStatus: 200,
        url: `/compragana/reciboCompra/${TEST.RECIBOCOMPRA_ID}`,
      },
      opt11: {
        shouldHaveStatus: 200,
        url: `/compragana/reciboCompra/listado`,
        query: { idCliente: TEST.CLIENTE }
      },
      opt20: {
        shouldHaveStatus: 201,
        url: `/compragana/reciboCompra/${TEST.RECIBOCOMPRA_ID}`,
        body: { idCliente: TEST.CLIENTE_ID, montoCompra: toInteger(12500) }
      }
    },
    listDefaultSub: {
      // before0: { title: 'Reiniciar Cliente', sub: () => actionCliente.reiniciar(TEST.CLIENTE) }
    }
  },
  {
    // callbakcs
    before: async () => {
      await actionReciboCompra.tryRemove(TEST.RECIBOCOMPRA_ID)
    },
    after: async () => {},
    tests: () => {
      // Metodo POST=> reciboCompra/:idReciboCompra
      IT.Post('T01A4', 'opt20:400', 'POST: /compragana/reciboCompra, sin OAG.', { listHeaders: [] })
      IT.Post('T01A5', 'opt20:201', 'POST: /compragana/reciboCompra')

      // Metodo GET=> reciboCompra/:idReciboCompra
      // IT.Get('T01A0', 'opt10:400', 'GET: /compragana/reciboCompra, sin OAG.', { listHeaders: [] })
      // IT.Get('T01A1', 'opt10:200', 'GET: /compragana/reciboCompra')
      
      // Metodo GET=> reciboCompra/listado
      // IT.Get('T01A2', 'opt11:400', 'GET: /compragana/reciboCompra/listado, sin OAG.', { listHeaders: [] })
      // IT.Get('T01A3', 'opt11:200', 'GET: /compragana/reciboCompra/listado')

      


    }
  }
)
