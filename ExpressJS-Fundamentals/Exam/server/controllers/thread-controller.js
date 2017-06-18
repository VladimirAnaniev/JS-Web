const Thread = require('../data/Thread')
const Message = require('../data/Message')
const User = require('../data/User')

module.exports = {
  thread: (req, res) => {
    User.findOne({username: req.params.username})
      .then(user => {
        if (user && user.username !== req.user.username) {
          Thread.findOne({$or: [{user1: req.user, user2: user}, {user1: user, user2: req.user}]})
            .populate({path: 'messages', populate: {path: 'from'}})
            .then(thread => {
              if (!thread) {
                Thread.create({user1: user._id, user2: req.user._id})
                  .then((thread) => {
                    res.redirect('/thread/' + req.params.username)
                  })
                return
              }
              let blocked = user.blocked.indexOf(req.user.username) >= 0

              thread.messages.forEach(m => {
                if (m.message.startsWith('http') || m.message.startsWith('https')) {
                  if (m.message.endsWith('jpeg') || m.message.endsWith('jpg') || m.message.endsWith('png')) {
                    m.isImage = true
                    return
                  }
                  m.isLink = true
                }
              })

              res.render('thread/thread', {user, messages: thread.messages, blocked})
            })
            .catch(err => {
              console.log(err)
              res.render('thread/thread', {globalError: err})
            })
          return
        }
        res.render('thread/thread', {globalError: 'You cannot message tht user!'})
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
  },
  send: (req, res) => {
    User.findOne({username: req.params.username})
      .then(user => {
        if (user) {
          let message = req.body
          message.from = req.user._id
          message.to = user._id

          Message.create(message).then(dbMessage => {
            Thread.findOneAndUpdate({$or: [{user1: dbMessage.from, user2: dbMessage.to}, {user1: dbMessage.to, user2: dbMessage.from}]},
              {$push: {messages: dbMessage._id}, $set: {updated: dbMessage.sent}})
              .then(() => {
                res.redirect(`/thread/${req.params.username}`)
              })
              .catch(err => {
                console.log(err)
                res.redirect(`/thread/${req.params.username}`)
              })
          })

          return
        }
        res.redirect(`/thread/${req.params.username}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
  },
  message: {
    like: (req, res) => {
      Message.findByIdAndUpdate(req.params.id, {$set: {liked: true}})
        .populate('from')
        .then((message) => {
          res.redirect('/thread/' + message.from.username)
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/')
        })
    },
    dislike: (req, res) => {
      Message.findByIdAndUpdate(req.params.id, {$set: {liked: false}})
        .populate('from')
        .then((message) => {
          res.redirect('/thread/' + message.from.username)
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/')
        })
    }
  }
}
