const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.get('/clear', function (req, res) {
    req.session.data = {}
    return res.redirect("/");
});


router.get('/list/service', function (req, res) {

    console.log("Get list of services by service");

    var data = require('./data/services.json');

    var services = data.sort(sort_by('name', false, (a) => a.toUpperCase()
    ));

    return res.render('list/service', {
        services
    });

})

router.get('/service/details/:id', function (req, res) {

    var id = req.params.id;

    console.log("Get service by ID");

    var services = require('./data/services.json');

    var service = services.filter(function (value) {
        return (value.id === id);
    });

    if (service.length !== 1) {
        return res.redirect("/list/service");
    }
    else {
        service = service[0];
        return res.render('service/details', {
            service
        });
    }

})

router.get('/component/details/:name', function (req, res) {

    var name = req.params.name;

    console.log("Get component by name");

    var components = require('./data/components.json');

    var component = components.filter(function (value) {
        return (value.id === name);
    });

    if (component.length !== 1) {
        return res.redirect("/list/components");
    }
    else {
        component = component[0];
        return res.render('component/details', {
            component
        });
    }

})

module.exports = router



const sort_by = (field, reverse, primer) => {

    const key = primer ?
        function (x) {
            return primer(x[field])
        } :
        function (x) {
            return x[field]
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}