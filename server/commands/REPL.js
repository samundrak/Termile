$repl = {
    login: function(command) {
        var options = ["-u", "-p"];
        console.log($helpOptions('login', command))
        if (_.contains(command, "-u")) {
            if (_.contains(command, "-p")) {
                var username = $getOptionsValue(command, "-u", options) || undefined;
                var password = $getOptionsValue(command, "-p", options) || undefined;
                console.log(username + "" + password);
                if (username && password) {
                    return $res(3, "Continue to next client methods", {
                        methods: {
                            name: 'login',
                        },
                        data: {
                            username: username,
                            password: password
                        }
                    });
                } else {
                    return $res(0, "invalid data format! " + $commands.login.help);
                }
            } else {
                return $res(0, "Password must be provided");
            }
        } else {
            return $res(0, "Username must be provided");
        }
    },
    register: function(command) {
        var options = ["init", 'save', "-ui"];
        if (command[1] === 'init') {
            var type;
            if (_.contains(command, '-ui')) {
                type = 'modal'
            } else {
                type = 'console'
            }
            return $res(2, 'More information required', {
                type: type,
                name: 'register',
                methods: {
                    name: 'register',
                    command: 'save'
                },
                fields: {
                    username: {
                        require: true,
                        length: 3,
                        id: "-u"
                    },
                    passowrd: {
                        require: true,
                        length: 3,
                        id: "-p"
                    },
                    email: {
                        require: true,
                        id: "-e"
                    },
                    country: {
                        require: true,
                        length: 3,
                        id: "-cn"
                    },
                    sex: {
                        require: true,
                        options: ['male', 'female'],
                        id: "-sex"
                    },
                    dob: {
                        require: true,
                        id: "-dob"
                    }
                }
            });
        } else if (command[1] === 'save') {
            var key = ["username", "password", "email", "country", "sex", "dob"];
            var options = ["-u", "-p", "-e", "-cn", "-sex", "-dob"];
            var data = {};
            var pass = true;
            options.forEach(function(item, index) {
                if (_.contains(command, item)) {
                    data[key[index]] = $getOptionsValue(command, item, options)
                }
            });
            data.profile = {
                country: data.country,
                sex: data.sex,
                dob: data.dob
            }
            delete data.country;
            delete data.sex;
            delete data.dob;
            // console.log(Me)

            return $res(3, "Continue to next client methods", {
                methods: {
                    name: 'register',
                    command: 'save',
                    // options: options
                },
                data: data
            });
        } else {
            return $commands.register.help;
        }
    },
    cd: function(command) {
        var usr = Meteor.users.findOne({
            username: command[1]
        });
        if (usr)
            return $res(4, 'Changed to ' + command[1], {
                name: command[1]
            });
        else
        if (!Meteor.user())
            return $res(4, 'No user found "' + command[1] + '" ', {
                name: 'Home'
            });
        else
            return $res(4, 'No user found "' + command[1] + '" ', {
                name: Meteor.user().username
            });
    },
    logout: function(command) {
        if (command[1] === 'me') {
            if (Meteor.user()) {
                return $res(3, "Logging out current user", {
                    methods: {
                        name: 'logout',
                        command: 'me'
                    }
                });
            } else {
                return $res(0, 'No any session has been started');
            }
        } else {
            return $res(0, 'Invalid option,Enter logout me to logout');
        }
    },
    my: function(command) {
        if (command[1] === 'info') {
            if (Meteor.user()) {
                var user = Meteor.user();
                var res = "You are logged in as " + Meteor.user().username;
                res += "\n Username: " + user.username;
                res += "\n Email: " + user.emails[0].address + ' verified: ' + user.emails[0].verified + '';
                res += "\n Sex: " + user.profile.sex;
                res += "\n Country: " + user.profile.country;
                res += "\n Date of birth: " + user.profile.dob;
                res += "\n Registered on: " + user.createdAt;
                return res;
            } else {
                return $res(0, 'You are not logged in currently');
            }
        } else if (command[1] === 'status') {
            if (Meteor.user())
                return $res(1, 'You are in logged in as ' + Meteor.user().username);
            else
                return $res(0, 'You are not logged in user');
        } else {
            var user = Meteor.user();
            if (!user) return $res(0, 'You are not logged in user');
            var cmds = ['username', 'profile', 'email', 'sex', 'dob', 'country'];
            if (_.contains(cmds, command[1])) {
                var res = $commands.my.help;
                switch (command[1]) {
                    case 'username':
                        res = user.username;
                        break;
                    case 'profile':
                        res = JSON.stringify(user.profile);
                        break;
                    case 'email':
                        res = user.emails[0].address;
                        break;
                    case 'sex':
                        res = user.profile.sex;
                        break;
                    case 'dob':
                        res = user.profile.dob;
                        break;
                    case 'country':
                        res = user.profile.country;
                        break;
                }
                return $res(1, res);
            } else {
                return $res(1, $commands.my.help);
            }
        }
    },

}
$prompt = "home";