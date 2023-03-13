import bcrypt from 'bcrypt';


export const renderResponse = (res, page, msg, user) => {
  return res.render(page, {
    username: user?.username, email: user?.email, phone: user?.phone, alert: [{ msg: msg }]
  })
}

// export const renderResponseWithDetails = (res, page, msg, data) => {
//   return res.render(page, {
//     username: this.username, email: this.email, phone: this.phone, alert: [{ msg: msg }]
//   })
// }

export const hashPassword = async (pass, saltRounds) => {
  return await bcrypt.hash(pass, saltRounds);
}

export const comparePassword = async (plaintextPassword, hash) => {
  return await bcrypt.compare(plaintextPassword, hash);
}