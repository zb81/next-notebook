type HashResult = {
  hash: string
  salt: string
  iterations: number
  hashAlgorithm: string
}

export async function hashPassword(
  password: string,
  saltLength = 16,
  iterations = 100000,
  hashAlgorithm: string = 'SHA-256',
): Promise<HashResult> {
  // 生成随机盐
  const salt = crypto.getRandomValues(new Uint8Array(saltLength))

  // 将密码转换为 ArrayBuffer
  const passwordBuffer = new TextEncoder().encode(password)

  // 使用 PBKDF2 衍生密钥
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  )

  const derivedKey = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: hashAlgorithm,
    },
    keyMaterial,
    256, // 密钥长度
  )

  // 转换为 Base64 字符串
  const hash = btoa(String.fromCharCode(...new Uint8Array(derivedKey)))
  const saltBase64 = btoa(String.fromCharCode(...salt))

  return { hash, salt: saltBase64, iterations, hashAlgorithm }
}

export async function verifyPassword(
  password: string,
  saltBase64: string,
  hashToCompare: string,
  iterations: number,
  hashAlgorithm: string = 'SHA-256',
): Promise<boolean> {
  // 将 Base64 格式的盐转换回 Uint8Array
  const salt = Uint8Array.from(atob(saltBase64), c => c.charCodeAt(0))

  // 将密码转换为 ArrayBuffer
  const passwordBuffer = new TextEncoder().encode(password)

  // 使用 PBKDF2 衍生密钥
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  )

  const derivedKey = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: hashAlgorithm,
    },
    keyMaterial,
    256,
  )

  // 转换为 Base64 字符串
  const hash = btoa(String.fromCharCode(...new Uint8Array(derivedKey)))

  // 比较哈希值
  return hash === hashToCompare
}
