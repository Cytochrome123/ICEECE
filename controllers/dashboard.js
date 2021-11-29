// const {cloudinary} = require("../config/cloudinary");
const multer = require("multer");
const { storage, upload } = require("../config/multer");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const User = mongoose.model("User");
const Paper = require("../model/paper");
const Review = require("../model/review");
const Correction = require("../model/correction");
const Update = require("../model/update");
const Payment = require("../model/payment");
const Session = require("../model/session");
const Attendance = require("../model/attendance");
// const QRScanner = require("qr-code-scanner")
// const AppError = require("../AppError")

exports.getHome = (req, res) => {
    res.send("WELCOME TO ICEECE");
    // throw new AppError ("Problematic server" , 401)
};
exports.getDashboard = async(req, res) => {
    console.log(req.user)
    const payment = await Payment.find()
        .then((payment) => {
            Session.find()
                .then((session) => {
                    res.render("dashboard", { payment, session });
                })
                .catch((e) => console.log(e, "in"));
        })
        .catch((e) => console.log(e, "out"));
};
exports.getContacts = async(req, res) => {};

// ########USER#########
exports.getPaymentConfirmation = (req, res) => {
    res.render("user/confirmation");
};
exports.handlePaymentConfirmation = (req, res) => {
    // const user = req.user
    const x = req.file.path;
    const { mode, rrr, amount, proof } = req.body;
    const payment = new Payment({
            fName: req.user.fName,
            email: req.user.email,
            mode: mode,
            rrr: rrr,
            amount: amount,
            proofName: req.file.originalname,
            proofPath: x,
        })
        .save()
        .then((payment) => {
            payment.status = "Not Approved";
            payment.save().then((pay) => {
                res.redirect("/dashboard");
            });
        });
};
exports.getSession = async(req, res) => {
    const session = await Session.find()
        // .populate({
        //     path: "session",
        //     options: {
        //         sort:{startTime: 1}
        //     }
        // }).exec()
        .then((session) => {
            User.find().then((users) => {
                res.render("user/session", { session, users });
            });
            // const time = new Date().toLocaleTimeString()
        });
};
exports.getSessionDetails = async(req, res) => {
    const { id } = req.params;
    await Session.findById(id).then(async(session) => {
        await User.find().then((users) => {
            res.render("user/sessionDetails", { session, users });
        });
    });
};
exports.getMarkAttendance = async(req, res) => {
    const date = new Date().toDateString();
    const sessions = await Session.find({ starts: { $gte: date } })
    .then(async(sessions) => {
        await User.findById(req.user._id)
        .then(ind=>{
            console.log(sessions);

            // QRScanner.initiate({
            //     // match: /^[a-zA-Z0-9]{16,18}$/, // optional
            //     onResult: (result)=> { console.info('DONE: ', result); },
            //     onError: function (err) { console.error('ERR :::: ', err); }, // optional
            //     onTimeout: function () { console.warn('TIMEOUT'); } // optional
            // })

            res.render("superAdmin/mark-attendance", { sessions,ind });
        })
         .catch(e=>console.log("User Not Found"))   
        },
    )
    .catch(e=>console.log(e))
};
exports.handleMarkAttendance = async(req, res) => {
    const { session, email, role } = req.body;
    const attendance = await new Attendance(req.body)
        .save()
        .then((attendance) => {
            res.redirect("/mark-attendance");
        })
        .catch((e) => console.log(e));
};
exports.getSubmitPaper = (req, res) => {
    // console.log(req.user)
    res.render("user/paperSubmission", { success: "" });
};
exports.handleSubmitPaper = async(req, res) => {
    console.log(req.file);
    console.log(req.user);
    const {
        fName,
        lName,
        email,
        no,
        institution,
        department,
        position,
        title,
        author,
        passport,
        fileName,
        filePath,
    } = req.body;
    const x = req.file.path;
    const temp = new Paper({
            // fName: req.user.fName,
            // lName: req.user.lName,
            institution: institution,
            department: department,
            position: position,
            title: title,
            author: author,
            passport: passport,
            fileName: req.file.originalname,
            filePath: x,
        })
        .save()
        .then((doc) => {
            res.render("user/paperSubmission", {
                paper: doc,
                success: "Submitted successfully : Click to view",
            });
        })
        .catch((e) => res.send("You need to login before submitting "));
};
exports.getPaperDetails = async(req, res) => {
    const id = req.params.id;
    const work = Paper.findById(id)
        .populate("reviews")
        .populate("updates")
        .populate("corrections")
        .exec((err, doc) => {
            if (err) {
                console.log(err);
            } else {
                // Paper.populated("reviews")
                console.log(doc);
                // console.log(Paper.reviews.length
                res.render("user/paperDetails", { doc });
            }
        });
};
exports.handlePaperUpdate = async(req, res) => {
    const { id } = req.params;

    await Paper.findById(id).then((paper) => {
        new Update({
                title: "String",
                author: "String",
                fileName: "String",
                filePath: "String",
            })
            .save()
            .then((update) => {
                paper.updates.push(update);
                paper
                    .save()
                    .then((doc) => {
                        res.redirect("/user/paperDetails/<%=doc._id%>");
                    })
                    .catch((e) => res.send("The updated file is missing!!!"));
            })
            .catch((e) => res.send("Failed to upload update!!!"));
    });
};

