const Hyperswarm = require('hyperswarm')
const hypercore = require('hypercore')
const pump = require('pump')

const feed = hypercore('./single-chat-feed-clone', 'a58b3e727afa9164e361c72e31ae869ed3e34aa4233a216a3f830d06d0f78ee5', {
  valueEncoding: 'json'
})

feed.createReadStream({ live: true })
  .on('data', function (data) {
    console.log(data)
  })

const swarm = new Hyperswarm()

feed.ready(function () {
  // we use the discovery as the topic
  swarm.join(feed.discoveryKey)
  console.log(feed.discoveryKey.toString('hex'))
  swarm.on('connection', function (socket, info) {
    console.log('(New peer connected!)')

    // We use the pump module instead of stream.pipe(otherStream)
    // as it does stream error handling, so we do not have to do that
    // manually.

    // See below for more detail on how this work.
    pump(socket, feed.replicate(info.client, { live: true }), socket)
  })
})