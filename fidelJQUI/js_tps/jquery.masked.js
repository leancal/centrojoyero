$.editable.addInputType('masked', {
    element : function(settings, original) {
        /* Create an input. Mask it using masked input plugin. Settings  */
        /* for mask can be passed with Jeditable settings hash.          */
        var input = $('<input />').mask(settings.mask);
        $(this).append(input);
        return(input);
    }
});