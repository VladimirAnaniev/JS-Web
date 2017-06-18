const Thread = require('../data/Thread')

module.exports = {
  index: (req, res) => {
    if (req.user) {
      Thread.find({$or: [{user1: req.user._id}, {user2: req.user._id}]})
        .sort('-updated')
        .populate('user1')
        .populate('user2')
        .then(threads => {
          res.render('home/index', {threads})
        })
        .catch(err => {
          console.log(err)
          res.render('home/index')
        })
    } else {
      res.render('home/index')
    }
  }
}
