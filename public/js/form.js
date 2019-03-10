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
