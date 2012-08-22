/**
 * @file
 * Client-side code for the search refinement form.
 */


jQuery(document).ready(
    function() {

    var url = get_ajax_url_from_current_url();
    load_and_apply_ajax_data( url, false );
    }
    );


function on_form_option_selection( event ) {

  var url = get_ajax_url_from_form_selections( event );
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


function get_ajax_url_from_form_selections( event ) {

  //console.debug( event );

  var url = 'http://' + window.location.hostname + '/ajax';


  var path_components = window.location.pathname.split('/');
  // Get rid of any zero-length path components at start of path
  // (e.g. because of a leading '/' in the pathname).
  while ( path_components.length > 0 && path_components[0].length == 0 ) {
    path_components.shift();
  }
  // if ( path_components.length == 0 ) { panic!; }
  var search_name = path_components[0];
  url += '/' + search_name;


  var continent_value = jQuery(
      '#-sn-search-refine-form #edit-continents option:selected').val();
  var continent_id = null;
  if ( continent_value ) {
    continent_id = get_id_from_option_value( continent_value );
    url += '/' + continent_id;
  }
  if ( ! continent_value  ||  event.target.id == 'edit-continents' ) {
    return url;
  }


  var country_value = jQuery(
      '#-sn-search-refine-form #edit-countries option:selected').val();
  var country_id = null;
  if ( country_value ) {
    country_id = get_id_from_option_value( country_value );
    url += '/' + country_id;
  }
  if ( ! country_value  ||  event.target.id == 'edit-countries' ) {
    return url;
  }

  var region_ids = [];
  jQuery('#-sn-search-refine-form input.form-checkbox:checked').each(
      function( idx, cb ) { region_ids.push( cb.value ); } );

  if ( region_ids.length > 0 ) {
    url += '/' + region_ids.join(',');
  }

  return url;
}


function load_and_apply_ajax_data( url, do_replace_view ) {

  // "Default variable"
  if ( do_replace_view === undefined ) {
    do_replace_view = true;
  }

  jQuery.get( url, null, function( data ) {
      //console.debug( data );

      // Replace old view and form with newly retrieved ones.
      if ( do_replace_view ) {
      jQuery( '#content > .view' )
      .removeClass().addClass('view').html( data.view );
      }
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
function get_id_from_option_value( value ) {
  var pattern = new RegExp( '^[0-9]+/([0-9]+)$' );
  var matches = pattern.exec( value );
  return matches.length > 1 ? matches[1] : NULL;
}
