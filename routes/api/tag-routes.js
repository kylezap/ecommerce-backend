const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// router.get('/', (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
// });

// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });

// router.post('/', (req, res) => {
//   // create a new tag
// });

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });

// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });

router.get('/', async (req, res) => {
  // find all categories
  try {
    const tagData = await Tag.findAll({
      include: Product, ProductTag // Include associated Products
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one Tag by its `id` value
  try {
    const TagIdData = await Tag.findByPk(req.params.id, {
      include: Product,
    });

    res.status(200).json(TagIdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new Tag
  try {
    const tagData = await Tag.create({
      Tag_name: req.body.Tag_name
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a Tag by its `id` value
  try {
    const tagData = await Tag.update(
    req.body,
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
  }  
  
});
  // delete a Tag by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