// ########REVIEWER########

exports.getAllPapers = async(req, res) => {
    const paper = await Paper.find()
        .then((doc) => {
            console.log(doc);
            res.render("admin/allSubmissions", { Paper: doc });
        })
        .catch((e) => console.log(e));
};
exports.getDetails = async(req, res) => {
    const { id } = req.params;
    const paper = await Paper.findById(id)
        .populate("reviews")
        .populate("updates")
        .populate("corrections")
        .exec()
        .then((doc) => {
            res.render("admin/viewPaper", { paper: doc });
        })
        .catch((e) => res.send(e));
};
exports.handlePaperCorrection = async(req, res) => {
    const id = req.params.id;

    await Paper.findById(id).then((pape) => {
        new Correction({
                title: String,
                author: String,
                fileName: String,
                filePath: String,
            })
            .save()
            .then((correction) => {
                const paper = pape.corrections.push(correction);
                paper.save().then((paper) => {
                    res.redirect("/admin/viewPaper/<%=paper._id%>");
                });
            });
    });
};
exports.reviewPaper = async(req, res) => {
    const { id } = req.params;
    const paper = await Paper.findById(id).then((doc) => {
        res.render("admin/review", { doc });
    });
};
exports.handleReviewPaper = async(req, res) => {
    // const {articleName,satisfy,aware,descriptive,reason_to_title,original,significance,clarity,procedure,beneficial,organization,complete,references,read,audience,comment_to_editor,comment_to_author,score,recommendation,re_review,date} = req.body
    // console.log(req.body)
    const { id } = req.params;
    const paper = await Paper.findById(id).then((doc) => {
        console.log(doc);
        const rew = new Review(req.body).save().then((com) => {
            doc.reviews.push(com);
            doc
                .save()
                .then((fullDoc) => {
                    console.log(fullDoc);
                    res.redirect("/admin/papers");
                })
                .catch((e) => {
                    console.log(e);
                });
        });
    });
};
exports.getREreview = async(req, res) => {
    const { id } = req.params;
    const paper = await Paper.findById(id).then((doc) => {
        res.render("admin/editReview", { doc });
    });
};
exports.handleREreview = async(req, res) => {
    const { id } = req.params;
    const paper = await Paper.findOneAndUpdate({ _id: id }, req.body);
    // console.dir(paper)
    // if(!err){
    //     console.log(doc)
    //    res.redirect("/admin/viewPaper/<%=doc._id%>")
    // }else{
    //     res.send(err)
    // }

    // })
    // let fnc = () =>{
    //     let data = []
    // Object.entries(req.body).forEach(([el,val])=>{
    //     // console.log(el, ":",  val)
    //     data.push(el)
    // })
    // return data
    // }
    // console.log(fnc())
};

