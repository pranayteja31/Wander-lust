const Joi=require("joi");

module.exports.listingSchema=Joi.object({
    list:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.object({url:Joi.string().allow("",null)}),
        filter:Joi.string().required()
    }).required()

});

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        comment:Joi.string().required(),
        rating:Joi.number().min(0).max(5).required()
    }).required()
});