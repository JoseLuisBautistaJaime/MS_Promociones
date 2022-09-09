import { Client } from 'es8'

export const client = new Client({
  node: 'http://192.168.100.107:9200'
})
