//Create a Queue Class that resolves promises.
//Using an instance of the Queue class, resolve an ordered array of generated promises.
class Queue {
    constructor(){
        this.queue = [];
    }
    
    enqueue (promise) {
        this.queue.push(promise)
        this.processResolving(promise);
    }
    
    async processResolving(promise) {
        try {
            const result = await promise();
            console.log(`Resolved with ${result}`);
            resolvedValues.push(result);
        }catch(error) {
            console.log(`rejected with ${error.message}`);
        }
    }
}

const arrOfInts = [];

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

const promiseToArray = () => {
    const arr = [];
    while(arr.length < 10) {
        arr.push(resolveUniqueNumber(arrOfInts));
    }
    return arr;
}

const arrayOfPromises = promiseToArray();

const queue = new Queue();

arrayOfPromises.forEach((promise) => {
    queue.enqueue(() => promise);
})
