const Image = require('./imageModel')
const Tag = require('./tagModel')

function getOrCreateTag (tag) {
  return new Promise((resolve, reject) => {
    Tag.findOne({name: tag}).then((dbTag) => {
      if (!dbTag) {
        Tag.create({name: tag}).then((newTag) => {
          resolve(newTag._id)
        })
      } else {
        resolve(dbTag._id)
      }
    })
  })
}

function addImageToTag (tagId, imageId) {
  Tag.findById(tagId).then((tag) => {
    tag.images.push(imageId)
    tag.save()
  })
}

function saveImage (image) {
  let promises = []
  let tagIds = []

  image.tags.forEach((tag) => {
    promises.push(getOrCreateTag(tag).then((tagId) => {
      tagIds.push(tagId)
    }))
  })

  Promise.all(promises).then(() => {
    let imageObj = {
      url: image.url,
      description: image.description,
      creationDate: image.creationDate,
      tags: tagIds
    }

    Image.create(imageObj)
      .then((imageInDb) => {
        imageInDb.tags.forEach((tagId) => {
          addImageToTag(tagId, imageInDb._id)
        })
      })
      .catch(console.log)
  })
}

function findByTag (tag) {
  return new Promise((resolve, reject) => {
    Tag.findOne({name: tag}).then(dbTag => {
      if (dbTag) {
        Image.find({tags: dbTag._id}).then(images => {
          resolve(images.sort(i => i.creationDate))
        })
      } else {
        console.log('No such tag exists')
      }
    }).catch(console.log)
  })
}

function filter (params) {
  params.results = params.results || 10
  params.before = params.before || Date.now()
  params.after = params.after || new Date(-8640000000000000)

  return Image.find({creationDate: {$gt: params.after, $lt: params.before}}).limit(params.results)
}

module.exports = {saveImage, findByTag, filter}
