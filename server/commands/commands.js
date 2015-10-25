$commands = {
    login: {
        help: "Login can be used to login to your account. To login type 'login -u <username> -p <password>'",
        eval: $repl.login
    },
    register: {
        options: ["init"],
        help: "To Register you can use Register command. To start register type 'register init' and then enter every details asked",
        eval: $repl.register
    },
    info: {
        help: "Termile is a Terminal Profile, A linux based terminal where you can get information about developers and programmers like any terminal based"
    },
    cd: {
        help: "Enter 'cd <username>'' to go to some user's profile",
        eval: $repl.cd
    },
    logout: {
        help: "Enter 'logout me' to logout from current session",
        eval: $repl.logout
    },
    my: {
        help: "Enter 'my info' to get all info about me . More options are [ name,address,email,sex,country,dob]",
        eval: $repl.my
    }
}