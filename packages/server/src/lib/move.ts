import fs from "fs";

export default function move(
    oldPath: string,
    newPath: string,
    callback: (err?: any) => void,
) {
    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            if (err.code === "EXDEV") {
                copy();
            } else {
                callback(err);
            }
            return;
        }
        callback();
    });
    
    function copy() {
        let readStream = fs.createReadStream(oldPath);
        let writeStream = fs.createWriteStream(newPath);
        
        readStream.on("error", callback);
        writeStream.on("error", callback);
        
        readStream.on("close", function() {
            fs.unlink(oldPath, callback);
        });
        
        readStream.pipe(writeStream);
    }
}
