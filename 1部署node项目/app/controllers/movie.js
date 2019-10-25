var _ = require('underscore');
var Movie = require('../models/movie');
var Category = require('../models/category');
var Comment = require('../models/comment');

var fs = require('fs');
var path = require('path');

// detail page
exports.detail = function(req, res) {
  var id = req.params.id;

  Movie.update({_id: id}, {$inc: {pv: 1}}, function(err) {
    if (err) {
      console.log(err);
    }
  });
  Movie.findById(id, function(err, movie) {
    Comment
      .find({movie: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function(err, comments) {
        res.render('detail', {
          title: 'imooc ' + movie.title,
          movie: movie,
          comments: comments
        });
      });
  });
};

// admin new page
exports.new = function(req, res) {
  Category.find({}, function(err, categories) {
    res.render('admin', {
      title: 'imooc 后台录入页',
      categories: categories,
      movie: {}
    });
  });
};

// admin update
exports.update = function(req, res) {
  var id = req.params.id;

  if (id) {
    Movie.findById(id, function(err, movie) {
      Category.find({}, function(err, categories) {
        res.render('admin', {
          title: 'imooc 后台更新页',
          movie: movie,
          categories: categories
        });
      });
    });
  }
};

// admin poster
exports.savePoster = function(req, res, next) {
  var posterData = req.files.uploadPoster;
  var filePath = posterData ? posterData.path : '';
  var originalFilename = posterData ? posterData.originalname : '';

  if (originalFilename && filePath) {
    fs.readFile(filePath, function(err, data) {
      var timestamp = Date.now();
      var type = posterData.mimetype.split('/')[1];
      var poster = timestamp + '.' + type;
      var newPath = path.join(__dirname, '../../', '/public/upload/' + poster);
      fs.writeFile(newPath, data, function(err) {
        req.poster = poster;
        next();
      });
    });
  } else {
    next();
  }
};

// admin post movie
exports.save = function(req, res) {
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  if (req.poster) {
    movieObj.poster = req.poster;
  }

  if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err);
      }

      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err);
        }

        res.redirect('/movie/' + movie._id);
      });
    });
  } else {
    _movie = new Movie(movieObj);

    var categoryId = _movie.category;
    var categoryName = movieObj.categoryName;

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err);
      }

      if (categoryId){
        Category.findById({_id: categoryId}, function(err, category) {
          category.movies.push(movie._id);
          category.save(function(err, category) {
            res.redirect('/movie/' + movie._id);
          });
        });
      } else if (categoryName) {
        var category = new Category({
          name: categoryName,
          movies: [movie._id]
        });

        category.save(function(err, category) {
          movie.category = category._id;
          console.log(movie);
          movie.save(function(err, movie) {
          console.log(movie);
            res.redirect('/movie/' + movie._id);
          });
        });
      }
    });
  }
};

// list page
exports.list = function(req, res) {
  //'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf';

  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }

    res.render('list', {
      title: 'imooc 列表页',
      movies: movies
    });
  });
};

// list delete movie
exports.del = function(req, res) {
  var id = req.query.id;

  if (id) {
    Movie.remove({_id:id}, function(err, movie) {
      if (err) {
        console.log(err);
      }
      else {
        res.json({success: 1});
      }
    });
  }
};
