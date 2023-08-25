//import models
const Habit = require('../model/habit');
const User = require('../model/user')

// date to string function 
function getTodayDate() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let today = day + "/" + month + "/" + year;
    return today
}

// create habit controller
module.exports.createHabit = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            // if habit exists find it 
        const habit = await Habit.findOne({ content: req.body.habit, userRef: req.user._id })
        if (habit) {
            // dont create it 
            console.log("already exist");
        } else {
           //create it
            let habits = await Habit.create({
                content: req.body.habit,
                userRef: req.user._id,
                dates: { date: await getTodayDate(), complete: "none" }
            })
            // add new habit to user-> habits array
            habits.save();
        }
        req.flash('success', ' Added a new Habit');
        // redirect home
        return res.redirect('/');

    } catch (err) {
        console.log(err)
    }
}

//---------Dashboard Add/Remove Habit to/from Favorites----------//
module.exports.favoriteHabit = (req, res) => {
    req.flash('success', 'Marked it as your favorite habit');
    let id = req.query.id;
    let userId = req.user._id
    Habit.findOne({
        _id: {
            $in: [ id]
        },
        userRef:userId
    })
        .then(habit => {
            habit.favorite = habit.favorite ? false : true;
            habit.save()
                .then(habit => {
                    return res.redirect('back');
                })
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log("Error adding to favorites!");
            return;
        })
};

//---------Deleting a habit----------//
module.exports.destroyHabit = async(req, res) => {
    
    let id = req.query.id;
    let userId = req.user._id
    await Habit.deleteOne({
        _id: {
            $in: [id]
        },
        userRef:userId
    })
    req.flash('success', 'Deleted habit SuccessFully !');   
    return res.redirect('back');


};

//-------------Update status of habit completion--------------//
module.exports.statusUpdate = async(req, res) => {
    req.flash('success', 'updated habit successfully!');
    var d = req.query.date;
    var id = req.query.id;
     let habit= await Habit.findById(id)

        let dates = habit.dates;
        let found = false;
        dates.find((item, index) => {
             if (item.date === d) {
                if (item.complete === 'yes') {
                        item.complete = 'no';
                    }
                else if (item.complete === 'no') {
                        item.complete = 'none'
                    }
                else if (item.complete === 'none') {
                        item.complete = 'yes'
                    }
                    found = true;
                }
            })
            if (!found) {
                dates.push({ date: d, complete: 'yes' })
            }
            habit.dates = dates;
            habit.save()
                .then(habit => {
                    // console.log(habit);
                    res.redirect('back');
                })
                .catch(err => console.log(err));
        }
