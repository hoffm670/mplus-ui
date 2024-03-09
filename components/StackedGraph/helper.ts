
export interface KeyData {
  keyLevel: string,
  count: number,
  percentage: number,
}

const THRESHOLD = 4

export const modifyData = (keyCounts: { [key: string]: number; }): KeyData[] => {
  const keys = Object.keys(keyCounts);
  keys.sort()
  const sum = keys.reduce((accumulator: number, key: string) => accumulator + keyCounts[key], 0);
  // handle left small amounts
  // handle right small amounts
  let out = keys.map((key) => {
    return {
      keyLevel: key,
      count: keyCounts[key],
      percentage: (keyCounts[key] / sum) * 100
    }
  })
  // return out
  return groupSmall(out)

}

const groupSmall = (keyData: KeyData[]) => {
  const outKeys = []
  let toCombine: KeyData[] = []
  for (let i = 0; i < keyData.length; i++) {
    const current = keyData[i]
    if (current.percentage < THRESHOLD) {
      toCombine.push(current)
    } else {
      if (toCombine.length > 0) {
        outKeys.push(combineKeyData(toCombine))
        toCombine = []
      }
      outKeys.push(current)
    }
  }
  if (toCombine.length > 0) {
    outKeys.push(combineKeyData(toCombine))
  }
  return outKeys
}

const combineKeyData = (keys: KeyData[]): KeyData => {
  if (keys.length == 1) {
    return keys[0]
  }

  const sumPercent = keys.reduce((accumulator: number, key: KeyData) => accumulator + key.percentage, 0);
  const sumCount = keys.reduce((accumulator: number, key: KeyData) => accumulator + key.count, 0);
  return {
    keyLevel: `${keys[0].keyLevel} - ${keys[keys.length - 1].keyLevel}`,
    count: sumCount,
    percentage: sumPercent
  }
}