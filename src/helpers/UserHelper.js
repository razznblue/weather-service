import bcrypt from 'bcrypt';


export const renderResponse = (res, page, msg, user) => {
  return res.render(page, {
    username: user?.username, email: user?.email, phone: user?.phone, alert: [{ msg: msg }]
  })
}

export const formatPhone = (phone) => {
  return `+1${phone.match(/\d/g).join("")}`
}

export const hashPassword = async (pass, saltRounds) => {
  return await bcrypt.hash(pass, saltRounds);
}

export const comparePassword = async (plaintextPassword, hash) => {
  return await bcrypt.compare(plaintextPassword, hash);
}