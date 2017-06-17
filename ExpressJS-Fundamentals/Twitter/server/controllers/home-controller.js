const Tweet = require('../data/Tweet')

module.exports = {
  index: (req, res) => {
    Tweet.find().sort('-creationDate').limit(100).populate('author')
      .then(tweets => {
        tweets.forEach(tw => { tw.incrementViews() })
        res.render('home/index', {tweets})
      })
      .catch(err => {
        res.render('home/index', {globalError: err})
      })
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
