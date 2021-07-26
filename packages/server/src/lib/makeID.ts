export function makeID(length: number, add_weird_characters: boolean = true): string {
    let result = "";
    // noinspection SpellCheckingInspection
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    characters = add_weird_characters ? characters + ".~*@,-_" : characters;

    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
}

export function makePin(length: number): number {
    let result = "";
    // noinspection SpellCheckingInspection
    let characters = "0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return Number(result);
}
