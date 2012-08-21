/**
 * @file
 * Client-side code for the site-specific search system.
 */


jQuery(document).ready(
    function() {

    var url = get_ajax_url_from_current_url();
    load_and_apply_ajax_data( url );
    }
    );


function on_form_option_selection( event ) {

  var url = get_ajax_url_from_form_selections();
  load_and_apply_ajax_data( url );
}


function get_ajax_url_from_current_url() {
  var url = 'http://' + window.location.hostname;
  pathname = window.location.pathname;

  if ( url.charAt(url.length-1) != '/' ) {
    url += '/';
  }
  url += 'ajax';
  if ( pathname.charAt(0) != '/' ) {
    url += '/';
  }
  url += pathname;
  //console.debug( url );
  return url;
}


function get_ajax_url_from_form_selections() {

  var continent_value = jQuery(
      '#-sn-search-refine-form #edit-continents option:selected').val();
  var continent_id = get_term_ids_from_option_value( continent_value ).tid;

  var country_value = jQuery(
      '#-sn-search-refine-form #edit-countries option:selected').val();
  var country_id = get_term_ids_from_option_value( country_value ).tid;

  var region_ids = [];
  jQuery('#-sn-search-refine-form input.form-checkbox:checked').each(
      function( idx, cb ) { region_ids.push( cb.value ); } );

  var path_components = window.location.pathname.split('/');

  // Get rid of any zero-length path components at start of path
  // (e.g. because of a leading '/' in the pathname).
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
  //console.debug( url );
  return url;
}


function load_and_apply_ajax_data( url ) {

  jQuery.get( url, null, function( data ) {
      //console.debug( data );

      // Replace old view and form with newly retrieved ones.
      jQuery( '#sn-search-hotels-page-view' ).html( data.view );
      jQuery( '#ajax-sn-search-refine-form' ).html( data.form );

      // Attach behaviours to form
      jQuery('#-sn-search-refine-form input.form-checkbox')
      .click( on_form_option_selection );
      jQuery('#-sn-search-refine-form select.form-select')
      .change( on_form_option_selection );

  }
  );
}


/**
 * Get a taxonomy term ID from a select-box option value.
 *
 * Select-box option values are in the format:
 *     parent_term_id/term_id
 *
 * @param value
 *   A string containing the select box value.
 *
 * @return
 *  The term ID extracted from value
 */
function get_term_id_from_option_value( value ) {
  var pattern = new RegExp( '^[0-9]+/([0-9]+)$' );
  var matches = pattern.exec( value );
  return matches.length > 1 ? matches[1] : NULL;
}

function hide_invalid_select_options() {
  //var continent_id = get_continent_tid();
  //jQuery('#-sn-search-refine-form #edit-countries option')
  //  .each( function( idx, option ) {
  //      if ( option ) {
  //      console.debug( 'idx...' );
  //      console.debug( idx );
  //      console.debug( 'option...' );
  //      console.debug( option );
  //      console.debug( 'this...' );
  //      console.debug( this );
  //      var ids = get_term_ids_from_option_value( option.value );
  //      if ( ids.parent_tid != continent_id ) {
  //      jQuery( option ).addClass( '.ui-helper-hidden' );
  //      }
  //      }
  //      }
  //      );
}
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
