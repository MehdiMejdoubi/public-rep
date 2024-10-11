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

const arrOfInts = [1,1,2,2,1,1,2,2,1,1];
const maxRange = 10;

const resolveUniqueNumber = function (arr) {
    return new Promise ((resolve, reject) => {
        if(arr.length > maxRange) {
            reject(new Error(`You exceeded the maximum range`));
        }
        
        const randomInt = Math.round(Math.random()  *  10);
        if(!arr.includes(randomInt)) {
            resolve(randomInt);
        }else  {
            reject(new Error(randomInt));
        }
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
