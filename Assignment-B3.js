//Create a Queue Class that resolves promises.
//Using an instance of the Queue class, resolve an ordered array of generated promises.
// Queue class
class Queue {
    constructor(){
        this.queue = [];
        this.results = [];
        this.isProcessing = false;
    }
    
    enqueue(promise) {
        this.queue.push(promise); 
        if (!this.isProcessing) {
            this.executeResolving();
        }
    }
    
    async executeResolving () { 
        this.isProcessing = true;
        while(this.queue.length > 0){
            const currentPromise = this.queue.shift();
            currentPromise.then((result) => {
                console.log(`Resolved with ${result}`);
                console.log(`-----------------------`);
                this.results.push(`[${result}]`);
            }).catch((error) => {
                console.log(`Rejected with ${error}`);
                console.log(`-----------------------`);
            })
            
            /*try {
                const result = await currentPromise;
                console.log(`Resolved with ${result}`);
                console.log(`-----------------------`);
                this.results.push(`[${result}]`);
            } catch(error) {
                console.log(`Rejected with ${error}`);
                console.log(`-----------------------`);
            }*/
            
        }
        this.isProcessing = false;
    }
}

const integerOccurences = []; 

const getUniqueIntegerPromise = () => {
    const randomInteger = Math.round(Math.random() * 10);
    console.log(`Random integer -> ${randomInteger}`);
    
    return new Promise((resolve, reject) => {
        const randomDelay = Math.round(Math.random() * 2000) + 1000;
        
        setTimeout(() => {
            console.log(`Timing : ${randomDelay}ms for ${randomInteger}`);
            if(!integerOccurences.includes(randomInteger)) {
                resolve(randomInteger);
                integerOccurences.push(randomInteger);
            }else reject(randomInteger);
            
        }, randomDelay);
    });
};

const queueInstance = new Queue();
const maxSize = 10;

const processQueue = () => {
    const promises = [];
    for(let i = 0 ; i < 10 ; i++){
        promises.push(getUniqueIntegerPromise());
    }
    
    promises.forEach(promise => queueInstance.enqueue(promise));
    
};

processQueue();

setTimeout(() => {
    console.log(queueInstance.results);
}, 20000);




