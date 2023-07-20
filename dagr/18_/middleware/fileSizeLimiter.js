const MB = 5; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
    const files = req.files;

    const filesOverLimit = [];
    //Which files are over the limit?
    Object.keys(files).forEach(key => {
        if (files[key].size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files[key].name)
        }

        if (filesOverLimit.length) {

        }

        next();
    });
}

module.exports = fileSizeLimiter;