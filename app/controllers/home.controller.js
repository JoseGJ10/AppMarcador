const { countGames, getAllBoardGamesImagesFromDB } = require('../services/boardgame.service');
const { countEvents } = require('../services/event.service');
const { countUsers } = require('../services/user.service');
const { countLoans } = require('../services/loan.service');
const { countMatches } = require('../services/match.service')
const { countParticipants } = require('../services/participant.service')
const { getAllImagesFromDisk,getFolderSize } = require('../helpers/files');
const { formatBytes } = require('../helpers/converts')
const path = require('path');

const getDashBoardStats = async (req, res, next) => {
    try {
        
        const boardgames = await countGames();
        const users = await countUsers();
        const loans = await countLoans();
        const events = await countEvents();
        const totalMatches = await countMatches();
        const totalParticipants = await countParticipants();

        res.status(200).json({ success: true, data: {boardgames,users,loans,events,totalMatches,totalParticipants}});

    } catch (error) {
        next (error)
    }
}

const auditImages = async (req, res, next) => {
    try {

        const uploadsRoot = path.join(__dirname, '..', 'uploads', 'boardgames');

        const usedImages = await getAllBoardGamesImagesFromDB();

        console.log(usedImages);
        
        const allFiles = await getAllImagesFromDisk(uploadsRoot);

        const unUsedFiles = allFiles.filter(file => !usedImages.includes(path.basename(file)));

        res.status(200).json(unUsedFiles)
        
    } catch (error) {
        next(error)
    }
}

const usedUploadFolder = async (req, res, next) => {
    try {
        
        const UploadFolderSize = await getFolderSize( path.join(__dirname,'..','uploads') );
        
        res.status(200).json({'Size Upload folder': `${ formatBytes(UploadFolderSize) }`  });

    } catch (error) {
        next (error);
    }

}

module.exports = {
    getDashBoardStats,
    auditImages,
    usedUploadFolder
}