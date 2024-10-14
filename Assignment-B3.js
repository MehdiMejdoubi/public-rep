//Create a Queue Class that resolves promises.
//Using an instance of the Queue class, resolve an ordered array of generated promises.
// Queue class
class Queue {
    constructor() {
        this.queue = [];
    }
    
    enqueue (promise) {
        this.queue.push(promise);
    }
    
    async executeResolving() {
        const results = [];
        let order = 1;
        for (let currentPromise of this.queue) {      

            try {
                const result = await currentPromise;
                results.push(`[${order} --> ${result}]`);
                console.log(`Resolved with ${result}`)
                order++
            } catch (error){
                console.log(`Rejected with ${error}`)
            } 
            
        }
        
        return results;
    }
    
}

//Our Promise
const integerOccurences = [];

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

//New class Instance
const queueInstance = new Queue();

const maximumSize = 10;
while(queueInstance.queue.length < maximumSize) {
    queueInstance.enqueue(getUniqueIntegerPromise());
}

queueInstance.executeResolving().then(results => {
    console.log(`All resolved promises: ${results}`);
}).catch(error => {
    console.log('Error:', error);
});
