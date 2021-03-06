$(document).ready(function() {
    //alert("test");
    processUpdates();
});


setInterval(function() {
        processUpdates();
    },
    5200
);

var getUpdates = function(callback) {
    $.ajax({
        type: 'GET',
        url: '/updates',
        json: true,
        success: function(data) {
            //TODO update devices
            callback(null, data);
        }
    });
};

var processUpdates = function() {
    getUpdates(function(err, result) {
        if (err) {
            console.log('something went wrong');
        } else {
            //console.log(JSON.stringify(result));
            for (i = 0; result.length > i; i++) {
                // var ii = parseInt(i);
                var tile = $('#details_' + result[i].id);
                if (tile.length > 0) {
                    for (x = 0; result[i].attributes.length > x; x++) {
                        var attrib = result[i].attributes[x].name;
                        var value = result[i].attributes[x].currentValue;
                        var current = $(tile).find("." + attrib).html();
                        if (current && current != value) {
                            $(tile).find("." + attrib).html(value).change();
                        }
                    }
                }
            }
        }
    });
}