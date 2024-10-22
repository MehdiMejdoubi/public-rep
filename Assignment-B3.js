//Create a Queue Class that resolves promises.
//Using an instance of the Queue class, resolve an ordered array of generated promises.
// Queue class
class Queue {
    constructor(){
        this.queue = [];
        this.results = [];
        this.order = 1;
    }
    
    enqueue(promise) {
        this.queue.push(promise);
        return this.executeResolving();
    }
    
    async executeResolving () { 
        while(this.queue.length > 0){
            const currentPromise = this.queue.shift();
            
            try {
                const result = await currentPromise;
                console.log(`Resolved with ${result}`);
                console.log(`-----------------------`);
                this.results.push(`[${this.order} -> ${result}]`);
                this.order++;
            } catch(error) {
                console.log(`Rejected with ${error}`);
                console.log(`-----------------------`);
            }
            
        }
    }
        
}

const integerOccurences = []; 

const getUniqueIntegerPromise = () => {
    return new Promise((resolve, reject) => {
        const randomDelay = Math.round(Math.random() * 2000) + 1000;
        console.log(`Timing : ${randomDelay}s`);
        
        setTimeout(() => {
            const randomInteger = Math.round(Math.random() * 10);
            console.log(`Random integer -> ${randomInteger}`);
            if(!integerOccurences.includes(randomInteger)) {
                resolve(randomInteger);
                integerOccurences.push(randomInteger);
            }else reject(randomInteger);
            
        }, randomDelay);
    })
}

const queueInstance = new Queue();
const maxSize = 10;

const processQueue = async () => {
    for (let i = 0; i < maxSize; i++) {
        await queueInstance.enqueue(getUniqueIntegerPromise());
    }
    console.log(queueInstance.results)
};

processQueue();



