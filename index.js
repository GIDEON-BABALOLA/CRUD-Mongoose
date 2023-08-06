const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/bankCustomersDB", {useNewUrlParser:true } ,{useUnifiedTopology:true });
const bankCustomerSchema = new mongoose.Schema({
    name:String,
    accountBalance : Number,
    cardType: String,
    accountType : String
})
const bankCustomersModel = mongoose.model("bankCustomer", bankCustomerSchema);
//bankCustomer collection will become bankCustomers so if it is person, it will be people
const bankCustomerFirst = new bankCustomersModel({
  name : "Mark",
  accountBalance : 50000,
  cardType: "MaserCard",
  accountType: "Current"
  }) 
bankCustomerFirst.save(); // C

const bankCustomer = new bankCustomersModel({
  name : "Christain",
accountBalance : 50000,
cardType: "Visa",
accountType: "Saving"
}, 
)
const bankCustomer2 = new bankCustomersModel({
name : "Great",
accountBalance : 50000,
cardType: "Matercard",
accountType: "Current"
})
// bankCustomer.save()
  const transportCustomerSchema = new mongoose.Schema({
    //This includes validation in mongoose
    name :{
      type: String,
      required : [true, "please check your data entry, no name was specified"]
    },
    country: String,
    bank: String,
    price: {
      type: Number,
      min: 1000,
      max: 5000
    },
    //I am Establishing Relationships And Embedding Documents.
    bankTransport :  bankCustomerSchema

})
const transportCustomerModel = mongoose.model("transportCustomer", transportCustomerSchema);
const transportCustomer1 = new transportCustomerModel({
  //This includes validation in mongoose
  name: "Grace",
  country: "Canada",
  bank: "JP Morgan",
  price : "4000",
  bankTransport : bankCustomerFirst
});
const transportCustomer2 = new transportCustomerModel({
  //This includes validation in mongoose
  name: "Favour",
  country: "America",
  bank: "Wells Fargo",
  price : "4000"
});
//Inserting OR Creating Many Documents into transportCustomerModel //C
transportCustomerModel.insertMany([transportCustomer1, transportCustomer2])
.then(()=>{
  console.log("successfully inserted the transport customers")
})
.catch((err)=>{
  console.log("Error in adding transport customers," +err)
})
// Finding OR Reading Data from our database using the foreach method in javascript // R
transportCustomerModel.find()
.then((data)=>{
  console.log(data)
data.forEach(function(element){
  console.log(element.name)
})
})
.catch((err)=>{
  console.log(err)
})
bankCustomersModel.find()
.then((data)=>{
data.forEach(function(element){
  console.log(element.name)
})
})
.catch((err)=>{
  console.log(err)
});
//Updating our data in the database                                  //U
//Update One Takes Two Parameters
bankCustomersModel.updateOne({_id :"64ce332d8c3b5d713d55c1d9"},{name : "Jacob"})
.then(()=>{
  console.log("success in updating document with id: 64ce332d8c3b5d713d55c1d9")
})
.catch((err)=>{
  console.log("Error in updating document with id: 64ce332d8c3b5d713d55c1d9")
})
//Deleting our data in the database                                   //D
//Delete One takes only one parameter
bankCustomersModel.deleteOne({name : 'Great'})
.then(()=>{
  console.log("success in deleting document with name mark")
})
.catch((err)=>{
  console.log("Error in deleting document with name  mark," +err)
})
//Using DeleteMany To Clear Out A Whole Connection, It takes only one parameter
console.log("deleteMany")
bankCustomersModel.deleteMany({cardType : {$eq : "MaserCard"}})
.then((result)=>{
  console.log(`Deleted ${result.deletedCount} documents`);
  console.log("successfully deleted all transportCustomers")
})
.catch((err)=>{
  console.log("Error in deleting all transport customers," +err)
})
console.log("deleteMany")
//Deleting for 64ce3884243d17f4b716f556
//Closing the connection
setTimeout(() => {
  mongoose.connection.close()
  .then(() => {
    console.log("Mongoose connection closed successfully!");
  })
  .catch((error) => {
    console.log("Error while closing the Mongoose connection:", error);
  });
}, 1000);
// // bankCustomer.save()
//   .then(() => {
//     console.log("bankCustomer saved successfully!");
//   })
//   .catch((error) => {
//     console.log("Error while saving the bankCustomer:", error);
//   });

  