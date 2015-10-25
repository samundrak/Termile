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
                name :  'register',
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
    cd :  function(command){
        console.log(Meteor.user());
        var usr = Meteor.users.findOne({username:command[1]});
        if(usr)
        return  $res(4,'Change commands name',{name:command[1]});
        else
        return  $res(4,'Dont commands name',{name:'Home'});

    }
}
$prompt = "home";