
/**
 *  @returns a message by key
 */
const getMessageByKey = (key) => {
    var getvalue = getConfiguration();
    var value = '';
    getvalue.forEach(function (item) {
        if (item.key == key) {
            value = item.value;
        }
    })
    return value;
}

/**
 *  @returns a messageType by key
 */
const getMessageTypeByKey = (key) => {
    var getvalue = getConfiguration();
    var value = '';
    getvalue.forEach(function (item) {
        if (item.key == key) {
            value = item.type;
        }
    })
    return value;
}

/**  
 * @main This is main file  which return msg or msg type by key
 * @called by upper two functions
 */
function getConfiguration() {
    return [
       { key: "CREATE", type: "create", value: "create new user" },
       { key: "UPDATE", type: "update", value: "Update user" },
       { key: "REMINDER_ABONDOND_USER", type: "reminder_abondond", value: "Hi! You have not yet completed your profile . Open the app here to continue: checkn://registerOnboard" },
    ];
}

module.exports = {
    getMessageByKey,
    getMessageTypeByKey
};