
const MyLogger = ({req, res, next}) => {
    console.log('LOGGER');
    next();
}
export default MyLogger;
