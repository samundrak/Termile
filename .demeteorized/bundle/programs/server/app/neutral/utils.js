(function(){$log = function(data) {
    console.log(data);
}
$res = function(status, message, data) {
    if (!data) var data = {}
    return {
        status: status,
        message: message,
        data: data
    }
}

$getOptionsValue = function(arr, key, options) {

    if (_.contains(arr, key)) {
        var index = arr.indexOf(key) + 1;
        if (!_.contains(options, arr[index])) {
            if(arr[index] != ' ' && arr.length){
            	return arr[index];
            }else{
            	return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

$helpOptions = function(head,commands, option) {
    if (commands[1] === 'help') return $commands[head].help;
    else return false;
}

})();
