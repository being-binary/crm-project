const nemo = ['nemo']
const everyone = ['dory', 'bruce', 'marlin', 'nemo', 'gill', 'squirt', 'nemo', 'hank', 'bloat']
const large = new Array(100000).fill('nemo');
function findNemo(array){
    let  t0 = performance.now();
    for (let i in array){
        if(array[i] === 'nemo'){
            console.log('nemo found!!')
        }
    }
    let t1 = performance.now();
    console.log(`Call to find Nemo took ${t1 - t0} milliseconds`)
}

findNemo(large)