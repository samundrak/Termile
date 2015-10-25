function optionsMakers(res) {
    if (res) {
        var q = " Enter ";
        res.forEach(function(item) {
            q = q + " " + item.toUpperCase();
            if (res[res.length - 1] != item) {
                q = q + " or "
            }
        });
        return q;
    }
}
$global = function(name, value) {
    console.log(name)
    console.log(value)
    Meteor.call('props', {
        name: name,
        value: value
    });
}
jQuery(function($, undefined) {
    $global('prompt', 'home');
    $('#term_demo').terminal(
        // cmd, 
        cmd, {
            greetings: 'Termile Your Terminal Profile :)',
            name: 'js_demo',
            height: 200,
            prompt: 'Home:~$ '
        });
});