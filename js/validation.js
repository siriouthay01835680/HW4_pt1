//additional methods to ensure min values are not greater than max
$.validator.addMethod("minY_lessthan_maxY", function(value, element){
    return parseInt($("#inputMinY").val()) <= parseInt($("#inputMaxY").val())
}, "Minimum value of Y cannot be greater than maximum value of Y.");
$.validator.addMethod("minX_lessthan_maxX", function(value, element){
    return parseInt($("#inputMinX").val()) <= parseInt($("#inputMaxX").val())
}, "Minimum value of X cannot be greater than maximum value of X.");
//https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.5/additional-methods.js
//method to only accept neg/pos integers (no decimals)
$.validator.addMethod( "integer", function( value, element ) {
	return this.optional( element ) || /^-?\d+$/.test( value );
}, "Please enter a positive or negative non-decimal number." );
$(document).ready(function(){
    $("#form").validate({ //validation rules input must follow, and corresponding messages to flag errors
        rules: {
            inputMinY:{
                integer:true
            },
            inputMinX:{
                integer:true
            },
            inputMaxY:{
                minY_lessthan_maxY: true,
                integer:true
            },
            inputMaxX:{
                minX_lessthan_maxX: true,
                integer:true
            }
        },
        messages: {
            inputMinY: {
                required: "Please enter a number.",
            },
            inputMaxY: {
                required: "Please enter a number.",
            },
            inputMinX: {
                required: "Please enter a number.",
            },
            inputMaxX: {
                required: "Please enter a number.",
            }
           
        }
    });
    //when submit button is clicked create table
    $("#submitbtn").click(function(){
        if($("#form").valid()){
            //creating table by getting html table id and 
            //using temp table var to append html to edit
            //doc
            var minY = parseInt($("#inputMinY").val())
            var maxY = parseInt($("#inputMaxY").val())
            var minX = parseInt($("#inputMinX").val())
            var maxX = parseInt($("#inputMaxX").val())
            var mtable = document.getElementById('table')
            var table = ''
            table += '<tr>'
            table += '<td></td>'
            //iterating through input y values to make column header
            for (var j = minY; j <= maxY; j++) {
                table += '<th scope = "col">' + j + '</th>'
            }
            table += '</tr>'
            //iterating through input x values to make row header
            //and to also create table data via nested loop,
            //multiplying each index
            for (var i = minX; i <= maxX; i++) {
                table += '<tr>'
                table += '<th scope = "row">' + i + '</th>'
                for (var j = minY; j <= maxY; j++) {
                    table += '<td>' + (i * j) + '</td>'
                }
                table += '</tr>'
            }
            //updating html of main table
            mtable.innerHTML = table
        }
    });
});