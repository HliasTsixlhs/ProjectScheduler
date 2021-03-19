const fs = require('fs');

module.exports.SaveEmployeesHistory = (req, res, next) => {

    fs.appendFile('./middleware/historyLogs', "method:" + req.method + '\n', () => {
        // console.log('file was written\r\n');
        return
    });
    fs.appendFile('./middleware/historyLogs', "headers:" + req.headers  + '\n', () => {
        // console.log('file was written');
        return
    });
    fs.appendFile('./middleware/historyLogs', "url:" + req.url + '\n', () => {
        // console.log('file was written/\r\n');
        return
    });
    fs.appendFile('./middleware/historyLogs', "method:" + req.body  + '\n', () => {
        // console.log('file was written');
        return
    }); 
    
    next();
}