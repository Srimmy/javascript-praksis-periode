let mangeTall = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1.1, 2.7, 8.9, 5.75];
let tall = 2;
console.log(finnStørre(tall, mangeTall));

function finnStørre(tall, array) {
    let høyereTall = [];
    for (i = 0; i < array.length; i++) {
        if (tall < array[i]) {
            høyereTall.push(array[i]);
        }
    }
    return høyereTall;

}
