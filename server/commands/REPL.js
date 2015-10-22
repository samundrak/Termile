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
                    console.log(username);
                    console.log(password);
                    return 'done';
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
            
            return 'ayo ayo';
        } else {
            return $commands.register.help;
        }
    }
}
$name = "sams"