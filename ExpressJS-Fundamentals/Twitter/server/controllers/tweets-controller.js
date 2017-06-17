const Tweet = require('../data/Tweet')

function getTags (tweet) {
  return tweet.split(/[\s,.?!]+/).filter(w => w.startsWith('#')).map(w => w.substr(1))
}

function getHandles (tweet) {
  return tweet.split(/[\s,.?!]+/).filter(w => w.startsWith('@')).map(w => w.substr(1))
}

module.exports = {
  tweet: {
    get: (req, res) => {
      res.render('tweets/tweet')
    },
    post: (req, res) => {
      let tweet = req.body
      tweet.tags = getTags(req.body.content)
      tweet.handles = getHandles(req.body.content)
      tweet.author = req.user._id

      Tweet.create(tweet)
        .then(() => {
          res.redirect('/')
        })
        .catch(err => {
          res.render('tweets/tweet', {globalError: err})
        })
    },
    like: (req, res) => {
      Tweet.findByIdAndUpdate(req.params.id, {$push: {likes: req.user._id}})
        .then(() => {
          res.redirect('/')
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/')
        })
    },
    dislike: (req, res) => {
      Tweet.findByIdAndUpdate(req.params.id, {$pull: {likes: req.user._id}})
        .then(() => {
          res.redirect('/')
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/')
        })
    }
  },
  tag: {
    tagname: (req, res) => {
      Tweet.find({tags: req.params.tag}).limit(100).sort('-creationDate').populate('author')
        .then((tweets) => {
          res.render('tweets/tagname', {tweets, tag: req.params.tag})
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
    }
  }
}
