const integerOccurences = [];

//Previous Function
const getUniqueIntegerPromise = () => {
    return new Promise((resolve, reject) => {
        const randomTiming = Math.round(Math.random() * 2000) + 1000;

        setTimeout(() => {
            const randomInteger = Math.round(Math.random() * 10);

            if(!integerOccurences.includes(randomInteger)) {
                resolve(randomInteger);
                integerOccurences.push(randomInteger);
            }
            else reject(randomInteger);

        }, randomTiming)
    })
}

//1 - Array Of Promises
const createRandomIntPromises = () => {
    const numberOfPromises = 10;
    const promises = [];
    while(promises.length < numberOfPromises) {
        promises.push(getUniqueIntegerPromise());
    }
    return promises;
}

const randomIntPromises = createRandomIntPromises();


// 2 - Function that resolves Unique Values out of an array of Promises
const resolvedValues = promises => {
    return Promise.allSettled(promises)
    .then((results) => {
        const resolvedValues = [];
        results.forEach((result) => {

            if(result.status === "fulfilled"){
                console.log(`resolved with ${result.value}`);
                resolvedValues.push(result.value);
            }else {
                console.log(`Rejected with : ${result.reason}`);
            }
        })
        return resolvedValues;
    })
}

resolvedValues(randomIntPromises).then((resolvedValues) => {
    console.log("All resolved values:", resolvedValues);
});
