export function validParameters (mtx, y,x) {
    return   mtx[y] && mtx[y][x]!== undefined
}