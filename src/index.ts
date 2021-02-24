import * as crypto from 'crypto'
import axios from 'axios'
class DingDingHelper {
  secret: string
  url: string
  token: string
  constructor(opts) {
    this.secret = opts.secret
    this.token = opts.token
    this.url = `https://oapi.dingtalk.com/robot/send?access_token=${this.token}`
  }
  generateSign = (secret) => {
    const dateNow = Date.now()
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(`${dateNow}\n${secret}`)
    const result = encodeURIComponent(hmac.digest('base64'))
    console.log(result)
    return { dateNow, result }
  }
  sendMessage = (text, desp) => {
    const { result, dateNow } = this.generateSign(this.secret)
    const targetUrl = `${this.url}&timestamp=${dateNow}&sign=${result}`
    console.log(targetUrl)
    axios
      .post(
        targetUrl,
        {
          msgtype: 'markdown',
          markdown: {
            title: text,
            text: `## ${text} \n > ${desp}`,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((resp) => {
        console.log(resp)
      })
  }
}

export default DingDingHelper
