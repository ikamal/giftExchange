/**
 * Created by ruizhang on 13-12-9.
 */

var personDB = require("../db/person");

exports.checkPerson = function (req, res) {
    var userCode = req.body.userCode;
    var passCode = req.body.passCode;
    personDB.checkUserCode(userCode,passCode, function (exist) {
        res.json(exist);
        console.log("用户:" + userCode + " 验证结果:" + exist);
    });
}

exports.getPerson = function(req,res) {
    var userCode = req.body.userCode;
    personDB.getPerson(userCode,function(person) {
        if(person) {
            req.session.userCode = req.body.userCode;
            res.json(true);
        } else {
            res.json(false);
        }
    });
}

exports.checkPassCode = function (req, res) {
    var passCode = req.body.passCode;
    personDB.checkPassCode(passCode, function (exist) {
        res.json(exist);
        console.log("邀请码:" + passCode + " 验证结果:" + exist);
    });
}

exports.addPerson = function (req, res) {
    personDB.checkUserCode(req.userCode,req.passCode,function(exist) {
        if(exist == -1) {
            res.json(-1);
            return;
        }
        personDB.addPerson(req.body.passCode, req.body, function (updated) {
            if (updated) {
                req.session.userCode = req.body.userCode;
            }
            res.json(updated);
            console.log("新增用户:" + req.body.userCode);
        });
    })
}

exports.checkMake = function (req, res) {
    var userCode = req.session.userCode;
    personDB.checkMade(userCode, function (made) {
        res.json(made);
    });
}