const arrRange = 10;
const arrOfInts = [1,2,3,4,1,2,3,4,1,2];

//Previous Function
const resolveUniqueInteger = function (arrOfInts) {
    return new Promise((resolve, reject) => {
        const randomTiming = Math.round(Math.random() * 2000) + 1000;
        console.log(`Random timing --> ${randomTiming}`)
        setTimeout(() => {
            if(arrOfInts.length > arrRange){
                reject(new Error("You passed the maximum table range"));
            }
        
            const randomInteger = Math.round(Math.random() * 10);
            if(!arrOfInts.includes(randomInteger)) {
                resolve(randomInteger);
            }else {
                reject(`The integer ${randomInteger} is not unique`);
            } 
        }, randomTiming)
    })
}

//1 - Array Of Promises
const promisesToArray = () => {
    const promises = [];
    while(promises.length < arrRange) {
        promises.push(resolveUniqueInteger(arrOfInts));
    }
    return promises;
}

const arrOfPromises = promisesToArray();


// 2 - Function that resolves Unique Values out of an array of Promises
const arrOfResolvedValues = function(arrOfPromises) {
    return Promise.allSettled(arrOfPromises)
    .then((results) => {
        const resolvedValues = [];
        results.forEach((result) => {
            if(result.status === "fulfilled"){
                console.log(`resolved with ${result.value}`);
                resolvedValues.push(result.value);
            }else {
                console.log(`Rejected with : ${result.reason.message}`);

            }
        })
        return resolvedValues;
    })
}

arrOfResolvedValues(arrOfPromises).then((arrOfResolvedValues) => {
    console.log("All resolved values:", arrOfResolvedValues);
});
