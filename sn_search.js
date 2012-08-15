
function get_term_id_from_option_value( value ) {
  var pattern = new RegExp( '^[0-9]+/([0-9]+)$' );
  var matches = pattern.exec( value );
  return matches.length > 1 ? matches[1] : NULL;
}

jQuery(document).ready( function() {

    jQuery('#-sn-search-refine-form input.form-checkbox').click(
      function( event ) {

      var continent_value = jQuery(
        '#-sn-search-refine-form #edit-continents option:selected').val();
      var continent_id = get_term_id_from_option_value( continent_value );
      var country_value = jQuery(
        '#-sn-search-refine-form #edit-countries option:selected').val();
      var country_id = get_term_id_from_option_value( country_value );

      var region_ids = [];
      jQuery('#-sn-search-refine-form input.form-checkbox:checked').each(
        function( idx, cb ) { region_ids.push( cb.value ); } );

      var path_components = window.location.pathname.split('/');

      while ( path_components.length > 0 && path_components[0].length == 0 ) {
      path_components.shift();
      }

      // if ( path_components.length == 0 ) { panic!; }

      var search_name = path_components[0];

      var url = 'http://' + window.location.hostname +
        '/' + 'ajax' +
        '/' + search_name +
        '/' + continent_id +
        '/' + country_id +
        '/' + region_ids.join(',');

      jQuery.get( url, null, function( data ) {
          jQuery( '#main > #content > .view' ).html( data.view );
          } );

      return false;

      } ) // click

    } ); // ready

/**
 * Version 1
 * Added exposed region filter to AJAX view and manipulated it through JS.
 *
 * Didn't work because the exposed region filter clashed with the
 * contextual region filter. A node would have to have had two regions.
 *
 *
function set_option_selection( region_id, do_select ) {
  var view_option_path =
    '#views-exposed-form-search-hotels-page select[name="field_region_tid[]"] option[value="' + region_id + '"]';

  jQuery( view_option_path ).selected( do_select );
}

function submit_ajax_form() {
  jQuery('#views-exposed-form-search-hotels-page .form-submit').click();
}


jQuery(document).ready( function() {

    // The view loads with no regions selected in the region filter.
    // Set the same selections as the search-form region checkboxes.
    var checked_boxes =
    jQuery('#-sn-search-refine-form input.form-checkbox:checked');

    checked_boxes.each( function( x, cb ) {
      var region_id = cb.value;
      set_option_selection( region_id, true );
      } );

    // Add a click event to the search-form checkboxes so that
    // they change selected regions in the view and reload it.
    jQuery('#-sn-search-refine-form input.form-checkbox').click(
      function( event ) {
      var region_id = event.target.value;
      var is_selected = event.target.checked;
      set_option_selection( region_id, is_selected );
      submit_ajax_form();
      } );
    } );
*/
