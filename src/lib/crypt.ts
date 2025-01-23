import crypto from 'crypto'

export async function encryptPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex') // 生成随机盐
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha256')
    .toString('hex') // 加密
  return { salt, hash }
}

export async function comparePassword(
  password: string,
  salt: string,
  hash: string
) {
  const newHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha256')
    .toString('hex')
  return newHash === hash
}
