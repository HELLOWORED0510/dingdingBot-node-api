declare class DingDingHelper {
  secret: string
  url: string
  token: string
  constructor(opts: { secret: string; token: string })
  generateSign: (
    secret: any
  ) => {
    dateNow: number
    result: string
  }
  sendMessage: (text: string, desp: string) => void
}
export default DingDingHelper
