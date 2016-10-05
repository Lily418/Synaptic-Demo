'use strict'


let encode = (number) => {
  return number / 20
}

let decode = (number) => {
  return number * 20
}

let addNumbers= (network, number1, number2) => {
  return decode(network.activate([encode(number1), encode(number2)])[0])
}

let synaptic = require('synaptic');

let trainingData = [
  {
    input: [1,1],
    output: [2]
  },
  {
    input: [3,4],
    output: [7]
  },
  {
    input: [6,2],
    output: [8]
  },
  {
    input: [8,1],
    output: [9]
  },
  {
    input: [7,7],
    output: [14]
  },
  {
    input: [10,10],
    output: [20]
  }
]

trainingData = trainingData.map((trainingExample) => {
  return {
    "input": [encode(trainingExample.input[0]), encode(trainingExample.input[1])],
    "output": [encode(trainingExample.output[0])]
  }
}) 

console.log(trainingData)

let Layer = synaptic.Layer,
Network = synaptic.Network,
Trainer = synaptic.Trainer

let inputLayer = new Layer(2)
let hiddenLayer = new Layer(20)
let outputLayer = new Layer(1)

inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)

let network = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
})

let trainer = new Trainer(network)

trainer.train(trainingData, {
  cost: Trainer.cost.CROSS_ENTROPY
})


console.log(`1 + 1 = ${addNumbers(network, 1,1)}`)
console.log(`3 + 2 = ${addNumbers(network, 3,2)}`)
console.log(`7 + 6 = ${addNumbers(network, 7,6)}`)
