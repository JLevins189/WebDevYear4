### **Q1.** Stream Abstraction:

Streams are like arrays in that they are controlled collections of data that can change over time.
Arrays though are always of a known size and the contents are always known.
Streams are an abstraction where some data may or not be present currently, and may or may not be available in the future.

### **Q2.**

I would create an observable from the promise created by the network request.
Using streams would massively benefit the application as we get data as it comes instead of waiting for all of it so we waste
less valuable CPU waiting for all the data when we could be using it as it comes so we don't
create a CPU hog when that data does fully arrive. The biggest downside of RxJs is that is it difficult to implement properly,
we have to unsubscribe when we are finished with the stream to
prevent memory leaks, if we forget to do that on critical sites we could create massive issues. Streams are
also massively overkill for most projects, but they do suit some projects.

### **Q3.**

Asynchronous tasks by nature are not guaranteed to finish in a specific order, therefore sharing global state means
that the output expected using the state could be unpredictable and
cause the application to not work as intended. If the result of one async task relies
on another then awaiting the result before executing the next is the logical option.
