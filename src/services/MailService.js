import Api from '@/services/Api'

export default {

  sendEmail (params) {
    return Api().post('email', params)
  },
}