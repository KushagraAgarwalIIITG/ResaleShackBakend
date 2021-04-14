//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
const Category = require("../models/category");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe("Category", () => {
  before((done) => {
    //Before each test we empty the database
    Category.remove({}, (err) => {});
    
    done();
  });

  // Test the Category GET route   -----------------------------------------------------------------------------------------------------------
  describe("/GET Category", () => {
    //get all the Categorys
    it("it should GET all the Categorys", (done) => {
      chai
        .request(server)
        .get("/api/categories")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });

    //get  Category with id
//     it("it should GET Category with the given id", (done) => {
//       let Category = new Category({
//         subject: "Hiiii Category",
//         content: "Hi hjklm.lk;lk'jijk",
//       });

//       Category.save((err, Category1) => {
//         chai
//           .request(server)
//           .get("/api/Category/" + Category1.id)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("object");
//             res.body.should.have.property("_id").eql(Category1.id);
//             res.body.should.have.property("subject").eql("Hiiii Category");
//             done();
//           });
//       });
//     });
//   });

//   // Test the Category POST route to add Category ---------------------------------------------------------------------------------------
//   describe("/POST Category", () => {
//     // POST a Category succesfully
//     it("it should POST a Category", (done) => {
//       let Category = {
//         subject: "Hiiii Category",
//         content: "Hi hjklm.lk;lk'jijk",
//       };
//       chai
//         .request(server)
//         .post("/api/Category")
//         .send(Category)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("object");
//           res.body.should.have.property("subject").eql("Hiiii Category");
//           done();
//         });
//     });
//   });

//   // Test the Category/PUT route ------------------------------------------------------------------------------------------------
//   describe("/PUT Category/:id", () => {
//     it("it should update the Category given the id ", (done) => {
//       let Category = new Category({
//         subject: "Hiiii Category",
//         content: "Hi hjklm.lk;lk'jijk",
//       });

//       Category.save((err, Category1) => {
//         let Category2 = {
//           subject: "No Category",
//           content: "Hi hjklm.lk;lk'jijk",
//         };
//         chai
//           .request(server)
//           .put("/api/Category/" + Category1.id)
//           .send(Category2)
//           .end((err, res) => {
//             if (err) {
//               console.log(err);
//             } else {
//               should.exist(res);
//               res.should.have.status(200);
//               res.body.should.be.a("object");
//               res.body.should.have.property("subject").eql("No Category");
//               res.body.should.have.property("_id").eql(Category1.id);
//               done();
//             }
//           });
//       });
//     });

//     it("it should not update the Category given the id not in document", (done) => {
//       let Category = new Category({
//         subject: "No Category",
//         content: "Hi hjklm.lk;lk'jijk",
//       });

//       chai
//         .request(server)
//         .put("/api/Category/" + Category.id)
//         .send(Category)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//           } else {
//             should.exist(res);
//             res.should.have.status(400);
//             res.body.should.be.a("object");
//             res.body.should.have.property("msg").eql("No Category found !");
//             done();
//           }
//         });
//     });
//   });

//   //Test the Category /DELETE/:id route -----------------------------------------------------------------------------------
//   describe("/DELETE/:id Category", () => {
//     // deleting Category with id
//     it("it should DELETE a Category given the id", (done) => {
//       let Category = new Category({
//         subject: "No Category",
//         content: "Hi hjklm.lk;lk'jijk",
//       });

//       Category.save((err, Category1) => {
//         chai
//           .request(server)
//           .delete("/api/Category/" + Category1.id)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("object");
//             res.body.should.have.property("msg").eql("Category removed");
//             done();
//           });
//       });
//     });

//     // deleting Category with id not present in Category table
//     it("it should not DELETE as Category with id is not present in the database", (done) => {
//       let Category = new Category({
//         subject: "No Category",
//         content: "Hi hjklm.lk;lk'jijk",
//       });

//       chai
//         .request(server)
//         .delete("/api/Category/" + Category.id)
//         .end((err, res) => {
//           res.should.have.status(404);
//           res.body.should.be.a("object");
//           res.body.should.have.property("msg").eql("Category not found");
//           done();
//         });
//     });
  });
});