const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/CrudDB',(err) => {
    if(!err){
        console.log('Mongodb conn');
    }else{
        console.log('error');
        
    }
});

module.exports=mongoose;