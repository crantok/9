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

  console.debug( 'on_form_selection' );
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


  url = add_selected_term_id_to_url( url, 'edit-continents' );
  url = add_selected_term_id_to_url( url, 'edit-countries' );


  var region_ids = [];
  jQuery('#-sn-search-refine-form #edit-regions input.form-checkbox:checked').each(
      function( idx, cb ) { region_ids.push( cb.value ); } );
//console.debug( region_ids );
  if ( region_ids.length > 0 ) {
    url += '/' + region_ids.join(',');
  }
  else {
    url += '/all';
  }


  // Important to know order of boolean values in the view's contextual
  // filters. Currently this is alphabetical, i.e.
  //     eco, family, honeymoon, luxury

  url = add_boolean_to_url( url, 'edit-eco' );
  url = add_boolean_to_url( url, 'edit-family' );
  url = add_boolean_to_url( url, 'edit-honeymoon' );
  url = add_boolean_to_url( url, 'edit-luxury' );

  console.debug( url );

  return url;
}

function add_selected_term_id_to_url( url, select_id ) {
  var select_value = jQuery(
      '#-sn-search-refine-form #' + select_id + ' option:selected'
      ).val();
console.debug( select_value );
  if ( select_value ) {
    term_id = get_id_from_option_value( select_value );
    return url + '/' + term_id;
  }
  else {
    return url + '/all';
  }
}

function add_boolean_to_url( url, checkbox_id ) {
  var checkbox = jQuery( '#-sn-search-refine-form #' + checkbox_id )
  return url + '/' + ( checkbox.attr('checked') ? checkbox.val() : 'all' );
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
      jQuery( '#content > .view' ).replaceWith( data.view );
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
