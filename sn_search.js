
jQuery(document).ready(

    var checked_boxes =
      jQuery('#-sn-search-refine-form input.form-checkbox:checked');

    // The view loads with no regions selected in the filter.
    // Set the same selections as the checkboxes.
    jQuery('#views-exposed-form-search-hotels-page select[name="field_region_tid[]"] option').selected(true);
    }
    jQuery('#-sn-search-refine-form input.form-checkbox').click(
      function( event ) {
        var region_id = event.target.value;
        var is_selected = event.target.checked;
        var view_option_path =
        '#views-exposed-form-search-hotels-page select[name="field_region_tid[]"] option[value="' + region_id + '"]';

        jQuery( view_option_path ).selected( is_selected );
        jQuery('#views-exposed-form-search-hotels-page .form-submit').click();
      } );
    $
[
<input type=​"submit" id=​"edit-submit-search-hotels--7" name value=​"Apply" class=​"form-submit views-ajax-processed-processed progress-disabled" disabled>​
]
