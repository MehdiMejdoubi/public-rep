//Create a Queue Class that resolves promises.
//Using an instance of the Queue class, resolve an ordered array of generated promises.
// Queue class
class Queue {
    constructor(){
        this.queue = [];
        this.order = 1;
    }
    
    enqueue(promise) {
        this.queue.push(promise);
        return this.executeResolving(promise)
    }
    
    async executeResolving (promise) {
        let result;
        try {
            result = await promise;
            console.log(`Resolved with ${result}`);
            this.order++;
        }catch(error) {
            console.log(`Rejected with ${error}`);
        }
        
        return result;
    }
}

const integerOccurences = [];

const getUniqueIntegerPromise = () => {
    return new Promise((resolve, reject) => {
        const randomDelay = Math.round(Math.random() * 2000) + 1000;
        console.log(`Timing : ${randomDelay}s`);
        setTimeout(() => {
            const randomInteger = Math.round(Math.random() * 10);
            
            if(!integerOccurences.includes(randomInteger)) {
                resolve(randomInteger);
                integerOccurences.push(randomInteger);
            }else reject(randomInteger);
            
        }, randomDelay);
    })
}

const queueInstance = new Queue();
const maxSize = 10;
const results = [];

const processQueue = async () => {
    for (let i = 0; i < maxSize; i++) {
        
        try {
            const result = await queueInstance.enqueue(getUniqueIntegerPromise());
            if (result !== undefined) results.push(`[${queueInstance.order - 1} -> ${result}]`);
            
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        
    }
    console.log(results);
}

processQueue();


