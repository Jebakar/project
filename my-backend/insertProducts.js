const mongoose = require("mongoose");
const Product = require("./models/Product"); // Import your Product model

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB"); 

    // Product Data for each category 
    const sportsShoesData = [ 
      { id: "s1", name: "Sprint Max", price: 110, image: "sports1.png", category: "sports" },
      { id: "s2", name: "PowerRunner", price: 125, image: "sports2.png", category: "sports" },
      { id: "s3", name: "Athletic Pro", price: 115, image: "sports3.png", category: "sports" },
    ]; 

    const comfortShoesData = [  
      { id: "c1", name: "Cloud Comfort", price: 85, image: "comfort1.png", category: "comfort" },
      { id: "c2", name: "Everyday Ease", price: 95, image: "comfort2.png", category: "comfort" },
      { id: "c3", name: "Relax Walkers", price: 90, image: "comfort3.png", category: "comfort" },
    ]; 

    const bestShoesData = [
      { id: "b1", name: "Classic Sneakers", price: 80, image: "best1.png", category: "best" },
      { id: "b2", name: "Urban Walkers", price: 90, image: "best2.png", category: "best" },
      { id: "b3", name: "Retro Runners", price: 70, image: "best3.png", category: "best" },
    ];

    const stylishShoesData = [
      { id: "s1", name: "Street Style", price: 95, image: "stylish1.png", category: "stylish" },
      { id: "s2", name: "Designer Kicks", price: 120, image: "stylish2.png", category: "stylish" },
      { id: "s3", name: "Modern Mules", price: 85, image: "stylish3.png", category: "stylish" },
    ];

    const casualShoesData = [
      { id: "c1", name: "Everyday Loafers", price: 65, image: "casual1.png", category: "casual" },
      { id: "c2", name: "Slip-On Sneakers", price: 80, image: "casual2.png", category: "casual" },
      { id: "c3", name: "Weekend Walkers", price: 75, image: "casual3.png", category: "casual" },
    ];

    const runningShoesData = [  
      { id: "r1", name: "Speed Runners", price: 95, image: "run1.png", category: "running" },
      { id: "r2", name: "Trail Blazers", price: 110, image: "run2.png", category: "running" },
      { id: "r3", name: "Power Sprint", price: 105, image: "run3.png", category: "running" },
    ];  

    // Combine all product data 
    const allProducts = [
      ...sportsShoesData,
      ...comfortShoesData,
      ...bestShoesData,
      ...stylishShoesData,
      ...casualShoesData,
      ...runningShoesData
    ];

    // Insert the data into the database
    Product.insertMany(allProducts)
      .then(() => {
        console.log("All products inserted successfully!");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error inserting products:", err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
