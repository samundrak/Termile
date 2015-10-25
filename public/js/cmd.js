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
                        case 3:
                        var cc = $$clientOperations[result.data.methods.name](result);
                        console.log(cc);
                        if(!cc.status) return term.error(cc.message);
                        return term.echo(result.message);
                        break;
                        case 1:
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
                                                console.log(ids);
                                                console.log(values);
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

function optionsMakers(res) {
    if (res) {
        var q = " Enter ";
        res.forEach(function(item) {
            q = q + " " + item.toUpperCase() ;
            if (res[res.length - 1] != item) {
                q = q + " or "
            }
        });
        return q;
    }
}