export function ong() {
    return localStorage.getItem('ong')
        ? JSON.parse(localStorage.getItem('ong'))
        : null
}
