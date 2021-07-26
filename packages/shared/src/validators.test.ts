import { validateStandardSLPhone, parseSLPhone } from "./validators";

test('validate phone test', function () {
    expect(validateStandardSLPhone('')).toBe(false)
    expect(validateStandardSLPhone('0775737981')).toBe(false)
    expect(validateStandardSLPhone('775737981')).toBe(false)
    expect(validateStandardSLPhone('+94775737981')).toBe(true)
    expect(validateStandardSLPhone('+94r75737981')).toBe(false)
    expect(validateStandardSLPhone('e94r75737981')).toBe(false)
    expect(validateStandardSLPhone('e94r75737981')).toBe(false)
})

test('parse test', function () {
    expect(parseSLPhone('')).toBe(false)
    expect(parseSLPhone('0775737981')).toBe('+94775737981')
    expect(parseSLPhone('077 5737981')).toBe('+94775737981')
    expect(parseSLPhone('077-5737981')).toBe('+94775737981')
    expect(parseSLPhone('077-57-37981')).toBe('+94775737981')
    expect(parseSLPhone('077 57 37 981')).toBe('+94775737981')
    expect(parseSLPhone('75 5737981')).toBe('+94755737981')
    expect(parseSLPhone('75 737981')).toBe(false)
    expect(parseSLPhone('+757537981')).toBe(false)


})
