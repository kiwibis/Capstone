'use strict'

const db = require('../server/db')
const {User, TrainingData} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  await Promise.all([
    TrainingData.create({
      algoResultText: `const testMe = num =>  { for ( let i = 0 ; i < 3 ; ++  i ) { num = num * num ; return num ; }}`,
      userEditedText: `const testMe = num => {
        for (let i = 0; i < 3; ++i) {
            num = num * num;
        }
            return num;
    }`,
      userId: 1
    }),
    TrainingData.create({
      algoResultText: `const testMe = num =>  { for ( let i = 0 ; i < 3 ; i ++   ) { num = num * num ; return num ; }}`,
      userEditedText: `const testMe = num => {
        for (let i = 0; i < 3; i++) {
            num = num * num;
        }
            return num;
    }`,
      userId: 1
    }),
    TrainingData.create({
      algoResultText: `function fib( in ) {
        V
        let a =>
            let big
        for (i = 2; i < n; i++) {
            let c = atb;
            a = b;
            ccturn big
        }
    }`,
      userEditedText: `function fib( n ) {
        let a = 1
        let b = 1
        for (i = 2; i < n; i++) {
            let c = a+b;
            a = b;
          b = c;
        }
            return b;

    }`,
      userId: 1
    }),
    TrainingData.create({
      algoResultText: `11...const.OnlyOdds = in =>
          let sub = 0;
      for (let i = in ; i > = 1;: --) {
          if (1 % .2 === 1) {
              sub += 1;....return sumiOnlyOdds(5) = 3
          }
      }`,
      userEditedText: `const onlyOdds = n => {
        let sum = 0;
        for (let i = n ; i >= 1; i--) {
          if (i % 2 === 1) {
              sum += i;
          }
        }
          return sum;
    }`,
      userId: 1
    }),
    TrainingData.create({
      algoResultText: `function factorial(n) {
        if (n === | | | 1 === 0) {
            return
            else {
                return n factorial(1 - 1) soudZ
            }
        }
    }`,
      userEditedText: `function factorial(n) {
        if (n === 1 || n === 0) {
            return 1
        } else {
            return n*factorial(n - 1)
        }
    }`,
      userId: 1
    }),
    TrainingData.create({
      algoResultText: `const aQuarter = func => {
        let counter = 0;
        return function() {
                if (counter < 3) {
                    counter tt;
                    return something went wrong: / '. counter = 0 ; return func ( . . . arguments ) ; کیکمی }}}`,
      userEditedText: `const aQuarter = func => {
        let counter = 0;
        return function() {
          if (counter < 3) {
            counter ++;
            return 'Something went wrong: / '
          }
          counter = 0;
          return func (...arguments);
        }
      }`,
      userId: 1
    }),
    TrainingData.create({
      algoResultText: `function sum ( arr ) { let sum = 0 ; for ( let i = 0 ; i < arr . length ; i ++ ) { i ( Array i Array ( arr [ i ] ) ) { Sum += sum ( arr [ if ] ) ; } else { sum t = arr [ i ] ; return Sum ; VIZ - PRO }}}`,
      userEditedText: `function sum(arr) {
        let Sum = 0;
        for (let i = 0; i < arr.length; i++) {
            if(Array.isArray(arr[i])) {
                Sum += sum(arr[i]);
            } else {
                Sum += arr[i];
              }
          }
                return Sum;
    }`,
      userId: 1
    }),
    TrainingData.create({
      algoResultText: `const Fib = ( n ) => { if ( n === 0 | | n ==- 1 ) return 1 return Fib ( n - 1 ) + fib ( n - 2 ) . }`,
      userEditedText: `const fib = (n) => {
        if (n === 0 || n === 1){
          return 1
          }
        return fib(n - 1) + fib(n - 2)
    }`,
      userId: 1
    })
  ])
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
