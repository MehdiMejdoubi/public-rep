//Assignment B1
//1 : Function that contains a promise that resolves a random unique integer (not included in a set of int elements) 
const resolveUniqueNumber = function(arrOfNumbers){
    const arrRange = 10;
    return new Promise((resolve, reject) => {
        if(arrOfNumbers.length > arrRange){
            reject(new Error("You exceeded the maximum range"));
            return;
        }
        
        const randomInteger = Math.round(Math.random() * 10);
        if(!arrOfNumbers.includes(randomInteger)){
            resolve(randomInteger);
        }else {
            reject(new Error(`The number ${randomInteger} is not unique`));
        }
    }).then((randomInteger) => console.log(`The number ${randomInteger} is unique`))
    .catch((error) => console.log(error.message));
}

const arr = [1, 2, 3, 1, 5, 4, 3, 7, 5, 2];
resolveUniqueNumber(arr);



//2 - Added a setTimeout between (1s -> 3s) to the prevous function
/*
const resolveUniqueNumber = function(arrOfNumbers){
    const arrRange = 10;
    return new Promise((resolve, reject) => {
        const randomTiming = Math.round(Math.random() * 1000) + 1000;
        console.log(`The random Timing is ${randomTiming}`);
        setTimeout(() => {
            if(arrOfNumbers.length > arrRange){
                reject(new Error("You exceeded the maximum range"));
                return;
            }
        
            const randomInteger = Math.round(Math.random() * 10);
            if(!arrOfNumbers.includes(randomInteger)){
                resolve(randomInteger);
            }else {
                reject(new Error(`The number ${randomInteger} is not unique`));
            }
        }, randomTiming)
    })
    .then((randomInteger) => console.log(`The number ${randomInteger} is unique`))
    .catch((error) => console.log(error.message));
}

const arr = [1, 2, 3, 1, 5, 4, 3, 7, 5, 2];
resolveUniqueNumber(arr);
*/