// #######SPEAKER#########

exports.handleCameraReady = async(req, res) => {
    const { id } = req.params;
    const { name, type, duration, starts, ends, access, roles, topic, pDetails } = req.body;
    const x = req.file.path;
    const y = req.file.destination;
    const cameraReady1 = {
        fileName: req.file.originalname,
        filePath: x,
        fileDestination: y
    }
    const session = await Session.findById(id)
    .then((session) => {
        session.cameraReady.push(cameraReady1)
        session.save()
        console.log(req.file)
        res.redirect(`/session/${session._id}`);
    })
    .catch(e=>res.send(e))
};
exports.handleSlide = async(req, res) => {
    const { id } = req.params;
    const { name, type, duration, starts, ends, access, roles, topic, pDetails } = req.body;
    const x = req.file.path;
    const slide1 = {
        fileName: req.file.originalname,
        filePath: x,
    }
    const session = await Session.findById(id)
    .then((session) => {
        session.slide.push(slide1)
        session.save()
        res.redirect(`/session/${session._id}`);
    })
    .catch(e=>res.send(e))
};


// ########ADMIN###########


exports.getPayments = async(req, res) => {
    const payment = await Payment.find()
        .then((payment) => {
            res.render("superAdmin/payments", { payment });
        })
        .catch((e) => console.log(e));
};
// exports.getAToApprove
exports.handleApprovePayment = async(req, res) => {
    const { id } = req.params;
    const { rrr, status } = req.body;
    const approve = Payment.findById(id).then((approve) => {
        approve.status = "Approved";
        approve.save().then((updated) => {
            res.redirect("/admin/payments");
        });
    });
};
exports.handleAddSession = async(req, res) => {
    const {
        day,
        name,
        type,
        duration,
        startTime,
        endTime,
        live,
        access,
        role,
        speakers,
        presenters,
    } = req.body;
    // startDate = startDate.toLocaleDateString()
    // console.log(start)
    const session = new Session(req.body).save().then((session) => {
        res.redirect("/session");
    });
};
exports.handleEditSession = async(req,res)=>{
    const {id}= req.params
    await Session.findByIdAndUpdate(id, req.body, {new:true})     
    .then(session => res.redirect(`/session/${session._id}`))
    .catch(err => res.send(err))
}
exports.deleteSession = async(req, res) => {
    const { id } = req.params;
    const session = await Session.findByIdAndDelete(id)
        .then((session) => {
            res.redirect("/session");
        })
        .catch((e) => res.send(e));
};

exports.getAttendance = async(req, res) => {
    const attendance = await Attendance.find().then(async(attendance) => {
        await Session.find().then(async(session) => {
            await User.find().then((user) => {
                res.render("superAdmin/attendance", { attendance, session, user });
            });
        });
    });
};
exports.deletePaper = async(req, res) => {
    const { id } = req.params;
    try {
        await Paper.findByIdAndDelete(id).then((doc) => {
            res.redirect("/admin/papers");
        });
    } catch (error) {
        res.send(error);
    }
};

// exports.downloadFile = async(req, res) => {
//     const { id } = req.params;

//     await Session.findById(id).then((doc) => {
//         try {
//             console.log(doc)
//             console.log(__dirname)
//             const x = __dirname +"\\" + doc.cameraReady[0].filePath
//             // const x =  __dirname + "/public/uploads/papers/Developer.jpg"
//             console.log("******xxxx*****")
//             console.log(x)
//             const y = __dirname + "/" + doc.cameraReady[0].fileDestination
//             console.log("******yyyy*****")
//             console.log(y)
//             res.download(x);
//             // res.download(y)
//         } catch (error) {
//             res.send(error)
//         }
//     });

// };