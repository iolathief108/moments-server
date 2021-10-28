import {parser} from './parser'

test('should return false', () => {
    function parserTest(a) {
        expect(parser(a))
            .toBe(false)
    }

    parserTest('image-name_400x200q40.pg')
    parserTest('ima_400x200q.jpg')
    parserTest('ima_400x200q1s.jpg')
    parserTest('ima_400x00q13.jpg')
    parserTest('ima_00x200q1.jpg')
    parserTest('ima_300x200q0.jpg')
    parserTest('ima_40d0x200q1.jpg')
    parserTest('ima_40d0x20i0q1.jpg')
    parserTest('ima_.webp')

})

test('equal', () => {
    function parserTest(a, b) {
        expect(parser(a))
            .toStrictEqual(b)
    }

    parserTest('image-name_400x200q40.webp', ['image-name', 400, 200, 40, false])
    parserTest('image-name_400x200q40.jpg', ['image-name', 400, 200, 40, true])
    parserTest('ima.webp', ["ima", null, null, null, false])
    parserTest('image-name_400x200.jpg', ['image-name', 400, 200, null, true])
    parserTest('image-name_q20.jpg', ['image-name', null, null, 20, true])
    parserTest('image-name.jpg', ['image-name', null, null, null, true])
    parserTest('image-name_400q4.jpg', ['image-name', 400, 400, 4, true])
    parserTest('image-name_400.jpg', ['image-name', 400, 400, null, true])
})

