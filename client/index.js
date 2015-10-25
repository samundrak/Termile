$$clientOperations = {

    login: function(command) {
        return command;
    },
    register: function(result) {
        if (result.data.methods.hasOwnProperty('options')) {

        } else {
            console.log('db')
            // Accounts.createUser(result.data.data, function(error) {
            //     // if(error) return {status :0, message : error.reason};
            //     console.log('oeeeee')
            // });
            Meteor.wrapAsync(Accounts.createUser(result.data.data, function(error) {
                // if(error) return {status :0, message : error.reason};
                console.log('oeeeee')
            });)
            console.log('ssss')
            return {
                status: 0,
                message: 'oe'
            }
        }
    }
}