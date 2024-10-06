//Assignment B1
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
