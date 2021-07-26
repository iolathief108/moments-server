const log = console.log
const info = console.info
const error = console.error


function isPhone(phone: string):boolean {
  if (/\s/g.test(phone)) return false
  if (phone.length !== 9) return false
  if (!/^[0-9]+$/g.test(phone)) return false
  return true
}

function testExtract(test: string, ans:boolean){
  const r = isPhone(test) === ans
  
  if (r) {
    log(true);
  } else {
    info(`karma -> function returned true for "${test}"`)
  }
}


testExtract('77-573-7941', false)
testExtract('0 7c7-573-41', false)
testExtract('775784985', true)
testExtract('s75784985', false)
testExtract('hi', false)
testExtract('1234567890', false)
testExtract('12345678', false)
testExtract('123456782', true)
