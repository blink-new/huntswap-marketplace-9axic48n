import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'huntswap-marketplace-9axic48n',
  authRequired: true
})

export default blink