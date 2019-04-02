$.fn.exists = function(callback) {
    var args = [].slice.call(arguments, 1);
  
    if (this.length) {
      callback.call(this, args);
    }
  
    return this;
};

$('#createLocationForm').exists(function() {
    $('#input-organization-select').on('change', function() {
        var languages = $(this).find(':selected').data('supportlangs')
        var languagesID = $(this).find(':selected').data('supportlangs-id')
        
        if(languagesID !="" && languages!="") {
            languagesID = languagesID.split(" ");
            languages = languages.split("|");
            // Clear innerHTML
            $("#dynamic-inputs").html(" ");
            var rawHTML = "";
            for(var i=0; i<languages.length-1; i++) {
                rawHTML += '<div class="form-group">'
                rawHTML += '<label class="form-control-label">Name in '+ languages[i] +'</label>'
                rawHTML += '<input type="text" name="name[]" class="form-control form-control-alternative" placeholder="Location Name" required autofocus>'
                rawHTML += '</div>'
                $("#dynamic-inputs").append(rawHTML)
                rawHTML = ""
            }
            
        } else {
            // Clear innerHTML
            $("#dynamic-inputs").html(" ");
        }
        
        
    });
});

$('#createSurveyQuestionForm').exists(function() {
    $('#input-organization-select').on('change', function() {
        var languages = $(this).find(':selected').data('supportlangs')
        var languagesID = $(this).find(':selected').data('supportlangs-id')
        
        var devices = $(this).find(':selected').data('devices')
        var devicesID = $(this).find(':selected').data('devices-id')

        if(languagesID !="" && languages!="" && devices !="" && devicesID!="" ) {
            languagesID = languagesID.split(" ");
            languages = languages.split("|");

            devicesID = devicesID.split(" ");
            devices = devices.split("$");

            // Clear innerHTML
            $("#dynamic-inputs").html(" ");
            var rawHTML = "";
            for(var i=0; i<languages.length-1; i++) {
                rawHTML += '<div class="form-group">'
                rawHTML += '<label class="form-control-label">Question in '+ languages[i] +'</label>'
                rawHTML += '<textarea type="text" name="question[]" class="form-control form-control-alternative" placeholder="Question" required  autofocus></textarea>'
                rawHTML += '</div>'
                $("#dynamic-inputs").append(rawHTML)
                rawHTML = ""
            }

            rawHTML += '<div class="form-group">'
            rawHTML += '<label class="form-control-label" for="input-name">Devices</label>'
            for(var i=0; i<devices.length-1; i++) {
                rawHTML += '<div class="custom-control custom-checkbox mb-3">'
                rawHTML += '<input name="device[]" class="custom-control-input" id="customCheck'+devicesID[i]+'" value="'+devicesID[i]+'" type="checkbox">'
                rawHTML += '<label class="custom-control-label" for="customCheck'+devicesID[i]+'">'+ devices[i]+'</label>'
                rawHTML += '</div>'
            }
            rawHTML += '</div>'
            $("#dynamic-inputs").append(rawHTML)
            
        } else {
            // Clear innerHTML
            $("#dynamic-inputs").html(" ");
        }
        
        
    });
});


