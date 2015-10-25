cmd = function(command, term) {
    // term.pause();

    if (command !== '') {
        try {
            var result = command;
            if (result !== undefined) {

                Meteor.call('REPL', result, function(error, result) {

                    if (error) return term.error(error);
                    if (!result.status) return term.error(result.message);

                    switch (result.status) {
                        case 4:
                            $global('prompt', result.data.prompt);
                            term.set_prompt(result.data.name + ":~$ ");
                            break;
                        case 3:
                             $$clientOperations[result.data.methods.name](result,term);
                            break;
                        case 1:
                            if (result.data.prompt) {
                                Session.set('prompt', result.data.prompt);

                                term.set_prompt(result.data.prompt + ":~$ ");
                            }
                            term.echo(result.message);
                            break;
                        case 2:
                            if (result.data.type === 'modal') {
                                $('#exampleModal').modal('show');
                            } else {
                                var keys = [];
                                var values = [];
                                for (var key in result.data.fields) {
                                    keys.push(key);
                                }
                                keys = keys.reverse();
                                var ids = [];
                                keys.forEach(function(item, index) {
                                    term.push(function(cmd, trm) {
                                        if (result.data.fields[item].require) {
                                            if (result.data.fields[item].options) {
                                                result.data.fields[item].options.forEach(function(o) {
                                                    if (cmd.toLowerCase() === o) {
                                                        values.push(cmd.toLowerCase());
                                                        ids.push(result.data.fields[item].id);
                                                        trm.pop();
                                                    }

                                                });
                                            } else {
                                                var len = _.has(result.data.fields[item], 'length') ? result.data.fields[item].length : 0;
                                                if (cmd != '' && cmd.length > len) {
                                                    values.push(cmd);
                                                    ids.push(result.data.fields[item].id);

                                                    trm.pop();
                                                } else {
                                                    trm.error(item + " must be above " + len + " character's");
                                                }
                                            }
                                        } else {
                                            if (result.data.fields[item].options) {
                                                result.data.fields[item].options.forEach(function(o) {
                                                    if (cmd.toLowerCase() === o) {
                                                        values.push(cmd.toLowerCase());
                                                        ids.push(result.data.fields[item].id);

                                                        trm.pop();
                                                    }

                                                });
                                            } else {
                                                values.push(cmd);
                                                ids.push(result.data.fields[item].id);

                                                trm.pop();
                                            }

                                        }
                                    }, {
                                        prompt: "Please enter " + item + "" + (optionsMakers(result.data.fields[item].options) || '') + " :~$",
                                        name: result.data.name,
                                        onExit: function(ki) {
                                            if (item === keys[0]) {
                                                var string = result.data.methods.name + ' ' + result.data.methods.command;
                                                for (var i = 0; i < ids.length; i++) {
                                                    string = string + ' ' + ids[i] + ' ' + values[i];
                                                };
                                                  $$clientOperations[result.data.methods.name](result,term);
                                               
                                            }
                                        }
                                    });
                                });
                            }
                            break;
                    }

                });
            }
        } catch (e) {
            term.error(new String(e));
        }
    } else {
        term.echo('');
    }
}

