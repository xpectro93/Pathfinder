export function isValidLocation (mtx, y,x) {
    return   mtx[y] && mtx[y][x]!== undefined
}