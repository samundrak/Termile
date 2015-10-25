$$clientOperations = {

    login: function(result, term) {
        var username = undefined
        var password = undefined;
        if (!result.data.methods.hasOwnProperty('options')) {
        	if(Meteor.user()) return term.error('Please logout to login again!');

        	term.echo('Logging in');
            Meteor.loginWithPassword(result.data.data.username, result.data.data.password, function(err) {
                if (err) return term.error(err.reason);

                term.set_prompt(result.data.data.username + ":~$ ");
                return term.echo('Welcome ' + result.data.data.username);
            });
        } else {
            return term.error('Sorry :(');
        }
    },
    register: function(result, term) {
        if (result.data.methods.hasOwnProperty('options')) {

        } else {
            Accounts.createUser(result.data.data, function(err) {
                    if (err) return term.error(err.reason);

                    term.echo('Register Successfully');
                    Meteor.logout(function(err) {
                            if (err) return term.error(err.reason);

                            Meteor.loginWithPassword(result.data.data.username, result.data.data.password, function(err) {
                                    if (err) return term.error(err.reason);

                                    term.echo('Logging in..');
                                    term.set_prompt(result.data.data.username + ":~$ ");
                                    return term.echo('Welcome ' + result.data.data.username);
                                

                            })
                    });
                });
            }
        },
        logout: function(result,term){
        	Meteor.logout(function(err){
        		if(err) return term.error(err.reason);

        		term.echo('You have been log out');
        		term.set_prompt('Home:~$' );
        	});
        }
    }