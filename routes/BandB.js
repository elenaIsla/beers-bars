const express = require('express');
const router = express.Router();
const path = require('path');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const User = require('../models/user');
const Beer = require('../models/beer');
const Bar = require('../models/bar');


router.use(express.static(path.join(__dirname, '../public')));

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'img',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 150, height: 150, crop: 'limit' }],
});

const parser = multer({ storage });

/* GET bars&beers homepage. */
router.get('/', function(req, res, next) {
  res.render('BandB/homePage', { title: 'Bars&Beers', layout: 'layouts/homePage'});
  
});

/* GET bars&beers googlemap. */
router.get('/googlemap', function(req, res, next) {

  res.render('BandB/googlemap', { title: 'Bars&Beers'});
  
});

/* GET bars&beers API. */
router.get('/api', (req, res, next) => {
  Bar.find({}, (error, allBarsFromDB) => {
		if (error) { 
			next(error); 
		} else { 
      res.status(200).json({ bars: allBarsFromDB });
      console.log(allBarsFromDB);
      // res.render('BandB/googlemap', { title: 'Bars&Beers', bars: allBarsFromDB});
      
		}
	});
});
// probar la ruta api para un bar en particular /bars&beers/api/5c8c14f70213cf17a860ecbc
router.get('/api/:id', (req, res, next) => {
	let barId = req.params.id;
	Bar.findOne({_id: barId}, (error, oneRestaurantFromDB) => {
		if (error) { 
			next(error) 
		} else { 
			res.status(200).json({ restaurant: oneRestaurantFromDB }); 
		}
	});
});

/* GET-POST newbars FORM page*/
router.get('/newbars', (req, res, next) => {
  Beer.find()
  .then((beers) => {
  res.render('BandB/newbars', { title: 'Bars&Beers', beers});
  })
  .catch((error) => {
    next(error);
  })
});

router.post('/newbars', (req, res, next) => {
  const {barType, name, description, street, neighbourhood, city, category, BeersDraft, BeersBottle} = req.body;
  const creator = req.session.currentUser._id;
  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
    };
  Bar.findOne({name})
    .then((nameBar) => {
      if(nameBar){
        req.flash('error', 'This bar already exists');
        return res.redirect('/bars&beers/newbars');
      } else {
        Bar.create({
          barType,
          name,
          description,
          address:{  
          street,
          neighbourhood,
          city,
          category,
          },
          BeersDraft,
          BeersBottle,
          creator,
          location,
        })
        .then((bar) => {
          req.flash('success', 'Bar created successfully!');
          res.redirect("/bars&beers");
        })
        .catch((error) => {
          next(error);
        })
      .catch((error) => {
        next(error);
      });
      };
    });
});

/* POST  deleteBar page */

router.post('/:idBar/deleteBar', (req, res, next) => {
  const {idBar} = req.params;
  Bar.findByIdAndDelete(idBar)
    .then((bar) => {
      res.redirect("/bars&beers");
    }) 
    .catch((error) => {
      next(error);
    })
});



/* GET-POST page create beer Form */
router.get('/createBeer', (req, res, next) => {
  res.render('BandB/createBeer', { title: 'Bars&Beers'});
});

router.post('/createBeer',parser.single('image'), (req, res, next) => {
  const beerlogoImage = req.file.url;
  const {name, description} = req.body;
  Beer.create({
    name,
    description,
    beerlogoImage,
  
  })
  .then((beer) => {
    res.redirect("/bars&beers/beers");
  })
  .catch(error => {
    console.log(error);
  })
});

/* GET-POST  updateBeer page and updateFORM */

router.get('/:id/updateBeer', (req, res, next) => {
  const {id} = req.params;
  Beer.findById(id)
    .then((beer) => {
      res.render('BandB/updateBeer', {beer});
    }) 
    .catch((error) => {
      next(error);
    })
});

router.post('/:id', (req, res, next) => {
  const {id} = req.params;
  const {name, description} = req.body;
  Beer.findByIdAndUpdate(id, {name, description})
    .then((beer) => {
      res.redirect("/bars&beers/beers");
    }) 
    .catch((error) => {
      next(error);
    })
});

/* POST  deleteBeer page */

router.post('/:id/delete', (req, res, next) => {
  const {id} = req.params;
  Beer.findByIdAndDelete(id)
    .then((beer) => {
      res.redirect("/bars&beers/beers");
    }) 
    .catch((error) => {
      next(error);
    })
});

/* GET beerlist page. */
router.get('/beers', (req, res, next) => {
  console.log();
  Beer.find()
  .then((beers) => {
  res.render('BandB/beerlist', { title: 'Bars&Beers', beers});
  })
  .catch((error) => {
    next(error);
  });
});

/* GET users listing. */
router.get('/users', (req, res, next) => {
  User.find()
  .then((users) => {
  res.render('BandB/userlist', { title: 'Bars&Beers', users});
  })
  .catch((error) => {
    next(error);
  });
});

/* POST  deleteUser page */

router.post('/:idUser/deleteUser', (req, res, next) => {
  const {idUser} = req.params;
  User.findByIdAndDelete(idUser)
    .then((user) => {
      res.redirect("/bars&beers/users");
    }) 
    .catch((error) => {
      next(error);
    })
});

/* GET draft beer bars page */
router.get('/:id/draftBars', (req, res, next) => {
  const {id} = req.params;
  Bar.find({BeersDraft: id})
  .then((bars) => {
  res.render('BandB/draftBarsList', { title: 'Bars&Beers', bars});
  })
  .catch((error) => {
    next(error);
  });
});

/* GET bottle beer bars page */
router.get('/:id/bottleBars', (req, res, next) => {
  const {id} = req.params;
  Bar.find({BeersBottle: id})
  .then((bars) => {
  res.render('BandB/bottleBarsList', { title: 'Bars&Beers', bars});
  })
  .catch((error) => {
    next(error);
  });
});

/* GET user profile page */
router.get('/:iduser/userProfile', (req, res, next) => {
  const {iduser} = req.params;

  
  User.findById(iduser)
    .populate('favouriteBeers')
    .then((user) => {
      console.log('favouriteBeers');
      Bar.find({creator: iduser})
        .then((bars) => {
          res.render('BandB/userProfile', { title: 'Bars&Beers', bars, user});
        })
        .catch((error) => {
        next(error);
    })
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
