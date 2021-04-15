//const category = require('../models/category');
const Category = require('../models/category');

exports.getCategoryById = (req,res,next,_id)=>{
    Category.findById(_id).exec((err,category)=>{
        if(err || !category)
        {
            return res.status(400).json({
                error: " category not in the DB"
            })
        }
        req.category= category;
        next();
    })    
}

exports.createCategory = (req,res)=>{
    const category = new Category(req.body)
    category.save((err,category)=>{
        if(err || !category)
        {
            return res.status(400).json({
                error: " category not saved in the DB"
            })
        }
       res.json({
           category
       })
    })    
}


exports.getCategory = ( req, res)=>{
//the getCategory has been used with a :categoryId which would trigger the getCategoryById which would populate category with the catetgory id given
//in the url
    return res.json(req.category);
};

exports.getCategories = ( req, res)=>{
Category.find().exec((err,category)=>{
    if(err || !category)
    {
        return res.status(400).json({
            error: "No categories found"
        })
    }
    res.json(category)
})
};

exports.updateCategory =(req,res)=>{
    const category=req.category;
    category.name=req.body.name;
    category.save((err,updatedCategory)=>{
        if(err || !updatedCategory)
        {
            return res.status(400).json({
                error: " category not updated in the DB"
            })
        }
       res.json({
           updatedCategory
       })
    })    
}
exports.removeCategory =( req,res)=>{
    const category = req.category;
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error: " category not removed from the db"
            })
        }
        res.json({
            message: "Successfully deleted"
        });
    });
}

exports.getCategoryId = (req,res,next,id)=>{
    Category.findById(id).exec((err,user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile= user;
        next();
    })
}