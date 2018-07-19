/*
*   Library for storing and editing data
*/

const fs = require('fs');
const path = require('path');

// Container
let lib = {}

// Base directory of data folder
lib.baseDir = path.join(__dirname, '/../.data/');


// Write data to a file

lib.create = (dir, file, data,callback) => {
    // open the file
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',(err, fileDescriptor)=>{
        if(!err && fileDescriptor) {
            // Convert data to string
            let stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, (err)=>{
                if(!err) {
                    fs.close(fileDescriptor, (err) =>{
                        if(!err){
                            callback(false);
                        }
                        else {
                            callback('Error closing new file');
                        }
                    })
                }
                else {
                    callback('Error writing to new file');
                }
            });
        }
        else {
            callback('Could no create new file, it may already exist');
        }
    });
};

lib.read = (dir,file,callback) => {
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', (err,data) =>{
        callback(err,data);
    });
}

lib.update = (dir,file,data,callback) => {
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',(err,fileDescriptor)=> {
        if(!err && fileDescriptor){
            let stringData = JSON.stringify(data);

            //Truncate the file
            fs.truncate(fileDescriptor, (err) =>{
                if(!err){
                    //write file and close
                    fs.write(fileDescriptor,stringData, (err) =>{
                        if(!err){
                            fs.close(fileDescriptor, (err)=>{
                                if(!err){
                                    callback(false);
                                }
                                else{
                                    callback('Error closing the exisitng file');
                                }
                            })
                        }
                        else {
                            callback('Error writing to exisitng file')
                        }
                    })
                }
                else{
                    callback('Error truncating file')
                }

            })
        }
        else {
            callback('Could not open the file for updating, it may not exist yet');
        }
    });

    lib.delete = (dir,file,callback) => {
        //Unlink the file
        fs.unlink(lib.baseDir+dir+'/'+file+'.json',(err) =>{
            if(!err){
                callback(false);
            }
            else{
                callback('There was an error deleting the file');
            }
        })
    }
};









// Export the module

module.exports = lib;