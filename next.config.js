const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {env: {
      NEXTAUTH_URL : 'http://localhost:3000'
    }}
  }
  return {env: {NEXTAUTH_URL : 'https://next-auth-mu-ten.vercel.app'}}
}