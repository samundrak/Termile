var _ = Meteor.npmRequire('underscore');
Meteor.methods({
    REPL: function(command) {
        if(typeof command != 'string') return false;
        var command = command.split(' ').map(function(current) {
            if (current) return current;
        });
        var commands = [];
        command.forEach(function(cmd) {
            if (cmd != null) commands.push(cmd)
        });

        if (_.has($commands, commands[0])) {
            if (commands.length < 2) {
                return $res(1, $commands[commands[0]].help);
            }

            if (commands[1] === 'help') return $res(1, $commands[commands[0]].help);

            if (_.has($commands[commands[0]], 'eval') && typeof $commands[commands[0]].eval === 'function') {
                if (typeof $commands[commands[0]].eval(commands) === 'object') {
                    return $commands[commands[0]].eval(commands);
                } else {
                    return $res(1, $commands[commands[0]].eval(commands));
                }
            } else {
                return $res(1, $commands[commands[0]].help);
            }

        } else {
            return $res(0, "Invalid command");
        }
    },
    props: function(options) {
        $prompt = options.value;
        Meteor[options.name] = options.value;
        console.log(Meteor[options.name])
    }
});