$('#createDeviceForm').exists(function() {
    $('#input-organization-select').on('change', function() {
        var languages = $(this).find(':selected').data('supportlangs')
        var languagesID = $(this).find(':selected').data('supportlangs-id')
        
        var locations = $(this).find(':selected').data('locations')
        var locationsID = $(this).find(':selected').data('locations-id')
        
        if(languagesID !="" && languages!="" && locations !="" && locationsID !="") {
            languagesID = languagesID.split(" ");
            languages = languages.split("|");
            
            locationsID = locationsID.split(" ");
            locations = locations.split("$");
            // Clear innerHTML
            $("#dynamic-inputs").html(" ");
            var rawHTML = "";
            for(var i=0; i<languages.length-1; i++) {
                rawHTML += '<div class="form-group">'
                rawHTML += '<label class="form-control-label">Name in '+ languages[i] +'</label>'
                rawHTML += '<input type="text" name="name[]" class="form-control form-control-alternative" placeholder="Name" required autofocus>'
                rawHTML += '</div>'
                $("#dynamic-inputs").append(rawHTML)
                rawHTML = ""
            }
            for(var i=0; i<languages.length-1; i++) {
                rawHTML += '<div class="form-group">'
                rawHTML += '<label class="form-control-label">Description in '+ languages[i] +'</label>'
                rawHTML += '<input type="text" name="description[]" class="form-control form-control-alternative" placeholder="Description" required autofocus>'
                rawHTML += '</div>'
                $("#dynamic-inputs").append(rawHTML)
                rawHTML = ""
            }
            
            rawHTML += '<div class="form-group">'
            rawHTML += '<label class="form-control-label" for="input-location-id">Location</label>'
            rawHTML += '<select name="location_id" class="form-control form-control-alternative" id="input-location-id" required>'
            rawHTML += '<option></option>'
            for(var i=0; i<locations.length-1; i++) {
                rawHTML += '<option value="'+locationsID[i]+'">'
                rawHTML += locations[i]
                rawHTML += '</option>'
                
            }
            rawHTML += '</select>'
            rawHTML += '</div>'
            $("#dynamic-inputs").append(rawHTML)
            rawHTML = ""
            
        } else {
            // Clear innerHTML
            $("#dynamic-inputs").html(" ");
        }
        
        
    });
});

$('#createAdvertisementForm').exists(function() {
    $('#input-organization-select').on('change', function() {
        var languages = $(this).find(':selected').data('supportlangs')
        var languagesID = $(this).find(':selected').data('supportlangs-id')
        
        var devices = $(this).find(':selected').data('devices')
        var devicesID = $(this).find(':selected').data('devices-id')

        if(languagesID !="" && languages!="" && devices !="" && devicesID!="" ) {
            languagesID = languagesID.split(" ");
            languages = languages.split("|");

            devicesID = devicesID.split(" ");
            devices = devices.split("$");

            // Clear innerHTML
            $("#dynamic-inputs").html(" ");
            var rawHTML = "";
            for(var i=0; i<languages.length-1; i++) {
                rawHTML += '<div class="form-group">'
                rawHTML += '<label class="form-control-label">Name in '+ languages[i] +'</label>'
                rawHTML += '<input type="text" name="name[]" class="form-control form-control-alternative" placeholder="Name" required autofocus>'
                rawHTML += '</div>'
                $("#dynamic-inputs").append(rawHTML)
                rawHTML = ""
            }
            
            for(var i=0; i<languages.length-1; i++) {
                rawHTML += '<div class="form-group">'
                rawHTML += '<label class="form-control-label">Content in '+ languages[i] +'</label>'
                rawHTML += '<textarea type="text" name="content[]" class="form-control form-control-alternative" placeholder="Content" required  autofocus></textarea>'
                rawHTML += '</div>'
                $("#dynamic-inputs").append(rawHTML)
                rawHTML = ""
            }

            rawHTML += '<div class="form-group">'
            rawHTML += '<label class="form-control-label" for="input-name">Devices</label>'
            for(var i=0; i<devices.length-1; i++) {
                rawHTML += '<div class="custom-control custom-checkbox mb-3">'
                rawHTML += '<input name="device[]" class="custom-control-input" id="customCheck'+devicesID[i]+'" value="'+devicesID[i]+'" type="checkbox">'
                rawHTML += '<label class="custom-control-label" for="customCheck'+devicesID[i]+'">'+ devices[i]+'</label>'
                rawHTML += '</div>'
            }
            rawHTML += '</div>'
            $("#dynamic-inputs").append(rawHTML)
            
        } else {
            // Clear innerHTML
            $("#dynamic-inputs").html(" ");
        }
        
        
    });

    /*
    $("#checkAll").click(function(){
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    */
});


$(function () {
    $('#datetimepicker').datetimepicker({
        icons: {
            time: 'fas fa-clock',
            date: 'far fa-calendar'
        } });
});
