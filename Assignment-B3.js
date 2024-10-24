//Create a Queue Class that resolves promises.
//Using an instance of the Queue class, resolve an ordered array of generated promises.
// Queue class
class CustomQueue {
  constructor() {
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

  async executeResolving() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    } else {
      this.isProcessing = true;
      const currentPromise = this.queue.shift();

      try {
        const result = await currentPromise();
        console.log(`Resolved with ${result}`);
        this.results.push(result);
      } catch (error) {
        console.log(`Rejected with ${error}`);
      } finally {
        this.executeResolving();
      }
    }
  }
}

const integerOccurences = [];

const getUniqueIntegerPromise = () => {
  const randomInteger = Math.round(Math.random() * 10);
  console.log(`Random integer -> ${randomInteger}`);

  return () => {
    return new Promise((resolve, reject) => {
      const randomDelay = Math.round(Math.random() * 2000) + 1000;

      setTimeout(() => {
        if (!integerOccurences.includes(randomInteger)) {
          resolve(randomInteger);
          integerOccurences.push(randomInteger);
        } else {
          reject(randomInteger);
        }
      }, randomDelay);
    });
  };
};

const queueInstance = new CustomQueue();
const maxSize = 10;

const processQueue = () => {
  const promises = [];
  for (let i = 0; i < maxSize; i++) {
    promises.push(getUniqueIntegerPromise());
  }

  promises.forEach((promise) => queueInstance.enqueue(promise));
};

processQueue();

setTimeout(() => {
  console.log(queueInstance.results);
}, 20000);





