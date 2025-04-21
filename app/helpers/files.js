const fs = require('fs');
const path = require('path');

// Leemos todas las imagenes de la ruta indicada
const getAllImagesFromDisk = async (dirPath) => {

    let imageFiles = [];
    try {
        const items = fs.readdirSync(dirPath);
    
        for (const item of items){
            const fullPath = path.join(dirPath, item);
            const stats = fs.statSync(fullPath);
    
            if (stats.isDirectory()) {
                imageFiles = imageFiles.concat(getAllImageFilesFromDisk(fullPath))
            } else if(stats.isFile()) {
                imageFiles.push(fullPath);
            }
            
        }
    
        return imageFiles;
        
    } catch (error) {
        throw new Error("Error reading images from disk");
        
    }

}

const getFolderSize = async (folderPath) => {
    
    try {
        const files = fs.readdirSync(folderPath);
    
        let totalSize = 0;
    
        for(const file of files) {

            const filePath = path.join(folderPath, file)
            const stats = fs.statSync(filePath)

            if(stats.isFile()) {
                totalSize += stats.isFile() ? stats.size : 0;
            } else if (stats.isDirectory()) {
                totalSize += await getFolderSize(filePath);
            }


    
        }
    
        return totalSize;
    } catch (error) {
        throw new Error("Failed to get storage Info.");
    }

}

module.exports = {
    getAllImagesFromDisk,
    getFolderSize
}