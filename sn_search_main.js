/**
 * @file
 * Client-side code for the main search form.
 */


jQuery(document).ready(
    function() {

    cache_select_options();
    restrict_form_options();

    jQuery( '#block-sn-search-main-search select.form-select' ).change( restrict_form_options );

    }
    );


function on_form_option_selection( event ) {

  restrict_form_options();
}

function cache_select_options() {

  // For each select box in the main search form
  jQuery( '#block-sn-search-main-search select.form-select' )
    .each( function() {

        var options = [];

        // For each option in the current select box
        jQuery( this ).find( 'option' ).each( function() {
          options.push( { value : this.value, text : this.text } );
          }
          )

        // Cache the options for the current select box
        jQuery( this ).data( 'options', options );
        }
        );
}

function restrict_form_options() {

  var is_disable_later_selects = false;


  // Get continent ID
  var continent_select =
    jQuery( '#block-sn-search-main-search #edit-continents');
  var continent_id = restrict_select_options( continent_select, 0 );
  //console.debug( continent_id );

  // Restrict country options based on continent setting.
  var country_select =
    jQuery('#block-sn-search-main-search #edit-countries');
  var country_id = restrict_select_options( country_select, continent_id );
  //console.debug( country_id );

  // Restrict region options based on country setting.
  var region_select =
    jQuery('#block-sn-search-main-search #edit-regions');
  var region_id = restrict_select_options( region_select, country_id );
  //console.debug( region_id );

  // Restrict destination options based on region setting.
  var destination_select =
    jQuery('#block-sn-search-main-search #edit-destinations');
  var destination_id = restrict_select_options( destination_select, region_id );
  //console.debug( destination_id );
}

function restrict_select_options( select, required_parent_id ) {
  var id = null;

  if ( required_parent_id == null ) {
    select.attr( 'disabled', 'disabled' );
    select.val('');
  }
  else {
    select.removeAttr( 'disabled' );

    var selected_value = select.find( 'option:selected' ).val();
    var id_info;
    if ( selected_value ) {
      id_info = get_ids_from_option_value( selected_value );
      id = id_info.id;
    }

    var is_remake_options = 
      ! selected_value  ||  id_info.parent_id != required_parent_id ;

    if ( is_remake_options ) {
      set_options_from_parent_id( select, required_parent_id );
      id = null;
    }
  }
  return id;
}

function set_options_from_parent_id( select, required_parent_id ) {

  select.empty();

  var options = select.data( 'options' );

  jQuery( options ).each( function() {

      if ( this.value ) {
      var option_parent_id =
      get_ids_from_option_value( this.value ).parent_id;

      if ( option_parent_id == required_parent_id ) {
      select.append(
        jQuery( '<option>' ).val( this.value ).text( this.text )
        );
      }
      }
      else {
      select.append(
        jQuery( '<option>' ).val( this.value ).text( this.text )
        );
      }
  }
  );
}



/**
 * Get own and parent IDs from a select-box option value.
 *
 * Select-box option values are in the format:
 *     parent_id/id
 *
 * @param value
 *   A string containing the select box value.
 *
 * @return
 *  The IDs extracted from value
 */
function get_ids_from_option_value( value ) {
  var pattern = new RegExp( '^([0-9]+)/([0-9]+)$' );
  var matches = pattern.exec( value );
  if ( matches.length > 2 ) {
    return { id : matches[2], parent_id : matches[1] };
  }
  else {
    return NULL;
  }
}

