import express from 'express';
import fs from 'fs'
import http from 'http';
// import _ from 'underscore'
const app = express();
const PORT = "3000";

http.createServer(app).listen(3000, () => {
    console.log("server status : running");
    console.log(`run on port : ${PORT}`);
});

app.get('/create', function (req, res) {
    const dir = './tmp';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);

    }
    fs.writeFile("./tmp/note.txt", "hello world", function (err) {
        if (err) console.log(err)
    })
    res.send('create dir')
})
app.get("/delete", function (req, res) {
    // fs.rmdir('./tmp', function callback (err) {
    //     if (err) {
    //         // handle error
    //         console.log(err)
    //     }
    //     fs.readdirSync('./tmp').forEach(function (file) {
    //         var curPath = "./tmp/" + file;
    //         if (fs.lstatSync(curPath).isDirectory()) { // recurse
    //             deleteFolderRecursive(curPath);
    //         } else { // delete file
    //             fs.unlinkSync(curPath);
    //         }
    //     })
    //     fs.rmdirSync('./tmp');
    // });
    // res.send('delete dir')
    // function rmDir (dirPath) {
    //     try { var files = fs.readdirSync(dirPath); }
    //     catch (e) { return; }
    //     if (files.length > 0)
    //         for (var i = 0; i < files.length; i++) {
    //             var filePath = dirPath + '/' + files[i];
    //             if (fs.statSync(filePath).isFile())
    //                 fs.unlinkSync(filePath);
    //             else
    //                 rmDir(filePath);
    //         }
    //     // fs.rmdirSync(dirPath);
    // };
    // rmDir('./tmp')
    var path = './tmp'
    removeDirForce(path)
    function removeDirForce (path) {
        fs.readdir(path, function (err, files) {
            if (err) {
                console.log(err.toString());
            }
            else {
                if (files.length == 0) {
                    fs.rmdir(path, function (err) {
                        if (err) {
                            console.log(err.toString());
                        }
                    });
                }
                else {
                    files.map(function (file) {
                        var filePath = path + "/" + file + "/";
                        fs.stat(filePath, function (err, stats) {
                            if (stats.isFile()) {
                                fs.unlink(filePath, function (err) {
                                    if (err) {
                                        console.log(err.toString());
                                    }
                                });
                            }
                            if (stats.isDirectory()) {
                                removeDirForce(filePath);
                            }
                        });
                    });
                }
            }
        });
    }

})

app.use("*", (req, res) => {
    let text = "Hi <a href='https://medium.com/bakatest-          me'>https://medium.com/bakatest-me</a>";
    return res.send(text);
})