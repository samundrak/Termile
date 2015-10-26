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
            height: 'auto',
            prompt: Meteor.user() ?  Meteor.user().username  + ':~$ ': 'Home:~$ '
        });
});