$(document).ready(function(){
  $.getJSON('/api', printIngredient);
  $('form').submit(function(e){
    e.preventDefault();
    $.post('/api', {ingredient: $('#name').val(), amount: $('#amount').val(), notes: $('#notes').val()}, printIngredient);
    this.reset();
  });
});

function printIngredient(ingredient) {
    $('table').empty();
    $('table').append(`
      <tr class="header">
        <td>Ingredient</td>
        <td>Amount</td>
        <td>Notes</td>
      </tr>`);
    $.each(ingredient, function(){
      $('table').append(`<tr>
          <td>${this.ingredient}</td>
          <td>${this.amount}</td>
          <td>${this.notes}</td>
          <td><i class="fa fa-times" aria-hidden="true"></i></td>
        </tr>`);
    });

    $('.fa-times').off('dblclick').dblclick(function() {
      $.ajax({
          url: '/api/' + $(this).text(),
          type: 'DELETE',
          success: printIngredient
      });
    });

    var rowCount = $('table tr').length;
      if (rowCount > 1 && rowCount < 3) {
        $('.orange-stripe').append('<button>Submit Formula</button>');
    }
}
