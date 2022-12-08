const apiRequest = async (url = '', optionsObj = null, errMsg) => {
    try {
        // Fetch the JSON with either the POST, PATCH or DELETE method.
        const response = await fetch(url, optionsObj);
        if (!response.ok) throw Error('Please reload the app');
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}

export default apiRequest;