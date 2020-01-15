import express from 'express';
import fs from 'fs'
import http from 'http';
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
    fs.rmdir('./tmp', function callback (err) {
        if (err) {
            // handle error
            // console.log(err)
        }
        fs.readdirSync('./tmp').forEach(function (file) {
            var curPath = "./tmp/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        })
        fs.rmdirSync('./tmp');
    });
    res.send('delete dir')
    // console.log(files)
})

app.use("*", (req, res) => {
    let text = "Hi <a href='https://medium.com/bakatest-          me'>https://medium.com/bakatest-me</a>";
    return res.send(text);
})